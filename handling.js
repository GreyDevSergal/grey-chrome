// Greyscale Chrome Extension Handling Code
// Will Hodge
// Handles the listening and callback for the extension

var activated = false;

function activate() {
  activated = true;
  console.log('Greyscale activated');
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.executeScript(tab.id, {
        file: "apply.js",
        allFrames: true
      });
    });
  });

  addGreyListener();
}

function addGreyListener() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete'){
      chrome.tabs.executeScript(tabId, {
        file: "apply.js",
        allFrames: true
      });
    }
  });
}

function deactivate() {
  activated = false;
  console.log('Greyscale deactivated');
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.executeScript(tab.id, {
        file: "revert.js",
        allFrames: true
      });
    });
  });

  chrome.tabs.onUpdated.removeListener(addGreyListener);
}


chrome.browserAction.onClicked.addListener(function() {
  if(!activated){
    activate();
  }
  else {
    deactivate();
  }
});
