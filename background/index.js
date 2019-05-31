chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'openOptions') {
        chrome.runtime.openOptionsPage();
    }
});