$(document).ready(function() {
<!-- write.onkeydown = write.onkeyup =  -->

$("#textdiv").text("The company's rapid growth since")

$("#textdiv").addClass("anim")

write.onkeydown = handle;
write.onkeyup = release;
var caps = false;
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
})
