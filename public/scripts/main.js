// Global variable to keep track of CapsLock
var caps = false;
var allData ;
var reqKeys = []
var typewriter;
var quesNo;
let pressed = new Set();

// event.keyCode Chrome and Firefox
const CHROME_LEFT_COMMAND_CODE = 91;
const CHROME_RIGHT_COMMAND_CODE = 93;
const FIREFOX_COMMAND_CODE = 224;

// e.code for Chrome and Firefox
const FIREFOX_LEFT_COMMAND_STRING = 'OSLeft';
const FIREFOX_RIGHT_COMMAND_STRING = 'OSRight';
const CHROME_LEFT_COMMAND_STRING = 'MetaLeft';
const CHROME_RIGHT_COMMAND_STRING = 'MetaRight';

// this tracks when we started asking for the current key command
let questionStartMS = 0;

$(document).ready(function() {
  //$("#retryButton").toggleClass("on");
  //alert($('li[data-keycode="test"]').attr('id'));
  $.getJSON( "scripts/shortcuts.json", function( data ) {
    allData = data;
    if(localStorage.getItem("questionNo")==null){
      localStorage.setItem("questionNo", "1");
      localStorage.setItem("totalCount", Object.keys(allData).length);
    }
    // Call readText()
    readText()
    
    updateTimingDisplay();
  })

  $('.container').css('height', $(window).height());
  $(window).on('resize', function() {
    $('.container').css('height', $(window).height());
  });
});

function nextQuestion() {
  if(localStorage.getItem("questionNo")!=null){
    if(parseInt(localStorage.getItem("questionNo"))<parseInt(localStorage.getItem("totalCount"))){
      localStorage.setItem("questionNo", parseInt(localStorage.getItem("questionNo"))+1);
    } else {
      localStorage.setItem("questionNo","1");
    }
  }
  clearPromptKeys();
  clearPressedKeys();
  updateTimingDisplay();
  reqKeys = [];
  readText();
}

function prevQuestion() {
  if(localStorage.getItem("questionNo")!=null){
    if(parseInt(localStorage.getItem("questionNo")) > 1) {
      localStorage.setItem("questionNo", parseInt(localStorage.getItem("questionNo"))-1);
    }
  }
  clearPromptKeys();
  clearPressedKeys();
  updateTimingDisplay();
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
    let keyString = e.code;
    if(e.code == FIREFOX_LEFT_COMMAND_STRING) {
      keyString = CHROME_LEFT_COMMAND_STRING
    } else if (e.code == FIREFOX_RIGHT_COMMAND_STRING) {
      keyString = CHROME_RIGHT_COMMAND_STRING
    }
    $("#"+keyString.toLowerCase()).toggleClass("pressed");
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
    let keyString = e.code;
    if(e.code == FIREFOX_LEFT_COMMAND_STRING) {
      keyString = CHROME_LEFT_COMMAND_STRING
    } else if (e.code == FIREFOX_RIGHT_COMMAND_STRING) {
      keyString = CHROME_RIGHT_COMMAND_STRING
    }
    $("#"+keyString.toLowerCase()).removeClass("pressed");
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
  quesNo = localStorage.getItem("questionNo")
  if(quesNo!=null){
    commandText = allData[parseInt(quesNo)-1].answer
    answerkeys = allData[parseInt(quesNo)-1].keys
    //commandText = "A+Control"  //$("#textdiv").text(); // Will be taken from some other list type of a source.
    //Each command will have an associated question text used in writeQuestion
    var speed = 50
    var i = 0;

    // Call writeQuestion to add question on the top textarea
    writeQuestion(allData[parseInt(localStorage.getItem("questionNo"))-1].question)

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
  } // END IF for localStorage check
}

function writeQuestion(question) {
  if(typewriter!=null) {
      typewriter.state.eventQueue = [];
    $('#textdiv span').first().text('');
  } else {
    typewriter = new Typewriter(document.getElementById('textdiv'), {
      loop: false,
      delay: 10
    });
  }
  typewriter.typeString(question).start();

  // and, finally, mark the beginning of asking the question
  questionStartMS = Date.now();
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

function updateTimingDisplay() {
  $('#timing-feedback').html('');
  var questionNo = localStorage.getItem('questionNo');
  // grab the last bits of timing data
  var timings = getHistory(questionNo).slice(-3);

  // and then drop them into the boxes
  timings.forEach(function(t, idx) {
    var element = $('#timing-' + idx);
    element.html(t / 1000 + ' sec');
    element.show();
  })

  // hide the boxes if we don't have timing data
  for (var i = timings.length; i < 3; i++) {
    $('#timing-' + i).hide();
  }
}

function onIncorrect() {
  $('#textdiv').effect("shake", { distance: 3 });
  $("#read").addClass('incorrect');
  setTimeout(clearPressedKeys, 500);
};

function handleTimingFeedback(questionNo, curMS) {
  var previousTimings = getHistory(questionNo);
  if (previousTimings.length == 0) {
    return;
  }

  var average = previousTimings.reduce(
    function(acc, cur) { return acc + cur },
    0,
  ) / previousTimings.length;

  var delta = average - curMS;

  var template = null;
  if (delta > 0) {
    template = "<br/>You were <span style='color:green;'>faster</span> by ${delta} sec!";
  }
  if (delta < 0) {
    template = "<br/>You were <span style='color:red;'>slower</span> by ${delta} sec.";
  }
  if (template === null) {
    return;
  }

  // convert MS to S
  delta = Math.abs(delta) / 1000;
  // now we want to trunate to 2 decimals; the `+` will let us only use 2
  // decimals if we actually need them, e.g., we want 1.5 not 1.50
  // cf. https://stackoverflow.com/a/12830454
  delta = +delta.toFixed(2);
  $('#timing-feedback').html(template.replace('${delta}', delta));
}

// Function to execute when correct keys are pressed.
function onSuccess() {
  var questionNo = localStorage.getItem("questionNo");
  var thisAnswerMS = Date.now() - questionStartMS;
  handleTimingFeedback(questionNo, thisAnswerMS);
  recordAnswer(questionNo, thisAnswerMS);
  saveHistory();
  $('#textdiv span').first().text('Correct Keys pressed!');
  clearPromptKeys();
  clearPressedKeys();
  confetti($("#confetti").get(0), { spread: 180, startVelocity: 50, elementCount: 150 });
  setTimeout(nextQuestion, 1500);
}

document.addEventListener('keydown', function(event) {
  event.preventDefault();
  clearIncorrectIndication();
  if(localStorage.getItem("questionNo")!=null){
    if(quesNo!=localStorage.getItem("questionNo")){
      return;
    }
  }

  // If used in Firefox, change command key code to be the same as that of Chrome
  let keyCode = event.keyCode;
  if (navigator.userAgent.search('Firefox') > 0 && keyCode == FIREFOX_COMMAND_CODE) {
    keyCode = CHROME_LEFT_COMMAND_CODE;
  }

  // Make left and right command key the same
  if (keyCode == CHROME_RIGHT_COMMAND_CODE) {
    keyCode = CHROME_LEFT_COMMAND_CODE;
  }

  pressed.add(keyCode);
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
  if(localStorage.getItem("questionNo")!=null){
    if(quesNo!=localStorage.getItem("questionNo")) {
      return;
    }
  }

  // If used in Firefox, change command key code to be the same as that of Chrome
  let keyCode = event.keyCode;
  if (navigator.userAgent.search('Firefox') > 0 && keyCode == FIREFOX_COMMAND_CODE) {
    keyCode = CHROME_LEFT_COMMAND_CODE;
  }

  // Make left and right command key the same
  if (keyCode == CHROME_RIGHT_COMMAND_CODE) {
    keyCode = CHROME_LEFT_COMMAND_CODE;
  }

  pressed.delete(keyCode);
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

sequelize.close(); 
