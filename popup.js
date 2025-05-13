document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('updateButton');
    const statusDiv = document.getElementById('status');
    
    // Try to retrieve the stored balance (if any)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'getBalance'}, function(response) {
        if (response && response.currentBalance) {
          document.getElementById('newBalance').value = response.currentBalance;
        }
      });
    });
    
    updateButton.addEventListener('click', function() {
      const newBalance = document.getElementById('newBalance').value;
      
      if (!newBalance) {
        statusDiv.textContent = 'Please enter a new balance';
        return;
      }
      
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {action: 'updateBalance', balance: newBalance},
          function(response) {
            if (response && response.status) {
              statusDiv.textContent = 'Balance update initiated! Refresh if needed.';
            } else {
              statusDiv.textContent = 'Error: Could not update balance. Make sure you are on the Fidelity page.';
            }
          }
        );
      });
    });
  });
  