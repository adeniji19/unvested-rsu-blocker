chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "balanceModifier") {
      port.onMessage.addListener(function(msg) {
      });
    }
  });