let callback = response => {
    console.log('The Popup got the following Message: ' + JSON.stringify(response));
    $('#result').text(`today: ${response.scores[6]}, total: ${response.scores[12]}`);
};

let processResult = () => {
    $('#result').text(`processing...`);
}

$('.porintButton').click(function() {
    switch (this.id) {
        case 'loginPointButton':
            chrome.runtime.sendMessage({ action: 'login' }, callback);
            processResult();
            break;
        case 'completionPointButton':
            chrome.runtime.sendMessage({ action: 'completion' }, callback);
            processResult();
            break;
        case 'learningPointButton':
            chrome.runtime.sendMessage({ action: 'learning' }, callback);
            processResult();
            break;
        case 'exercisePointButton':
            chrome.runtime.sendMessage({ action: 'exercise' }, callback);
            processResult();
            break;
        case 'scorePointButton':
            chrome.runtime.sendMessage({ action: 'score' }, callback);
            processResult();
            break;
    }
    return true;
});