let instance = null;
class Candidate {
	constructor(name='',linkedINProfile='',data=null) {
  
	  if(!instance){
		instance = this;
	  }

	  this.name = name;
	  this.linkedINProfile = linkedINProfile;
	  this.data = data;
  
	  return instance;
	}
  
	getDetais() {
	  return {
		name:this.name,
		linkedINProfile:this.name,
		data: this.data,
	  }
	}

	setDetails({name,linkedINProfile,data}){
		if(name)this.name = this.name;
		if(linkedINProfile)this.linkedINProfile = linkedINProfile;
		if(data)this.data=data;
	}
}

let candidateInfo = new Candidate();

const addDetailsButton = `<div class="add-details" id="demo-modal"><button>Open Demo Modal</button></div>`;

const StatusButton = `<div class="add-details"><button>Know Your Status </button></div>`;

const vetButton = `<a href="https://triplebyte.com/wt/thinkify/start/1Pq2hNl8qni/71104" target="_blank"><div class="vet-button">Vet Yourself</div></a>`;

const mainPopup = `<div id="demo-modal-popup" class="modal">
	<div class="modal__content">
		<div id='iframe-wrapper'>
		</div>
		<a href="#" class="modal__close">&times;</a>
	</div>
</div>`;

const routeToJoin = '/apply'


function showTestResults(e = null) {
  if (e) {
    e.stopPropagation();
  }
  var iframe = document.createElement("iframe");
  let { linkedINProfile,name } = getDetailsOfCandidate();
  document.getElementById("iframe-wrapper").appendChild(iframe);
  console.log('candidate:',candidateInfo.getDetais())
  let {data} = candidateInfo.getDetais();
  debugger;
  if(data?.linkedInProfile && data?.testResult){
	iframe.src = `http://localhost:3000/?linkedINProfile=${data?.linkedInProfile}`;
  } else if(data?.linkedInProfile){
	iframe.src = `http://localhost:3000/take-test`;
  } else {
	iframe.src = `http://localhost:3000/apply/?linkedInProfile=${data?.linkedInProfile}&name=${name}`;
  }
}

function addClicked(event) {
  event.stopPropagation();
  console.log("addClicked is clicked!!");
  var iframe = document.createElement("iframe");
  $("#after-vet-popup-container").removeClass("hidden");
  const { linkedINProfile, name } = getDetailsOfCandidate();
  document.getElementById("after-vet-popup-container").appendChild(iframe);
  iframe.src = `http://localhost:3000/apply/?linkedInProfile=${linkedINProfile}&name=${name}`;
  iframe.src = `http://localhost:3000/?linkedINProfile=${linkedINProfile}`;
  $(".popup-close").click(hideTestResults);
}



const getDetailsOfCandidate = () => {

  const contentExtracted = JSON.parse(
    $('code:contains("publicIdentifier")')[0].textContent
  );

  const linkedINProfile = contentExtracted?.included[0]?.publicIdentifier;
  const firstName = contentExtracted?.included[0]?.firstName || "";
  const lastName = contentExtracted?.included[0]?.lastName || "";
  const name = firstName + " " + lastName;

  candidateInfo.setDetails((linkedINProfile,name));

  return {
    linkedINProfile,
    name,
  };
};

function showMainPopupFirst() {
  $("#demo-modal-popup").addClass("modal__target");
  $("#demo-modal-popup").click(hideMainPopupFirst);
  showTestResults();
  // showTestResults();
}

function hideMainPopupFirst() {
  $("#demo-modal-popup").removeClass("modal__target");
  $('#iframe-wrapper').html('');
};

const getContentJson = async (linkedINProfile) => {
  const data = await getDetailsByLinkedInId(linkedINProfile);
  return data;
};

$(document).ready(function () {
  console.log("ready!");

  const { linkedINProfile } = getDetailsOfCandidate();

  var checkExist = setInterval(function () {
    if ($(".jobs-apply-button--top-card").length) {
      console.log("Exists!");
      const model = $(".jobs-save-button ").parent();

      function appendButton(model, buttonView) {
        (newdiv2 = document.createElement("div")),
          (existingdiv1 = document.getElementById("foo"));
        model.append(buttonView, [newdiv2, existingdiv1]);
      }

      getContentJson(linkedINProfile).then((candidate) => {
        console.log("candidate:", candidate);
		candidateInfo.setDetails({data:candidate});
        appendButton(model, addDetailsButton + mainPopup);
        setTimeout(() => {
          $("#demo-modal").click(showMainPopupFirst);
        }, 0);

        // let buttonView = addDetailsButton;
        // let attachedPopup = "";
        // if (candidate && candidate.testResult) {
        //   appendButton(model, StatusButton);
        //   const attachedPopup = createBeforePopup();
        //   $(".add-details").append(attachedPopup);
        //   $(".add-details").click(showTestResults);
        // } else if (candidate && candidate.linkedInProfile) {
        //   appendButton(model, vetButton);
        // } else {
        //   appendButton(model, addDetailsButton);
        //   const attachedPopup = createBeforePopup();
        //   $(".add-details").append(attachedPopup);
        //   $(".add-details").click(addClicked);
        // }
      });

      clearInterval(checkExist);
    }
  }, 100);
});
