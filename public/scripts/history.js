// global reference to the history; shouldn't be directly accessed outside
// this file.
//
// If we are using a remote backend cache the value here for easy access once
// we've done an initial retrieval
var _history = null;

// this tracks if we're using local storage or some remote user system to
// keep timing data
var _historyUsesLocalStorage = true;

// the key we store timing data under when in local storage mode
var _historyKey = 'response_history';

///////////////////////////////////////////////////////////////////////////////

// If we are storing things remotely the code to get them goes here
function getRemoteHistory() {
    console.error('User accounts not yet implemented.');
    return null;
}

// as above except saving
function saveRemoteHistory() {
    console.error('User accounts not yet implementhed.');
    return false;
}

// ensures that history has been loaded; returns true on success
function loadHistory() {
    if (_history !== null) {
        return true;
    }

    if (!_historyUsesLocalStorage) {
        var history = getRemoteHistory();
        if (history === null) {
            console.error('Falling back to local history');
        } else {
            _history = history;
            return true;
        }
    }

    var history = localStorage.getItem(_historyKey);
    if (history == null) {
        localStorage.setItem(_historyKey, JSON.stringify({}));
        history = "{}";
    }
    _history = JSON.parse(history);
    return true;
}

// saves history; returns true on success
function saveHistory() {
    if (!_historyUsesLocalStorage) {
        if (saveRemoteHistory()) {
            return true;
        }
        console.error('Falling back to local history');
    }

    localStorage.setItem(_historyKey, JSON.stringify(_history));
    return true;
}

// clears historic timing data and saves the cleared state; returns true on
// success
function clearHistory() {
    _history = {};
    return saveHistory();
}

// returns an array with timing data for a given question number
function getHistory(questionNo) {
    if (!loadHistory()) {
        console.error('Unable to load history for question ' + questionNo);
        return [];
    }
    
    var record = _history[questionNo];
    return !!record ? record : [];
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