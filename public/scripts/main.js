// Global variable to keep track of CapsLock
let caps = false;
let allData ;
let reqKeys = []
let typewriter;
let quesNo;
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

// Key names to ID
const keyToId = {
  ctrl: 'control',
  control: 'control',
  command: 'metaleft',
  cmd: 'metaleft',
  meta: 'metaleft',
  fn: 'fnc',
  alt: 'optionleft',
  shift: 'shiftleft',
  esc: 'escape',
  tab: 'tab',
  'space bar': 'space',
  'tilde(~)': 'tilde',
  'comma(,)': 'comma',
  'underscore(_)': 'minus'
};

// this tracks when we started asking for the current key command
let questionStartMS = 0;

function setContainerHeight() {
  let containerEls = document.getElementsByClassName("container");
  let height = document.body.scrollHeight;
  for (let i = 0; i < containerEls.length; i++) {
    containerEls[i].height = height;
  }
}

function toggleClass(el, className) {
  if (!el) return;
  let classes = el.className.split(" ");
  let indexOfClass = classes.indexOf(className);
  if (indexOfClass !== -1) classes.splice(indexOfClass, 1);
  else classes.push(className);
  el.className = classes.join(" ");
}

function setClass(el, className, setTo) {
  if (!el) return;
  let classes = el.className.split(" ");
  let indexOfClass = classes.indexOf(className);
  if (indexOfClass !== -1) classes.splice(indexOfClass, 1);
  if (setTo) classes.push(className);
  el.className = classes.join(" ");
}

function addClass(el, className) {
  return setClass(el, className, true);
}

function removeClass(el, className) {
  return setClass(el, className, false);
}

window.addEventListener("load", function() {
  //toggleClass(document.getElementById(retryButton), "on");
  //alert($('li[data-keycode="test"]').attr('id'));
  fetch( "scripts/shortcuts.json").then(function(r) {
    return r.json();
  }).then(function( data ) {
    allData = data;
    if(localStorage.getItem("questionNo")==null){
      localStorage.setItem("questionNo", "1");
      localStorage.setItem("totalCount", Object.keys(allData).length);
    }
    // Call readText()
    readText()

    updateTimingDisplay();
  });

  setContainerHeight();
  window.addEventListener("resize", setContainerHeight);
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
  let text1 = e.type +
    ' key=' + e.key +
    ' code=' + e.code

  if(e.code.toLowerCase()=="space"){
    toggleClass(document.getElementById("space"), "pressed");
  }
  if((e.which>=186 && e.which<=192)|| (e.which>=219 && e.which<=222)){
    toggleClass(document.getElementById(e.code.toLowerCase()), "pressed");
  }
  if(e.key.toLowerCase()=="alt" || e.key.toLowerCase()=="shift" || e.key.toLowerCase()=="meta"){
    let keyString = e.code;
    if(e.code == FIREFOX_LEFT_COMMAND_STRING) {
      keyString = CHROME_LEFT_COMMAND_STRING
    } else if (e.code == FIREFOX_RIGHT_COMMAND_STRING) {
      keyString = CHROME_RIGHT_COMMAND_STRING
    }
    toggleClass(document.getElementById(keyString.toLowerCase()), "pressed");
  }
  if(e.key.toLowerCase()=="capslock" && caps==false){
    caps= true;
    toggleClass(document.getElementById(e.key.toLowerCase()), "pressed");
    let letterEls = document.getElementsByClassName("letter");
    for (let i = 0; i < letterEls.length; i++) {
      toggleClass(letterEls[i], "uppercase");
    }
  }
  else document.querySelector("#"+e.key.toLowerCase() ).classList.add("pressed");
}

// Function called on KeyUp to reset the key by removing class = 'pressed'
function release(e) {
  if((e.which>=186 && e.which<=192)|| (e.which>=219 && e.which<=222)){
    document.querySelector("#"+e.code.toLowerCase()).classList.remove("pressed");
  }
  if(e.key.toLowerCase()=="alt" || e.key.toLowerCase()=="shift" || e.key.toLowerCase()=="meta"){
    let keyString = e.code;
    if(e.code == FIREFOX_LEFT_COMMAND_STRING) {
      keyString = CHROME_LEFT_COMMAND_STRING
    } else if (e.code == FIREFOX_RIGHT_COMMAND_STRING) {
      keyString = CHROME_RIGHT_COMMAND_STRING
    }
    document.querySelector("#"+keyString.toLowerCase()).classList.remove("pressed");
  }
  if(e.code.toLowerCase()=="space"){
    document.querySelector("#space").classList.remove("pressed");
  }
  if(e.key.toLowerCase()=="capslock"){
    toggleClass(document.getElementById(e.key.toLowerCase()), "pressed");
    let letterEls = document.getElementsByClassName("letter");
    for (let i = 0; i < letterEls.length; i++) {
      toggleClass(letterEls[i], "uppercase");
    }
    caps=false;
  }
  else{
    document.querySelector("#"+e.key.toLowerCase() ).classList.remove("pressed");
  }
}

// May have to be removed. Not being used currently
function highlightNextKey(params){
  toggleClass(document.getElementById(nxt.toLowerCase()), "pressed");
  <!-- let params = { width:1680, height:1050 }; -->
    <!-- let str = jQuery.param( params ); -->
    <!-- $( "#results" ).text( str ); -->
}

function promptKey2(key){
  //if($('li[data-keycode="'+key+'"]'[0]).hasClass('prompt')){
  toggleClass(document.querySelector('li[data-keycode="'+key+'"]'), "prompt");
  //}
}

// Function to highlight any key passed as input
function promptKey(key){
  // Handling all key types
  key = key.toLowerCase();
  id = key.length == 1 ? key : keyToId[key];
  if (id) toggleClass(document.getElementById(id), 'prompt');
}

// Function to read the next combination of keys and highlight it on keyboard
function readText(){
  quesNo = localStorage.getItem("questionNo")
  if(quesNo!=null){
    commandText = allData[parseInt(quesNo)-1].answer
    answerkeys = allData[parseInt(quesNo)-1].keys
    //commandText = "A+Control"  //$("#textdiv").text(); // Will be taken from some other list type of a source.
    //Each command will have an associated question text used in writeQuestion
    let speed = 50
    let i = 0;

    // Call writeQuestion to add question on the top textarea
    writeQuestion(allData[parseInt(localStorage.getItem("questionNo"))-1].question)

    for (const val of answerkeys) {
      reqKeys.push(val)
      // Highlight the prompt keys
      promptKey2(val)
    }

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
    document.querySelector('#textdiv span').innerText = "";
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
  document.querySelector("#read").classList.remove('incorrect');
};

function clearPromptKeys() {
  document.querySelector('.prompt').classList.remove('prompt');
};


function clearPressedKeys() {
  pressed.clear();
  document.querySelector('.pressed').classList.remove('pressed');
};

function updateTimingDisplay() {
  document.getElementById('timing-feedback').innerHTML = "";
  let questionNo = localStorage.getItem('questionNo');
  // grab the last bits of timing data
  let timings = getHistory(questionNo).slice(-3);

  // and then drop them into the boxes
  timings.forEach(function(t, idx) {
    let element = document.getElementById('timing-' + idx);
    if (element) {
      element.innerHTML = t / 1000 + ' sec';
      element.style.display = "initial";
    }
  })

  // hide the boxes if we don't have timing data
  for (let i = timings.length; i < 3; i++) {
    let el = document.getElementById('timing-' + i);
    if (el) el.style.display = "hidden";
  }
}

function onIncorrect() {
  $('#textdiv').effect("shake", { distance: 3 });
  document.querySelector("#read").classList.add('incorrect');
  setTimeout(clearPressedKeys, 500);
};

function handleTimingFeedback(questionNo, curMS) {
  let previousTimings = getHistory(questionNo);
  if (previousTimings.length == 0) {
    return;
  }

  let average = previousTimings.reduce(
    function(acc, cur) { return acc + cur },
    0,
  ) / previousTimings.length;

  let delta = average - curMS;

  let template = null;
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
  document.getElementById("timing-feedback").innerHTML = template.replace('${delta}', delta);
}

// Function to execute when correct keys are pressed.
function onSuccess() {
  let questionNo = localStorage.getItem("questionNo");
  let thisAnswerMS = Date.now() - questionStartMS;
  handleTimingFeedback(questionNo, thisAnswerMS);
  recordAnswer(questionNo, thisAnswerMS);
  saveHistory();
  document.querySelector('#textdiv span').innerText = 'Correct Keys pressed!';
  clearPromptKeys();
  clearPressedKeys();
  confetti(document.getElementById("confetti"), { spread: 180, startVelocity: 50, elementCount: 150 });
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
