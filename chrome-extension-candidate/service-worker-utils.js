// This file can be imported inside the service worker,
// which means all of its functions and variables will be accessible
// inside the service worker.
// The importation is done in the file `service-worker.js`.

console.log("External file is also loaded!");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("External file is also loaded!");

  if (request && request.action === "createWindowPopup") {

    console.log("createWindowPopup!!!");

    const {payload} = request;
    chrome.windows.create(
      {
        url: "popup/popup.html",
        type: "popup",
        // alwaysOnTop:true,
        focused: true,
        height: 700,
        width:700,
        top: 0,
        left: 100,
        // ...payload,
      },
      function (win) {
        sendResponse(win);
      }
    );
  }
});
