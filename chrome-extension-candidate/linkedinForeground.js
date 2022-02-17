// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

const addDetailsButton = `<div class="add-details">
        <button>Add Details</button>
</div>`;

const vetButton = `
		<a href="https://triplebyte.com/wt/thinkify/start/1Pq2hNl8qni/71104">
			<div class="vet-button">Vet Yourself</div>
		</a>`;

function addClicked(event){
    event.stopPropagation();
    console.log('addClicked is clicked!!');
    // const width = 440;
    // const height = 220;
    // const left = (screen.width/2)-(width/2);
    // const top = (screen.height/2)-(height/2); 

    chrome.runtime.sendMessage({
        action: 'createWindowPopup',
        // payload:{width,height,left,top}
      },
      function(createdWindow) {
        console.log(createdWindow);
      });
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
            getContentJson(linkedINProfile).then((candidate) => {
                console.log("candidate:", candidate);
                let buttonView = addDetailsButton;
                if(candidate && candidate.linkedInProfile){
                  buttonView = vetButton;
                } 
                newdiv2 = document.createElement("div"),
                existingdiv1 = document.getElementById("foo");
                model.append( buttonView, [ newdiv2, existingdiv1 ] );
                
                $('.add-details').click(addClicked);
              });

           clearInterval(checkExist);
        }
     }, 100);

    // $('.jobs-apply-button--top-card').append(addDetailsButton);

});

