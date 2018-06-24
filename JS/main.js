function retry(){
	// Hide the Try again button
	$("#retryButton").toggleClass("on");
	readText();
}

$(document).ready(function() {
$("#retryButton").toggleClass("on");	
// Call readText() 
readText()

$.getJSON( "JS/shortcuts.json", function( data ) {
	alert(data.length)
	//data.length  6  data[0].name
	if(sessionStorage.getItem("questionNo")==null){
		sessionStorage.setItem("questionNo", "1");
	}
})

});
	
//$("#textdiv").text("Control-A")

//Set keyUp and KeyDown custom functions
//write.onkeydown = handle;
//write.onkeyup = release;

// Global variable to keep track of CapsLock 
var caps = false;



// May have to be removed. Not being used currently
function checkPromptKey(e){
	if($("#"+e.code.toLowerCase()).hasClass("prompt")){
		
	}
}


// Function called on KeyDown to show Pressed key by adding class = 'pressed' 
function handle(e) {	
	var text1 = e.type +
	' key=' + e.key +
	' code=' + e.code		
	var isPrompt = false
	//Check if the key is the one of the prompted keys
	isPrompt = checkPromptKey(e)
	
if(e.code.toLowerCase()=="space"){
	$("#space").toggleClass("pressed");
}
	
if((e.which>=186 && e.which<=192)|| (e.which>=219 && e.which<=222)){
	$("#"+e.code.toLowerCase()).toggleClass("pressed");
}
	
if(e.key.toLowerCase()=="alt" || e.key.toLowerCase()=="shift" || e.key.toLowerCase()=="command"){
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
	$("#"+e.code.toLowerCase()).toggleClass("pressed");
}

if(e.key.toLowerCase()=="alt" || e.key.toLowerCase()=="shift" || e.key.toLowerCase()=="command"){
	$("#"+e.code.toLowerCase()).toggleClass("pressed");
}
if(e.code.toLowerCase()=="space"){
	$("#space").toggleClass("pressed");
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
	if(key.toLowerCase()=='ctrl'||key.toLowerCase()=='control')
		$("#control").toggleClass("prompt");
	else if(key.toLowerCase()=='command' || key.toLowerCase()=='cmd'|| key.toLowerCase()=='&#8984;')
		$("#commandleft").toggleClass("prompt");
	else if(key.toLowerCase()=='fn')
		$("#fnc").toggleClass("prompt");
	else if(key.toLowerCase()=='option')
		$("#optionleft").toggleClass("prompt");
	else if(key.toLowerCase()=='shift')
		$("#shiftleft").toggleClass("prompt");
	else if(key.toLowerCase()=='esc')
		$("#escape").toggleClass("prompt");
	else if(key.toLowerCase()=='space bar')
		$("#space").toggleClass("prompt");
	else if(key.toLowerCase()=='tab')
		$("#tab").toggleClass("prompt");
	else if(key.toLowerCase()=='tilde(~)')
		$("#tilde").toggleClass("prompt");
	else if(key.toLowerCase()=='comma(,)')
		$("#comma").toggleClass("prompt");
	else if(key.toLowerCase()=='underscore(_)')
		$("#minus").toggleClass("prompt");
	else if(key.toLowerCase().charCodeAt(0)>=97 && key.toLowerCase().charCodeAt(0)<=122)
		$("#"+key.toLowerCase()).toggleClass("prompt");
}

var reqKeys = []
// Function to read the next combination of keys and highlight it on keyboard
function readText(){
	
	commandText = "A+Control"  //$("#textdiv").text(); // Will be taken from some other list type of a source. 
								//Each command will have an associated question text used in writeQuestion
	var speed = 50
	
	var i = 0;
	// Call writeQuestion to add question on the top textarea
	writeQuestion("How do you go to the start of text?")
		
	commandText.split('+').forEach(function(c) {		
		reqKeys.push(c)
		// Highlight the command keys
		promptKey(c)
		
	});
	
	// When the reqKeys combination is pressed, onSuccess function is called
	runOnKeys(

			() => onSuccess(...reqKeys),
				...reqKeys
		);
}

function writeQuestion(question) {
	var newfield = document.getElementById('textdiv');

	var typewriter = new Typewriter(newfield, {
		loop: false
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
	});
	
	// Reset the reqKeys
	reqKeys = [];
	
	// Show the Try again button
	if(keys.length!=0){
	$("#retryButton").toggleClass("on");
	}
}

// Function to keep track when correct keys are pressed with a call back Success function as onSuccess() 
function runOnKeys(func, ...keySet) {
      let pressed = new Set();

      document.addEventListener('keydown', function(event) {
		event.preventDefault();
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
        pressed.delete(event.key.toLowerCase());
		release(event);
      });

    }

//})