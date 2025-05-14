document.addEventListener('DOMContentLoaded', function() {
  const statusDiv = document.getElementById('status');
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