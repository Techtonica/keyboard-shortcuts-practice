// Global variable to keep track of CapsLock 
var caps = false;

var allData ;

var reqKeys = []

var typewriter;

function nextQuestion(){
	if(sessionStorage.getItem("questionNo")!=null){
		sessionStorage.setItem("questionNo", parseInt(sessionStorage.getItem("questionNo"))+1);
	}
	// Un-Highlight the command keys.
	$.each( reqKeys, function( index, key ){
		$("#"+key.toLowerCase()).toggleClass("prompt")
		if(key.toLowerCase()=="meta"){
			$("#metaleft").toggleClass("prompt")
		}
	});
	
	// Reset the reqKeys
	reqKeys = [];
	
	readText();
}

function retry(){
	// Hide the Try again button
	$("#retryButton").toggleClass("on");
	readText();
}

$(document).ready(function() {
$("#retryButton").toggleClass("on");	


$.getJSON( "JS/shortcuts.json", function( data ) {
	allData = data;
	if(sessionStorage.getItem("questionNo")==null){
		sessionStorage.setItem("questionNo", "1");
		console.log("is not set");
	}
	// Call readText() 
	readText()
})

});

// Function called on KeyDown to show Pressed key by adding class = 'pressed' 
function handle(e) {	
	var text1 = e.type +
	' key=' + e.key +
	' code=' + e.code		
	
if(e.code.toLowerCase()=="space"){
	$("#space").toggleClass("pressed");
}
	
if((e.which>=186 && e.which<=192)|| (e.which>=219 && e.which<=222)){
	$("#"+e.code.toLowerCase()).toggleClass("pressed");
}
	
if(e.key.toLowerCase()=="alt" || e.key.toLowerCase()=="shift" || e.key.toLowerCase()=="meta"){
	$("#"+e.code.toLowerCase()).toggleClass("pressed");
}
	
if(e.key.toLowerCase()=="capslock" && caps==false){ 
	caps= true;
	$("#"+e.key.toLowerCase()).toggleClass("pressed");
	$('.letter').toggleClass('uppercase');
}
else if(e.key.toLowerCase()=="capslock" && caps==true) {
	$("#"+e.key.toLowerCase()).toggleClass("pressed");
	$('.letter').toggleClass('uppercase');
	caps=false;
}
else $("#"+e.key.toLowerCase() ).addClass("pressed");
}

// Function called on KeyUp to reset the key by removing class = 'pressed'
function release(e) {
	
if((e.which>=186 && e.which<=192)|| (e.which>=219 && e.which<=222)){
	$("#"+e.code.toLowerCase()).removeClass("pressed");
}

if(e.key.toLowerCase()=="alt" || e.key.toLowerCase()=="shift" || e.key.toLowerCase()=="meta"){
	$("#"+e.code.toLowerCase()).removeClass("pressed");
}
if(e.code.toLowerCase()=="space"){
	$("#space").removeClass("pressed");
}
	if(e.key.toLowerCase()=="capslock")return
else{
	$("#"+e.key.toLowerCase() ).removeClass("pressed");
	}
}

// May have to be removed. Not being used currently
function highlightNextKey(params){
	$("#"+nxt.toLowerCase()).toggleClass("pressed");
	<!-- var params = { width:1680, height:1050 }; -->
	<!-- var str = jQuery.param( params ); -->
	<!-- $( "#results" ).text( str ); -->
}

// Function to highlight any key passed as input
function promptKey(key){
	// Handling all key types	
	if(key.length==1)
		$("#"+key.toLowerCase()).toggleClass("prompt");
	else{
		if(key.toLowerCase()=='ctrl'||key.toLowerCase()=='control')
			$("#control").toggleClass("prompt");
		if(key.toLowerCase()=='command' || key.toLowerCase()=='cmd')
			$("#metaleft").toggleClass("prompt");
		if(key.toLowerCase()=='fn')
			$("#fnc").toggleClass("prompt");
		if(key.toLowerCase()=='option')
			$("#optionleft").toggleClass("prompt");
		if(key.toLowerCase()=='shift')
			$("#shiftleft").toggleClass("prompt");
		if(key.toLowerCase()=='esc')
			$("#escape").toggleClass("prompt");
		if(key.toLowerCase()=='space bar')
			$("#space").toggleClass("prompt");
		if(key.toLowerCase()=='tab')
			$("#tab").toggleClass("prompt");
		if(key.toLowerCase()=='tilde(~)')
			$("#tilde").toggleClass("prompt");
		if(key.toLowerCase()=='comma(,)')
			$("#comma").toggleClass("prompt");
		if(key.toLowerCase()=='underscore(_)')
			$("#minus").toggleClass("prompt");
	}
}



// Function to read the next combination of keys and highlight it on keyboard
function readText(){
	
	quesNo = sessionStorage.getItem("questionNo")
	if(quesNo!=null){
		commandText = allData[parseInt(quesNo)-1].answer
		
	//commandText = "A+Control"  //$("#textdiv").text(); // Will be taken from some other list type of a source. 
								//Each command will have an associated question text used in writeQuestion
	var speed = 50
	
	var i = 0;
	// Call writeQuestion to add question on the top textarea
	console.log(allData[parseInt(sessionStorage.getItem("questionNo"))-1].question);
	writeQuestion(allData[parseInt(sessionStorage.getItem("questionNo"))-1].question)
		
	commandText.split('+').forEach(function(c) {	
		if(c.toLowerCase()=="command"){
			reqKeys.push("meta")
		}else{			
			reqKeys.push(c)
		}
		// Highlight the command keys
		promptKey(c)
		
	});
	
	// When the reqKeys combination is pressed, onSuccess function is called
	runOnKeys(

			() => onSuccess(...reqKeys), quesNo,
				...reqKeys 
		);
	
	//key(commandText, function(){ onSuccess(...reqKeys)});
	
	} // END IF for sessionStorage check
}

function writeQuestion(question) {
	if(typewriter!=null)
	{
		typewriter.deleteAll();
	}
	var newfield = document.getElementById('textdiv');

	typewriter = new Typewriter(newfield, {
		loop: false,
		typingSpeed: 2
	});

	typewriter.typeString(question)
    .start();
}

// Function to execute when correct keys are pressed.
function onSuccess(...keys){
	$("#textdiv").text("Correct Keys pressed!")
	
	// Un-Highlight the command keys.
	$.each( keys, function( index, key ){
		$("#"+key.toLowerCase()).toggleClass("prompt")
		if(key.toLowerCase()=="meta"){
			$("#metaleft").toggleClass("prompt")
		}
	});
	
	// Reset the reqKeys
	reqKeys = [];
	
	// Show the Try again button
	if(keys.length!=0){
	$("#retryButton").toggleClass("on");
	}
}

// Function to keep track when correct keys are pressed with a call back Success function as onSuccess() 
function runOnKeys(func, quesNo, ...keySet) {
      let pressed = new Set();	
		
      document.addEventListener('keydown', function(event) {
		event.preventDefault();
		if(sessionStorage.getItem("questionNo")!=null){
			if(quesNo!=sessionStorage.getItem("questionNo")){
				return;
			}
		}
		
        pressed.add(event.key.toLowerCase());
		handle(event);
        for (let key of keySet) { // are all required keys pressed?
          if (!pressed.has(key.toLowerCase())) {
            return;
          }
        }

        // All the required keys are pressed
        pressed.clear();

        func();
      });

      document.addEventListener('keyup', function(event) {
		  event.preventDefault();
		  if(sessionStorage.getItem("questionNo")!=null){
			if(quesNo!=sessionStorage.getItem("questionNo")){
				return;
			}
		}
        pressed.delete(event.key.toLowerCase());
		release(event);
      });

    }

//})
