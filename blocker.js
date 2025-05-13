(function() {
    // Create a communication port with the background script
    const port = chrome.runtime.connect({name: "balanceModifier"});
    
    // Listen for messages from the popup via the background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'updateBalance') {
        // Store the new balance in chrome.storage instead of localStorage
        chrome.storage.local.set({customBalance: message.balance}, function() {
          // Apply the change using a different technique
          applyBalanceChange(message.balance);
          sendResponse({status: 'Balance update initiated'});
        });
        return true; // Required for async sendResponse
      } 
    //   else if (message.action === 'getBalance') {
    //     chrome.storage.local.get(['customBalance'], function(result) {
    //       sendResponse({currentBalance: result.customBalance || ''});
    //     });
    //     return true; // Required for async sendResponse
    //   } else if (message.action === 'checkScriptLoaded') {
    //     sendResponse({status: 'loaded'});
    //     return true;
    //   }
    });
    
    // Function to apply the balance change using DOM mutations
    function applyBalanceChange(newBalance) {
      console.log('Attempting to modify balance to:', newBalance);
      
      // Create a style element to help us identify the balance elements
      const style = document.createElement('style');
      style.textContent = `
        span[class*="acct-selector_all-accounts-balance"] {
          position: relative !important;
        }
      `;
      document.head.appendChild(style);
      
      // Function to find and modify balance elements
      function findAndModifyBalances() {
        // Try the specified selector
        let amznRSUElemWhole = document.querySelectorAll(['div.acct-selector__acct-balance']);
        
        let unvestedVal = 0;
        if (amznRSUElemWhole.length === 0) {
          console.log("nothing found amznRSUElems");
        } else {
            // for (let i = 0; i < amznRSUElems.length; i++) {
            //     const amznRSUElem = amznRSUElems[i];
            //     console.log("attempting amznRSUElem update: " + i + " - " + amznRSUElem.textContent);
            // }
            const amznRSUElems = amznRSUElemWhole[6].querySelectorAll('span');
            let rsuVal = amznRSUElems[1].textContent;
            console.log("attempting amznRSUElem update: " + 6 + " - " + rsuVal.substring(2));
            unvestedVal = parseFloat(rsuVal.substring(2).replace(/,/g, ''));
            console.log("unv " + unvestedVal + " " + isNaN(unvestedVal));
            if(!isNaN(unvestedVal)) {
                rsuVal = '$0.00';
            }
        }

        let totalElem = document.querySelector('span.acct-selector__all-accounts-balance');
        
        if (totalElem.length === 0) {
          console.log("nothing found totalElem");
        } else {
            console.log("attempting totalElem update: " + totalElem.textContent);
            const amznRSUElems = amznRSUElemWhole[6].querySelectorAll('span');
            let rsuVal = amznRSUElems[1].textContent;
            console.log("curr rsuval " + rsuVal);
            if (rsuVal != '$0.00') {
                let oldVal = parseFloat(totalElem.textContent.substring(2).replace(/,/g, ''));
                console.log("old port val " + oldVal);
                totalElem.textContent = '$' + (oldVal - unvestedVal);
            }
        }
      }
      
      // Initial run
      findAndModifyBalances();
      
      // Set up continuous monitoring
    //   setInterval(findAndModifyBalances, 1000);
      
      // Also observe DOM changes
      const observer = new MutationObserver(mutations => {
        findAndModifyBalances();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
      
    //   // Register for navigation events
    //   if (window.PerformanceNavigation) {
    //     window.addEventListener('pageshow', findAndModifyBalances);
    //     window.addEventListener('load', findAndModifyBalances);
    //   }
    }
  })();