let instance = null;
class Candidate {
  constructor(name = "", linkedInProfile = "", data = null) {
    if (!instance) {
      instance = this;
    }

    this.name = name;
    this.linkedInProfile = linkedInProfile;
    this.data = data;

    return instance;
  }

  getDetais() {
    return {
      name: this.name,
      linkedInProfile: this.linkedInProfile,
      data: this.data,
    };
  }

  setDetails({ name, linkedInProfile, data }) {
    if (name) this.name = this.name;
    if (linkedInProfile) this.linkedInProfile = linkedInProfile;
    if (data) this.data = data;
  }
}

let candidateInfo = new Candidate();

const vetButton = `<a href="https://triplebyte.com/wt/thinkify/start/1Pq2hNl8qni/71104" target="_blank"><div class="vet-button">Vet Yourself</div></a>`;

const mainPopup = `<div id="demo-modal-popup" class="modal">
	<div class="modal__content">
		<div id='iframe-wrapper'>
		</div>
		<a href="#" class="modal__close">&times;</a>
	</div>
</div>`;

const routeToJoin = "/apply";

function showTestResults(candidateInfo) {

  var iframe = document.createElement("iframe");
  document.getElementById("iframe-wrapper").appendChild(iframe);
  iframe.src = `https://sleepy-meadow-81233.herokuapp.com/`;
  $("#demo-modal-popup").addClass("modal__target");
  $("#demo-modal-popup").click(hideMainPopupFirst);
}

const getDetailsOfCandidate = () => {
  const contentExtracted = JSON.parse(
    $('code:contains("publicIdentifier")')[0].textContent
  );

  const linkedInProfile = contentExtracted?.included[0]?.publicIdentifier;
  const firstName = contentExtracted?.included[0]?.firstName || "";
  const lastName = contentExtracted?.included[0]?.lastName || "";
  const name = firstName + " " + lastName;

  candidateInfo.setDetails((linkedInProfile, name));

  return {
    linkedInProfile,
    name,
  };
};

const getCandiateLinkedInProfile = (thinkifybutton) => {
	console.log('thinkifybutton:',thinkifybutton);
	return 'dipanshutyagi860@gmail.com';
}

function showMainPopupFirst(event) {
	// find the element which clicked we have this and event
	const isThinkifyEvent = $(event.target).closest('.thinkify-info')
	if(isThinkifyEvent.length){
		event.stopPropagation();
		console.log('this:',this);
		console.log('event:',event);
		const candidateLinkedIn = getCandiateLinkedInProfile(isThinkifyEvent);
	
		// create a model append it and show iframe on it with the candiate info 
		showTestResults(candidateLinkedIn);


	}
}

function hideMainPopupFirst() {
  $("#demo-modal-popup").removeClass("modal__target");
  $("#iframe-wrapper").html("");
}

const getContentJson = async (linkedInProfile) => {
  const data = await getDetailsByLinkedInId(linkedInProfile);
  return data;
};

const getButtonName = (candidate) => {
  let type = 1;

  if (candidate?.email && candidate?.testResult) {
    type = 3;
  } else if (candidate?.email) {
    type = 2;
  }

  const buttonName = {
    1: "Check Info",
    2: "Vet yourself",
    3: "Next Step",
  };
  const addDetailsButton = `<button class="thinkify-info artdeco-button artdeco-button--2 artdeco-button--secondary ember-view">
		<span class="artdeco-button__text">
			${buttonName[type]}
		</span>
  </button>`;
  return addDetailsButton;
};

function addButtonIfCorrectPage() {

	// get all buttons with message or connect written
	// on click show the pop by making the api call with that current api call of the user and display info
	
	let allButtonsToClick = document.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary ember-view');
	allButtonsToClick = Array(...allButtonsToClick).filter( it => it?.innerHTML?.includes('Message')|| it?.innerHTML?.includes('Connect')|| it?.innerHTML?.includes('Follow') );
	console.log('allButtonsToClick:',allButtonsToClick);
	allButtonsToClick.forEach(buttons => {
		// add Thinkify button for all 
		const model = $(buttons).closest('.entity-result__actions.entity-result__divider');

		function appendButton(model, buttonView) {
			(newdiv2 = document.createElement("div")),
			  (existingdiv1 = document.getElementById("foo"));
			model.append(buttonView, [newdiv2, existingdiv1]);
		}

		const buttonToShow = getButtonName('');
        appendButton(model, buttonToShow);
	});

	setTimeout(() => {

		function appendModal(buttonView) {
			(newdiv2 = document.createElement("div")),
			  (existingdiv1 = document.getElementById("foo"));
			$('body').append(buttonView, [newdiv2, existingdiv1]);
		}

		appendModal(mainPopup)
		
		$(window).click(showMainPopupFirst);
	  }, 0);

}

$(document).ready(function () {
  console.log("ready!");

  window.addEventListener("locationchange", function () {
    console.log("location changed!");
  });

  setTimeout(() => {
	addButtonIfCorrectPage();
}, 2000);
});
