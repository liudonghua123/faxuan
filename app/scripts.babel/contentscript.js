console.info('contentscript run here!');

const doLogin = async () => {
    $.ajax({
        type: 'POST',
        cache: false,
        url: 'http://www.faxuan.net/shop/api/add_use_lpoint',
        data: {
            userAccount: JSON.parse(Cookies.get('loginUser')).userAccount,
            domainCode: JSON.parse(Cookies.get('loginUser')).domainCode,
            sid: JSON.parse(Cookies.get('loginUser')).sid
        }
    });
};

const doCompletion = async () => {
    $.ajax({
        type: 'GET',
        url: 'http://xf.faxuan.net/pss/service/postPoint' + '?operateType=ipoint&userAccount=' + JSON.parse(Cookies.get('loginUser')).userAccount + '&domainCode=' + JSON.parse(Cookies.get('loginUser')).domainCode + '&timestamp=' + new Date()
    });
};

const doLearning = async () => {
    $.ajax({
        type: 'GET',
        url: 'http://xf.faxuan.net/pss/service/postPoint' + '?operateType=spoint&userAccount=' + JSON.parse(Cookies.get('loginUser')).userAccount + '&domainCode=' + JSON.parse(Cookies.get('loginUser')).domainCode + '&timestamp=' + new Date() + '&stime=' + 15
    });
};

const doExercise = () => {

};

const timesAction = async (times, action) => {
    for (let i = 0; i < times; i++) {
        const result = await action();
        console.info(JSON.stringify(result));
    }
};

const nrMultiLineText2Array = function (d) {
    var b = d.split('\r\n');
    var a = new Array();
    for (var c = 0; c < b.length; c++) {
        if (b[c] == '$-1') {
            a.push('')
        } else {
            if (b[c].indexOf('$') == 0) {
                a.push(b[c + 1])
            }
        }
    }
    return a
}

const getScore = async () => {
    try {
        let rawScore = await $.ajax({
            type: 'GET',
            url: 'http://xf.faxuan.net/pss/service/getpoint?type=mypoint&timestamp=' + Date.parse(new Date()),
            data: {
                userAccount: JSON.parse(Cookies.get('loginUser')).userAccount,
                key: Math.floor(Math.random() * 50)
            }
        });
        let scores = nrMultiLineText2Array(rawScore);
        // scores like ['1030', '0', '60', '10', '40', '1', '111', '0', '1120', '225', '760', '18', '2123']
        console.info(scores);
        return scores;
    } catch (e) {
        console.error(e);
    }
}

chrome.runtime.onConnect.addListener(port => {
    console.assert(port.name == 'contentscript-background-port');
    port.onMessage.addListener(async request => {
        let scores = [];
        switch (request.action) {
            case 'login':
                await timesAction(2, doLogin);
                port.postMessage({ action: request.action, result: 'ok' });
                break;
            case 'completion':
                await timesAction(1, doCompletion);
                scores = await getScore();
                port.postMessage({ action: request.action, result: 'ok', scores: scores });
                break;
            case 'learning':
                await timesAction(3, doLearning);
                scores = await getScore();
                port.postMessage({ action: request.action, result: 'ok', scores: scores });
                break;
            case 'exercise':
                await timesAction(3, doExercise);
                scores = await getScore();
                port.postMessage({ action: request.action, result: 'ok', scores: scores });
                break;
            case 'score':
                scores = await getScore();
                port.postMessage({ action: request.action, result: 'ok', scores: scores });
                break;
        }
        return true;
    });
  });

// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     console.info('contentscript', request, sender);
//     let scores = [];
//     switch (request.action) {
//         case 'login':
//             timesAction(2, doLogin);
//             scores = await getScore();
//             sendResponse({ action: request.action, result: 'ok', scores: scores });
//             break;
//         case 'completion':
//             timesAction(1, doCompletion);
//             scores = await getScore();
//             sendResponse({ action: request.action, result: 'ok', scores: scores });
//             break;
//         case 'learning':
//             timesAction(3, doLearning);
//             scores = await getScore();
//             sendResponse({ action: request.action, result: 'ok', scores: scores });
//             break;
//         case 'exercise':
//             // timesAction(3, doExercise);
//             //scores = await getScore();
//             // sendResponse({ action: request.action, result: 'ok', scores: scores });
//             setTimeout(() => {
//                 sendResponse({ action: request.action, result: 'ok' });
//             }, 0);
//             // sendResponse({ action: request.action, result: 'ok' });
//             break;
//     }
//     return true;
// });