// Global variable to keep track of CapsLock
var caps = false;
var allData ;
var reqKeys = []
var typewriter;
var quesNo;
let pressed = new Set();

$(document).ready(function() {
  //$("#retryButton").toggleClass("on");
  //alert($('li[data-keycode="test"]').attr('id'));
  $.getJSON( "JS/shortcuts.json", function( data ) {
    allData = data;
    if(sessionStorage.getItem("questionNo")==null){
      sessionStorage.setItem("questionNo", "1");
      sessionStorage.setItem("totalCount", Object.keys(allData).length);
    }
    // Call readText()
    readText()
  })
});

function nextQuestion(){
  if(sessionStorage.getItem("questionNo")!=null){
    if(parseInt(sessionStorage.getItem("questionNo"))<parseInt(sessionStorage.getItem("totalCount"))){
      sessionStorage.setItem("questionNo", parseInt(sessionStorage.getItem("questionNo"))+1);
    } else {
      sessionStorage.setItem("questionNo","1");
    }
  }
  clearPromptKeys();
  clearPressedKeys();
  reqKeys = [];
  readText();
}

function prevQuestion() {
  if(sessionStorage.getItem("questionNo")!=null){
    if(parseInt(sessionStorage.getItem("questionNo")) > 1) {
      sessionStorage.setItem("questionNo", parseInt(sessionStorage.getItem("questionNo"))-1);
    }
  }
  clearPromptKeys();
  clearPressedKeys();
  reqKeys = [];
  readText();
}

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
  if(e.key.toLowerCase()=="capslock") return
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

function promptKey2(key){
  //if($('li[data-keycode="'+key+'"]'[0]).hasClass('prompt')){
  $($('li[data-keycode="'+key+'"]')[0]).toggleClass("prompt")
  //}
}

// Function to highlight any key passed as input
function promptKey(key){
  // Handling all key types
  if(key.length==1) $("#"+key.toLowerCase()).toggleClass("prompt");
  else {
    if(key.toLowerCase()=='ctrl'||key.toLowerCase()=='control')
      $("#control").toggleClass("prompt");
    if(key.toLowerCase()=='command' || key.toLowerCase()=='cmd'|| key.toLowerCase()=="meta")
      $("#metaleft").toggleClass("prompt");
    if(key.toLowerCase()=='fn')
      $("#fnc").toggleClass("prompt");
    if(key.toLowerCase()=='alt')
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
    answerkeys = allData[parseInt(quesNo)-1].keys
    //commandText = "A+Control"  //$("#textdiv").text(); // Will be taken from some other list type of a source.
    //Each command will have an associated question text used in writeQuestion
    var speed = 50
    var i = 0;

    // Call writeQuestion to add question on the top textarea
    writeQuestion(allData[parseInt(sessionStorage.getItem("questionNo"))-1].question)

    $.each(answerkeys , function(index, val) {
      reqKeys.push(val)
      // Highlight the prompt keys
      promptKey2(val)
    });

    /* commandText.split('+').forEach(function(c) {
      if(c.toLowerCase()=="command"){
        reqKeys.push("meta")
      }else if(c.toLowerCase()=="option"){
        reqKeys.push("alt")
      }
      else{
        reqKeys.push(c)
      }
// Highlight the prompt keys
      promptKey(c)

    }); */

    //key(commandText, function(){ onSuccess(...reqKeys)});
  } // END IF for sessionStorage check
}

function writeQuestion(question) {
  if(typewriter!=null) {
    typewriter.stop();
    $('#textdiv span').first().text('');
  } else {
    typewriter = new Typewriter(document.getElementById('textdiv'), {
      loop: false,
      delay: 10
    });
  }
  typewriter.typeString(question).start();
}

function clearIncorrectIndication() {
  $("#read").removeClass('incorrect');
};

function clearPromptKeys() {
  $('.prompt').removeClass('prompt');
};

function clearPressedKeys() {
  pressed.clear();
  $('.pressed').removeClass('pressed');
};

function onIncorrect() {
  $('#textdiv').effect("shake", { distance: 3 });
  $("#read").addClass('incorrect');
  setTimeout(clearPressedKeys, 500);
};

// Function to execute when correct keys are pressed.
function onSuccess(){
  $("#textdiv").text("Correct Keys pressed!")
  clearPromptKeys();
  clearPressedKeys();
  confetti($("#confetti").get(0), { spread: 180, startVelocity: 50, elementCount: 150 });
  setTimeout(nextQuestion, 1000);
}

document.addEventListener('keydown', function(event) {
  event.preventDefault();
  clearIncorrectIndication();
  if(sessionStorage.getItem("questionNo")!=null){
    if(quesNo!=sessionStorage.getItem("questionNo")){
      return;
    }
  }

  pressed.add(event.keyCode);
  handle(event);
  const keySet = new Set(reqKeys);
  if (keySet.size <= pressed.size) {
    for (let key of pressed) { // are all required keys pressed?
      if (!keySet.has(key)) {
        onIncorrect();
        return;
      }
    }
    // All the required keys are pressed
    onSuccess();
  }
});

document.addEventListener('keyup', function(event) {
  event.preventDefault();
  if(sessionStorage.getItem("questionNo")!=null){
    if(quesNo!=sessionStorage.getItem("questionNo")) {
      return;
    }
  }
  pressed.delete(event.keyCode);
  release(event);
});

window.addEventListener('focus', function (e) {
  // Chrome disables capturing certain commands like:
  // Cmd+n, Cmd+t, Cmd+w
  // Here, we're using window refocus to progress the game
  clearPressedKeys();
  if (reqKeys[0] && reqKeys[1] && reqKeys[0] === 91 &&
    (reqKeys[1] === 78 || reqKeys[1] === 87 || reqKeys[1] === 84)) {
    onSuccess();
  }
});
