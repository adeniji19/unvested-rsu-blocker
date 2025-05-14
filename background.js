chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateBalance') {
        console.log('Message received in background script:', request);
        sendResponse({status: true});
    }
});