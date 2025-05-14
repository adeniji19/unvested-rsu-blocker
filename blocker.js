// // Create a communication port with the background script
// const port = chrome.runtime.connect({name: "balanceModifier"});

// // Listen for messages from the popup via the background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // Try the specified selector
//   let amznRSUElemWhole = document.querySelectorAll(['div.acct-selector__acct-balance']);
  
//   let unvestedVal = 0;
//   if (amznRSUElemWhole.length === 0) {
//     console.log("nothing found amznRSUElems");
//   } else {
//       const amznRSUElems = amznRSUElemWhole[6].querySelectorAll('span');
//       let rsuVal = amznRSUElems[1].textContent;
//       console.log("attempting amznRSUElem update: " + 6 + " : " + rsuVal.substring(2));
//       unvestedVal = parseFloat(rsuVal.substring(2).replace(/,/g, ''));
//       console.log("unv " + unvestedVal + " " + isNaN(unvestedVal));
//       if(!isNaN(unvestedVal)) {
//           rsuVal = '$0.00';
//       }
//   }

//   let totalElem = document.querySelector('span.acct-selector__all-accounts-balance');
  
//   if (totalElem.length === 0) {
//     console.log("nothing found totalElem");
//   } else {
//       console.log("attempting totalElem update: " + totalElem.textContent);
//       const amznRSUElems = amznRSUElemWhole[6].querySelectorAll('span');
//       let rsuVal = amznRSUElems[1].textContent;
//       console.log("curr rsuval " + rsuVal);
//       if (rsuVal != '$0.00') {
//           let oldVal = parseFloat(totalElem.textContent.substring(2).replace(/,/g, ''));
//           console.log("old port val " + oldVal);
//           totalElem.textContent = '$' + (oldVal - unvestedVal);
//       }
//   }
// });

