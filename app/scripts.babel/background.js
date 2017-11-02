'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

console.log('\'Allo \'Allo! Event Page for Page Action');

// https://stackoverflow.com/questions/11811554/chrome-extension-port-error-could-not-establish-connection-receiving-end-does
// https://developer.chrome.com/extensions/messaging
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   //console.info(request, sender);
//   // https://stackoverflow.com/questions/14245334/chrome-extension-sendmessage-from-background-to-content-script-doesnt-work
//   chrome.tabs.query({ active: true, url: 'http://*.faxuan.net/*' }, function (tabs) {
//     // https://developer.chrome.com/extensions/messaging
//     // one-time requests
//     chrome.tabs.sendMessage(tabs[0].id, request, response => {
//       if (chrome.runtime.lastError) {
//         console.log('ERROR: ', chrome.runtime.lastError);
//       } else {
//         console.log('The Content Script got the following Message: ' + JSON.stringify(response));
//         sendResponse(response);
//       }
//     });
//   });
//   return true;
// });