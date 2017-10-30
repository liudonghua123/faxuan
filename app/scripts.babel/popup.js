let callback = response => {
    console.log('The Popup got the following Message: ' + JSON.stringify(response));
    $('#result').text(`today score: ${response.scores[6]}, total score: ${response.scores[12]}`);
};

$('.porintButton').click(function() {
    switch (this.id) {
        case 'loginPointButton':
            chrome.runtime.sendMessage({ action: 'login' }, callback);
            break;
        case 'completionPointButton':
            chrome.runtime.sendMessage({ action: 'completion' }, callback);
            break;
        case 'learningPointButton':
            chrome.runtime.sendMessage({ action: 'learning' }, callback);
            break;
        case 'exercisePointButton':
            chrome.runtime.sendMessage({ action: 'exercise' }, callback);
            break;
    }
    return true;
});