const delayedExtraction = async() => {
  // write code
  let resp =  await new Promise((resolve, reject) => {

    var checkExist = setInterval(async function() {
        if ($(
            ".ember-view.display-flex.justify-flex-start.artdeco-button.artdeco-button--1.artdeco-button--muted.artdeco-button--tertiary.pv3"
          ).length) {
              const lnData = $(
                ".ember-view.display-flex.justify-flex-start.artdeco-button.artdeco-button--1.artdeco-button--muted.artdeco-button--tertiary.pv3"
              );
              clearInterval(checkExist);
            const linkedINProfile = lnData[0].href.split("/");
            console.log("linkedINProfile:", linkedINProfile);
            const data = await getDetailsByLinkedInId(linkedINProfile[5]);
            resolve(data);
        }
     }, 100);
  });

  return resp;
};

const getContentJson = async () => {
  $(
    ".artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.artdeco-button.artdeco-button--secondary.artdeco-button--muted.artdeco-button--3"
  ).click();
  console.log("clicked.....");
  const data = await delayedExtraction(2);
  return data;
};

const putInScreen = async () => {
  setTimeout(() => {
    const isJobBoard = window.location.href.includes(
      "https://www.linkedin.com/hiring/jobs"
    );
    console.log("isJobBoard!", isJobBoard);
    if (isJobBoard) {
      console.log("inside!");
      getContentJson().then((candidate) => {
        console.log("candidate:", candidate);
        
        const $newdiv1 = $(`<div id='layer'> 
            <div>Current CTC: ${candidate.currentSalary}</div>
            <div>Expected CTC: ${candidate.expectedSalary}</div>
            <div>Notice period :${candidate.noticePeriod}</div>
            <div>Updated on :${candidate.date}</div>
            </div>`),
          newdiv2 = document.createElement("div"),
          existingdiv1 = document.getElementById("foo");
        $(".hiring-applicants__content").append($newdiv1, [
          newdiv2,
          existingdiv1,
        ]);
      });
    }
  }, 1000);
};

$(document).ready(function () {
  console.log(" on ready!");
  putInScreen();

  (function () {
    let lastUrl = location.href; 
    new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});
 
 
function onUrlChange() {
  alert('URL changed!', location.href);
  putInScreen();
}
  })();
});
