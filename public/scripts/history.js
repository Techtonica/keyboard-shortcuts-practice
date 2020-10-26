///////////////////////////////////////////////////////////////////////////////

// returns an array with timing data for a given question number
async function getHistory(questionNo) {
    let url = new URL(document.URL + 'user/answers/question/' + questionNo);

    try{
        let response = await fetch(url);
        let body = await response.json();
        return body.previousTimingMs;
        
    }catch(error){
        console.error(error); 
        return [];
    }
}

// record the time taken to answer a given question based on the question
// number
function recordAnswer(questionNo, timeSpentMS) {
    if (!loadHistory()) {
        console.error('Unable to record new time for question ' + questionNo);
        return false;
    }

    // check for existing timing data, initialize if none found
    if (!_history[questionNo]) {
        _history[questionNo] = [];
    }
    _history[questionNo].push(timeSpentMS);
    return true;
}

module.exports = {
    getHistory,
    getRemoteHistory,
    saveRemoteHistory,
    loadHistory,
    saveHistory,
    recordAnswer,
    clearHistory

  };
