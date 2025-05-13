chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "balanceModifier") {
      port.onMessage.addListener(function(msg) {
        if (msg.action === "getBalance") {
          chrome.storage.local.get(['customBalance'], function(result) {
            port.postMessage({type: "balanceData", balance: result.customBalance});
          });
        }
      });
    }
  });
  
  // Handle tab navigation events
  chrome.webNavigation.onCompleted.addListener(function(details) {
    // When a page load completes on a Fidelity domain
    if (details.url.includes('fidelity.com')) {
      // Short delay to ensure DOM is ready
      setTimeout(() => {
        // Check if content script is loaded, if not, inject it
        chrome.tabs.sendMessage(details.tabId, {action: 'checkScriptLoaded'}, function(response) {
          if (!response) {
            chrome.scripting.executeScript({
              target: {tabId: details.tabId},
              files: ['content.js']
            });
          }
          
          // After ensuring content script is loaded, check if we have a stored balance to apply
          chrome.storage.local.get(['customBalance'], function(result) {
            if (result.customBalance) {
              chrome.tabs.sendMessage(details.tabId, {
                action: 'updateBalance', 
                balance: result.customBalance
              });
            }
          });
        });
      }, 1500);
    }
  }, {url: [{hostContains: 'fidelity.com'}]});
  
  // Listen for extension installation or update
  chrome.runtime.onInstalled.addListener(function() {
    console.log("Account Balance Modifier installed or updated");
    // You could initialize storage here if needed
  });