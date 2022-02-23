// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

const addDetailsButton = `<div class="add-details">
        <button>Add Details</button>
</div>`;

const StatusButton = `<div class="add-details">
        <button>Know Your Status </button>
</div>`;

const vetButton = `
		<a href="https://triplebyte.com/wt/thinkify/start/1Pq2hNl8qni/71104" target="_blank">
			<div class="vet-button">Vet Yourself</div>
		</a>`;

function createAfterVetPopup(testResult){
  const MockInterview = `<div class='mentor-button'>Get MockInterview</div>`;
  const LearnMore = `<div class='mentor-button'>Learn more</div>`;
  const overallScore = testResult['Overall score'];
  const javaScriptKnowledge = testResult['JavaScript Knowledge'];
  const reactKnowledge = testResult['React Knowledge'];


  const popup = `
        <div id='after-vet-popup-container' class="after-vet-popup-container hidden">
            <div class="popup-close">X</div>
        </div>
  `;
  return popup;
}

function createBeforePopup() {
  const popup = `
  <div id='after-vet-popup-container' class="after-vet-popup-container hidden">
      <div class="popup-close">X</div>
  </div>
`;
return popup;
}

function  createPopup() {
  return popup;
}

function getFrameHtml(htmlFileName) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", chrome.extension.getURL(htmlFileName), false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function showTestResults(e){
  debugger;
  e.stopPropagation();
  $('#after-vet-popup-container').removeClass('hidden');
  var iframe = document.createElement('iframe');
  const linkedINProfile = getDetailsOfCandidate();
	document.getElementById("after-vet-popup-container").appendChild(iframe);
	iframe.src = `http://localhost:3000/?linkedInProfile=deepanshu-tyagi-209400227`;

};

function hideTestResults(e){
  e.stopPropagation();
  console.log('hide data...')
  $('#after-vet-popup-container').addClass('hidden');
};

function addClicked(event){
    event.stopPropagation();
    console.log('addClicked is clicked!!');
    var iframe = document.createElement('iframe');
    $('#after-vet-popup-container').removeClass('hidden');
    const linkedINProfile = getDetailsOfCandidate();
	  document.getElementById("after-vet-popup-container").appendChild(iframe);
	  iframe.src = `http://localhost:3000/apply`;
    $('.popup-close').click(hideTestResults);
    
}

const getDetailsOfCandidate = () => {
  const contentExtracted = JSON.parse($('code:contains("publicIdentifier")')[0].textContent);
  const linkedINProfile = contentExtracted.included[0].publicIdentifier;
  return linkedINProfile || '';
}

const getContentJson = async (linkedINProfile) => {
    const data = await getDetailsByLinkedInId(linkedINProfile);
    return data;
  };

$( document ).ready(function() {
    console.log( "ready!" );
    const linkedINProfile = getDetailsOfCandidate();

    // check if the data is already present 
    var checkExist = setInterval(function() {
        if ($('.jobs-apply-button--top-card').length) {
           console.log("Exists!");
            const model = $('.jobs-save-button ').parent();

            function appendButton(model,buttonView) {
                  newdiv2 = document.createElement("div"),
                  existingdiv1 = document.getElementById("foo");
                  model.append( buttonView, [ newdiv2, existingdiv1 ] );
            }

            getContentJson(linkedINProfile).then((candidate) => {
                console.log("candidate:", candidate);
                let buttonView = addDetailsButton;
                let attachedPopup = '';
                
                if(candidate && candidate.testResult){
                  appendButton(model, StatusButton);
                  const attachedPopup = createBeforePopup()
                  $('.add-details').append(attachedPopup);
                  $('.add-details').click(showTestResults);
                }else if(candidate && candidate.linkedInProfile){
                  appendButton(model, vetButton);
                } else{
                  appendButton(model, addDetailsButton);
                  const attachedPopup = createBeforePopup()
                  $('.add-details').append(attachedPopup);
                  $('.add-details').click(addClicked);
                }

                
                // if(candidate && candidate.testResult){
                //   $('.add-details').click(showTestResults);
                //   $('.add-details').append(attachedPopup);
                //   $('.popup-close').click(hideTestResults);
                // }else if(candidate && candidate.linkedInProfile){
                //   debugger;
                //   $('.add-details').click(addClicked);
                // } else{
                //   const attachedPopup = createPopup()
                //   $('.add-details').append(attachedPopup);
                //   $('.add-details').click(addClicked);
                // }
               
              });

           clearInterval(checkExist);
        }
     }, 100);

    // $('.jobs-apply-button--top-card').append(addDetailsButton);

});

