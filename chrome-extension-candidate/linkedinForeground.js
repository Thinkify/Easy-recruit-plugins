let instance = null;
class Candidate {
	constructor(name='',linkedInProfile='',data=null) {
  
	  if(!instance){
		instance = this;
	  }

	  this.name = name;
	  this.linkedInProfile = linkedInProfile;
	  this.data = data;
  
	  return instance;
	}
  
	getDetais() {
	  return {
		name:this.name,
		linkedInProfile:this.linkedInProfile,
		data: this.data,
	  }
	}

	setDetails({name,linkedInProfile,data}){
		if(name)this.name = this.name;
		if(linkedInProfile)this.linkedInProfile = linkedInProfile;
		if(data)this.data=data;
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

const routeToJoin = '/apply'


function showTestResults(e = null) {
  if (e) {
    e.stopPropagation();
  }
  var iframe = document.createElement("iframe");
  let { linkedInProfile,name } = getDetailsOfCandidate();
  document.getElementById("iframe-wrapper").appendChild(iframe);
  console.log('candidate:',candidateInfo.getDetais())
  let {data} = candidateInfo.getDetais();
  debugger;
  if(data?.linkedInProfile && data?.testResult){
	iframe.src = `http://localhost:3000/?linkedInProfile=${data?.linkedInProfile}`;
  } else if(data?.linkedInProfile){
	iframe.src = `http://localhost:3000/take-test`;
  } else {
	iframe.src = `http://localhost:3000/apply/?linkedInProfile=${linkedInProfile}&name=${name}`;
  }
}

const getDetailsOfCandidate = () => {

  const contentExtracted = JSON.parse(
    $('code:contains("publicIdentifier")')[0].textContent
  );

  const linkedInProfile = contentExtracted?.included[0]?.publicIdentifier;
  const firstName = contentExtracted?.included[0]?.firstName || "";
  const lastName = contentExtracted?.included[0]?.lastName || "";
  const name = firstName + " " + lastName;

  candidateInfo.setDetails((linkedInProfile,name));

  return {
    linkedInProfile,
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

const getContentJson = async (linkedInProfile) => {
  const data = await getDetailsByLinkedInId(linkedInProfile);
  return data;
};

const getButtonName = (candidate) => {
   
	let type = 1;

	if(candidate?.email && candidate?.testResult){
		type = 3;
	} else if(candidate?.email){
		type = 2;
	}

	const buttonName = {
		1:'Add details',
		2:'Vet yourself',
		3:'Next Step'
	}
	const addDetailsButton = `<div class="add-details" id="demo-modal"><button>${buttonName[type]}</button></div>`;
	return addDetailsButton;
}

$(document).ready(function () {
  console.log("ready!");

  const { linkedInProfile } = getDetailsOfCandidate();

  var checkExist = setInterval(function () {
    if ($(".jobs-apply-button--top-card").length) {
      console.log("Exists!");
      const model = $(".jobs-save-button ").parent();

      function appendButton(model, buttonView) {
        (newdiv2 = document.createElement("div")),
          (existingdiv1 = document.getElementById("foo"));
        model.append(buttonView, [newdiv2, existingdiv1]);
      }

      getContentJson(linkedInProfile).then((candidate) => {
        console.log("candidate:", candidate);
		candidateInfo.setDetails({data:candidate});
		const buttonToShow = getButtonName(candidate);
        appendButton(model, buttonToShow + mainPopup);
        setTimeout(() => {
          $("#demo-modal").click(showMainPopupFirst);
        }, 0);

      });

      clearInterval(checkExist);
    }
  }, 100);
});
