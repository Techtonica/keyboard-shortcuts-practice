$(document).ready(function() {
<!-- write.onkeydown = write.onkeyup =  -->

$("#textdiv").text("Ctrl-A")

$("#textdiv").addClass("anim")

write.onkeydown = handle;
write.onkeyup = release;
var caps = false;

readText()

function readText(){
	commandText = $("#textdiv").text();
	commandText.split('-').forEach(function(c) {
    promptKey(c)
	});

}

function handle(e) {
	var text1 = e.type +
	' key=' + e.key +
	' code=' + e.code
if(e.key.toLowerCase()=="control" || e.key.toLowerCase()=="shift"){
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
	if(e.key.toLowerCase()=="control" || e.key.toLowerCase()=="shift"){
	$("#"+e.code.toLowerCase()).toggleClass("pressed");
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
	if(key.toLowerCase()=='ctrl')
		$("#controlleft").toggleClass("prompt");
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

})
