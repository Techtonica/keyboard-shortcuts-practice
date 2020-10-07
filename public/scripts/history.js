///////////////////////////////////////////////////////////////////////////////

// returns an array with timing data for a given question number
async function getHistory(questionNo) {
    let url = new URL(document.URL + 'user/answers/question/' + questionNo);
    let params = {
        userId: 'guest' // TODO: get actual userId
    }
    url.search = new URLSearchParams(params).toString();

    try{
        let response = await fetch(url);
        let body = await response.json();
        return body.previousTimingMs;
        
    }catch(error){
        console.error(error); 
        return [];
    }
}
