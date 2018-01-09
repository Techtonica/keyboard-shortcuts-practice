$(document).ready(function() {
<!-- write.onkeydown = write.onkeyup =  -->
<!-- write.onkeypress = handle; -->
<!-- $("#read").text("The company's rapid growth since incorporation has triggered a chain of products, acquisitions, and partnerships beyond Google's core search engine (Google Search). It offers services designed for work and productivity (Google Docs, Sheets, and Slides), email (Gmail/Inbox), scheduling and time management (Google Calendar), cloud storage (Google Drive), social networking (Google+), instant messaging and video chat (Google Allo/Duo/Hangouts), language translation (Google Translate), mapping and turn-by-turn navigation (Google Maps/Waze/Earth/Street View), video sharing (YouTube), notetaking (Google Keep), and photo organizing and editing (Google Photos). The company leads the development of the Android mobile operating system, the Google Chrome web browser, and Chrome OS, a lightweight operating system based on the Chrome browser. Google has moved increasingly into hardware; from 2010 to 2015, it partnered with major electronics manufacturers in the production of its Nexus devices, and in October 2016, it released multiple hardware products (including the Google Pixel smartphone, Home smart speaker, Wifi mesh wireless router, and Daydream View virtual reality headset). The new hardware chief, Rick Osterloh, stated: \"a lot of the innovation that we want to do now ends up requiring controlling the end-to-end user experience\". Google has also experimented with becoming an Internet carrier. In February 2010, it announced Google Fiber, a fiber-optic infrastructure that was installed in Kansas City"); -->
$("#textdiv").text("The company's rapid growth since")
<!-- $("#read").css("animation", "typing 3.5s steps(" + $('#read').val().length +",end);") -->
$("#textdiv").addClass("anim")
alert($("#textdiv").css("animation"))
write.onkeydown = handle;
write.onkeyup = release;
var caps = false;
function handle(e) {
	var text1 = e.type +
	' key=' + e.key +
	' code=' + e.code
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