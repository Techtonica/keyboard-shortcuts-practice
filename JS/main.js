$(document).ready(function() {
<!-- write.onkeydown = write.onkeyup =  -->

//$("#textdiv").text("Control-A")

write.onkeydown = handle;
write.onkeyup = release;
var caps = false;

readText()

function checkPromptKey(e){
	if($("#"+e.code.toLowerCase()).hasClass("prompt")){
		
	}
}


function handle(e) {
	var text1 = e.type +
	' key=' + e.key +
	' code=' + e.code
	
	var isPrompt = false
	<!-- Check if the key is the one of the prompted keys -->
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

function highlightNextKey(params){
	$("#"+nxt.toLowerCase()).toggleClass("pressed");
	<!-- var params = { width:1680, height:1050 }; -->
	<!-- var str = jQuery.param( params ); -->
	<!-- $( "#results" ).text( str ); -->
}

function promptKey(key){
	if(key.toLowerCase()=='ctrl'||key.toLowerCase()=='control')
		$("#control").toggleClass("prompt");
	else if(key.toLowerCase()=='command' || key.toLowerCase()=='cmd')
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

function readText(){
	var reqKeys = []
	commandText = "A-Control"  //$("#textdiv").text();
	var speed = 50
	
	var i = 0;
	writeQuestion("How do you go to the start of text?", speed, i)
	commandText.split('-').forEach(function(c) {		
		reqKeys.push(c)
		promptKey(c)
		
	});
	runOnKeys(

			() => onSuccess(...reqKeys),
				...reqKeys
		);
}

function writeQuestion(question, speed, i) {
  if (i < question.length) {
    $("#textdiv").innerHTML+= question.charAt(i);
    i++;
    setTimeout(writeQuestion(question, speed, i), speed);
  }
}

function onSuccess(...keys){
	$("#textdiv").text("Correct Keys pressed")
	
	$.each( keys, function( index, key ){
		$("#"+key.toLowerCase()).toggleClass("prompt")
	});
	
}
	
function runOnKeys(func, ...keySet) {
      let pressed = new Set();

      document.addEventListener('keydown', function(event) {
        pressed.add(event.key.toLowerCase());

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
        pressed.delete(event.key.toLowerCase());
      });

    }

})
