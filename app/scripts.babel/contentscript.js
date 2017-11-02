console.info('contentscript run here!');

const doLogin = () => {
    return $.ajax({
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

const doCompletion = () => {
    return $.ajax({
        type: 'GET',
        url: 'http://xf.faxuan.net/pss/service/postPoint' + '?operateType=ipoint&userAccount=' + JSON.parse(Cookies.get('loginUser')).userAccount + '&domainCode=' + JSON.parse(Cookies.get('loginUser')).domainCode + '&timestamp=' + new Date()
    });
};

const doLearning = () => {
    return $.ajax({
        type: 'GET',
        url: 'http://xf.faxuan.net/pss/service/postPoint' + '?operateType=spoint&userAccount=' + JSON.parse(Cookies.get('loginUser')).userAccount + '&domainCode=' + JSON.parse(Cookies.get('loginUser')).domainCode + '&timestamp=' + new Date() + '&stime=' + 15
    });
};


const doExercise = () => {
    // To do
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

const getScore = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'http://xf.faxuan.net/pss/service/getpoint?type=mypoint&timestamp=' + Date.parse(new Date()),
            data: {
                userAccount: JSON.parse(Cookies.get('loginUser')).userAccount,
                key: Math.floor(Math.random() * 50)
            }
        }).then(rawScore => {
            const scores = nrMultiLineText2Array(rawScore);
            // scores like ['1030', '0', '60', '10', '40', '1', '111', '0', '1120', '225', '760', '18', '2123']
            console.info(scores);
            resolve(scores);
        }).catch(e => {
            reject(e);
        })
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.info('contentscript', request, sender);
    let scores = [];
    switch (request.action) {
        case 'login':
            Promise.all([doLogin(), doLogin()])
                .then(unusedData => {
                    return getScore();
                })
                .then(scores => {
                    console.info(scores);
                    sendResponse({ action: request.action, result: 'ok', scores: scores });
                })
                .catch(e => {
                    console.error(e);
                    sendResponse({ action: request.action, result: 'error', message: e });
                });
            break;
        case 'completion':
            Promise.all([doCompletion()])
                .then(unusedData => {
                    return getScore();
                })
                .then(scores => {
                    console.info(scores);
                    sendResponse({ action: request.action, result: 'ok', scores: scores });
                })
                .catch(e => {
                    console.error(e);
                    sendResponse({ action: request.action, result: 'error', message: e });
                });
            break;
        case 'learning':
            Promise.all([doLearning(), doLearning(), doLearning()])
                .then(unusedData => {
                    return getScore();
                })
                .then(scores => {
                    console.info(scores);
                    sendResponse({ action: request.action, result: 'ok', scores: scores });
                })
                .catch(e => {
                    console.error(e);
                    sendResponse({ action: request.action, result: 'error', message: e });
                });
            break;
        case 'exercise':
            Promise.all([doExercise(), doExercise(), doExercise()])
                .then(unusedData => {
                    return getScore();
                })
                .then(scores => {
                    console.info(scores);
                    sendResponse({ action: request.action, result: 'ok', scores: scores });
                })
                .catch(e => {
                    console.error(e);
                    sendResponse({ action: request.action, result: 'error', message: e });
                });
            break;
        case 'score':
            getScore().then(scores => {
                console.info(scores);
                sendResponse({ action: request.action, result: 'ok', scores: scores });
            }).catch(e => {
                console.error(e);
                sendResponse({ action: request.action, result: 'error', message: e });
            });
            break;
    }
    return true;
});