console.info('contentscript run here!');

console.info(`bind radio/checkbox click event handler...`);
$('ul#ti_item>li').off();
$('div.timucontent').on('click', $('ul#ti_item>li'), (e)=>{$('input', e.target).prop("checked", !$('input', e.target).prop("checked"));});
console.info(`bind radio/checkbox click event handler success!`);
console.info(`bind keypressed`)
$(document).off( "keypress" )
$(document).keypress(e => {
    const key = e.key;
    console.info(`keypressed ${key}`)
    // select A
    if(key === '1') {
        $('ul#ti_item>li:eq(0)>input').prop("checked", !$('ul#ti_item>li:eq(0)>input').prop("checked"));
    }
    // select B
    else if(key === '2') {
        $('ul#ti_item>li:eq(1)>input').prop("checked", !$('ul#ti_item>li:eq(1)>input').prop("checked"));
    }
    // select C
    else if(key === '3') {
        $('ul#ti_item>li:eq(2)>input').prop("checked", !$('ul#ti_item>li:eq(2)>input').prop("checked"));
    }
    // select D
    else if(key === '4') {
        $('ul#ti_item>li:eq(3)>input').prop("checked", !$('ul#ti_item>li:eq(3)>input').prop("checked"));
    }
    // select ABCD
    else if(key === '5') {
        $('ul#ti_item>li:eq(0)>input').prop("checked", !$('ul#ti_item>li:eq(0)>input').prop("checked"));
        $('ul#ti_item>li:eq(1)>input').prop("checked", !$('ul#ti_item>li:eq(1)>input').prop("checked"));
        $('ul#ti_item>li:eq(2)>input').prop("checked", !$('ul#ti_item>li:eq(2)>input').prop("checked"));
        $('ul#ti_item>li:eq(3)>input').prop("checked", !$('ul#ti_item>li:eq(3)>input').prop("checked"));
    }
    // select ABC
    else if(key === '6') {
        $('ul#ti_item>li:eq(0)>input').prop("checked", !$('ul#ti_item>li:eq(0)>input').prop("checked"));
        $('ul#ti_item>li:eq(1)>input').prop("checked", !$('ul#ti_item>li:eq(1)>input').prop("checked"));
        $('ul#ti_item>li:eq(2)>input').prop("checked", !$('ul#ti_item>li:eq(2)>input').prop("checked"));
    }
    // press enter to go to next
    else if(key === "Enter") {
        // sps.next()
        // $('a:contains("下一题")').click()
        $('a:contains("下一题")').get(0).click()
    }
});
console.info(`bind keypressed success!`)

const doLogin = () => {
    return $.ajax({
        type: 'POST',
        cache: false,
        url: 'http://www.faxuan.net/pss/xfservice/postPoint',
        data: {
            operateType: 'lpoint',
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

//  sps.postPointStudy("spoint", c);
// GET "/pss/service/postPoint?operateType=spoint&userAccount=5300005862517&domainCode=100008017584000&ssid=9b231999730d47f0ad63e0d7fa676f9a&timestamp=Wed Sep 11 2019 15:46:46 GMT+0800 (China Standard Time)&stime=16"
const doLearning = () => {
    return $.ajax({
        type: 'GET',
        url: 'http://xf.faxuan.net/pss/service/postPoint' + '?operateType=spoint&userAccount=' + JSON.parse(Cookies.get('loginUser')).userAccount + '&domainCode=' + JSON.parse(Cookies.get('loginUser')).domainCode + '&ssid=' + JSON.parse(Cookies.get('loginUser')).sid + '&timestamp=' + new Date() + '&stime=' + 15
    });
};

// sps.commitStudy(c, d)
// POST "http://xf.faxuan.net/sss/service/coursewareService!commitStudy.do"
/*
domainCode: 100008017584000
userAccount: 5300005862517
stime: 16
ssid: 9b231999730d47f0ad63e0d7fa676f9a
type: 1
timestamp: Wed Sep 11 2019 15:52:03 GMT+0800 (China Standard Time)
*/
const doLearningCommit = () => {
    return $.ajax({
        type: 'POST',
        cache: false,
        url: 'http://xf.faxuan.net/sss/service/coursewareService!commitStudy.do',
        data: {
            domainCode: JSON.parse(Cookies.get('loginUser')).domainCode,
            userAccount: JSON.parse(Cookies.get('loginUser')).userAccount,
            stime: 15,
            ssid: JSON.parse(Cookies.get('loginUser')).sid,
            type: 1,
            validate: 'timer',
            timestamp: new Date()
        }
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
            a.push('');
        } else {
            if (b[c].indexOf('$') == 0) {
                a.push(b[c + 1]);
            }
        }
    }
    return a;
};

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
        });
    });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.info('contentscript', request, sender);
    switch (request.action) {
        case 'login':
            Promise.all([doLogin(), doLogin()]).then(unusedData => {
                return getScore();
            }).then(scores => {
                console.info(scores);
                sendResponse({ action: request.action, result: 'ok', scores: scores });
            }).catch(e => {
                console.error(e);
                sendResponse({ action: request.action, result: 'error', message: e });
            });
            break;
        case 'completion':
            Promise.all([doCompletion()]).then(unusedData => {
                return getScore();
            }).then(scores => {
                console.info(scores);
                sendResponse({ action: request.action, result: 'ok', scores: scores });
            }).catch(e => {
                console.error(e);
                sendResponse({ action: request.action, result: 'error', message: e });
            });
            break;
        case 'learning':
            // https://stackoverflow.com/questions/30823653/is-node-js-native-promise-all-processing-in-parallel-or-sequentially
            // Promise.all([doLearning(), doLearningCommit(), doLearning(), doLearningCommit()]).then(unusedData => {
            doLearning().then(doLearningCommit).then(doLearning).then(doLearningCommit).then(unusedData => {  
                return getScore();
            }).then(scores => {
                console.info(scores);
                sendResponse({ action: request.action, result: 'ok', scores: scores });
            }).catch(e => {
                console.error(e);
                sendResponse({ action: request.action, result: 'error', message: e });
            });
            break;
        case 'exercise':
            Promise.all([doExercise(), doExercise(), doExercise()]).then(unusedData => {
                return getScore();
            }).then(scores => {
                console.info(scores);
                sendResponse({ action: request.action, result: 'ok', scores: scores });
            }).catch(e => {
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