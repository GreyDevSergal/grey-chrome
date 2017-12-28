// Greyscale Chrome Extension Handling Code
// Will Hodge
// Handles the listening and callback for the extension

var activated = false;

function activate() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.executeScript(tab.id, {
        file: "apply.js",
        allFrames: true
      }, result => {
        const lastErr = chrome.runtime.lastError;
        if (lastErr) console.log('Cannot change tabs with URLs of chrome:// to greyscale.');
      });
    });
  });

  chrome.tabs.onUpdated.addListener(newTab);
  activated = true;
  chrome.browserAction.setIcon({
    path : "icons/grey48.png"
  });
  console.log('Greyscale activated');
}

function newTab(tabId, changeInfo, tab) {
  chrome.tabs.executeScript(tabId, {
    file: "apply.js",
    allFrames: true
  }, result => {
    const lastErr = chrome.runtime.lastError;
    if (lastErr) console.log('Cannot change tabs with URLs of chrome:// to greyscale.');
  });
}

function deactivate() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.executeScript(tab.id, {
        file: "revert.js",
        allFrames: true
      }, result => {
        const lastErr = chrome.runtime.lastError;
        if (lastErr) console.log('Cannot change tabs with URLs of chrome:// to greyscale.');
      });
    });
  });

  chrome.tabs.onUpdated.removeListener(newTab);
  activated = false;
  chrome.browserAction.setIcon({
    path : "icons/icon48.png"
  });
  console.log('Greyscale deactivated');
}

chrome.browserAction.onClicked.addListener(function() {
  if(!activated){
    activate();
  }
  else {
    deactivate();
  }
});
