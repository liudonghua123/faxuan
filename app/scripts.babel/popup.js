let callback = response => {
    console.log('The Popup got the following Message: ' + JSON.stringify(response));
    if(response.scores) {
        $('#result').text(`today: ${response.scores[6]}, total: ${response.scores[12]}`);
    }
    else {
        $('#result').text(`${JSON.stringify(response)}`);
    }
};

let processResult = () => {
    $('#result').text(`processing...`);
}

$('.porintButton').click(function () {
    switch (this.id) {
        case 'loginPointButton':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'login' }, callback);
            });
            processResult();
            break;
        case 'completionPointButton':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'completion' }, callback);
            });
            processResult();
            break;
        case 'learningPointButton':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'learning' }, callback);
            });
            processResult();
            break;
        case 'exercisePointButton':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'exercise' }, callback);
            });
            processResult();
            break;
        case 'scorePointButton':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'score' }, callback);
            });
            processResult();
            break;
    }
    return true;
});

let enable = (element, enabled) => {
    if(enabled) {
        element.removeAttr('disabled')
    }
    else {
        element.attr('disabled','disabled')
    }
}

$(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0];
        const currentTabUrl = currentTab.url;
        if(currentTabUrl.indexOf('http://www.faxuan.net') == 0) {
            enable($('#loginPointButton'), true);
            enable($('#completionPointButton'), false);
            enable($('#learningPointButton'), false);
            enable($('#exercisePointButton'), false);
            enable($('#scorePointButton'), false);
        }
        else if(currentTabUrl.indexOf('http://xf.faxuan.net') == 0) {
            enable($('#loginPointButton'), false);
            enable($('#completionPointButton'), true);
            enable($('#learningPointButton'), true);
            enable($('#exercisePointButton'), false);
            enable($('#scorePointButton'), true);
        }
    });
});