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

const popupSidebar = `
<div id="thinkify_modal">
  <div id="body-overlay"></div>
  <nav class="real-menu" role="navigation">
  <div class="close_icon_container"><a href="#" class="modal__close" id="modal__close">&times;</a></div>
    <div id='iframe-wrapper'>
    </div>
  </nav>
</div>`;

const routeToJoin = "/apply";

const showTestResults = async () =>{
  const iframe = document.createElement("iframe");
  document.getElementById("iframe-wrapper").appendChild(iframe);

  const { linkedInProfile, name } = getDetailsOfCandidate();
  console.log("candidate:", candidateInfo.getDetais());

  const { data } = candidateInfo.getDetais();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const keywords = urlSearchParams.get('keywords');
  let companyName = keywords.replace('immediate','').trim();
  const potentialCompany = keywords.split(' ');
  if(potentialCompany?.length){
    const promiseList = potentialCompany.map(item => getCompanyDetailsByName(item))
    const resp = await Promise.all(promiseList)
    const comp = resp.find(item => item.companyName)
    if(comp){
      companyName = comp.companyName;
    }
  }
  // iframe.src = `${getConfig().DEVELOPMENT_URL}`;
  if (data?.linkedInProfile && data?.testResult) {
    iframe.src = `${getConfig().PRODUCTION_URL}/?linkedInProfile=${
      data?.linkedInProfile
    }&companyName=${companyName}`;
  } else if (data?.linkedInProfile) {
    iframe.src = `${getConfig().PRODUCTION_URL}/take-test`;
  } else {
    iframe.src = `${
      getConfig().PRODUCTION_URL
    }/apply/?linkedInProfile=${linkedInProfile}&name=${name}&companyName=${companyName}`;
  }
}

function closeSidebar() {
  const element = document.getElementById("thinkify_modal");
  element.classList.remove("menu-open");
  document.getElementsByTagName("body")[0].classList.remove("overflow_hidden");
  $("#iframe-wrapper").html("");
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

function openSidebar() {
  const element = document.getElementById("thinkify_modal");
  element.classList.add("menu-open");
  document.getElementsByTagName("body")[0].classList.add("overflow_hidden");
  showTestResults();
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
    1: "Add details",
    2: "Vet yourself",
    3: "Next Step",
  };
  const addDetailsButton = `<div class="add-details" id="demo-modal"><button id="thinkify-button">${buttonName[type]}</button></div>`;
  return addDetailsButton;
};

function addButtonIfCorrectPage() {
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
        if ($("#demo-modal").length === 0) {
          candidateInfo.setDetails({ data: candidate });
          const buttonToShow = getButtonName(candidate);
          appendButton(model, buttonToShow);
          $("body").append(popupSidebar);
          setTimeout(() => {
            // $('#demo-modal').click(showMainPopupFirst);
            $("#thinkify-button").click(openSidebar);
            $("#body-overlay").click(closeSidebar);
            $("#modal__close").click(closeSidebar);
          }, 0);
        }
      });
      clearInterval(checkExist);
    }
  }, 100);
}

const onUrlChange = async () => {
  await sleep(5);
  addButtonIfCorrectPage();
};

function getInfoFromCard(jobHtml, skills) {
  let url = $(jobHtml).find(".artdeco-entity-lockup__title a")[0].href;
  let title = $(jobHtml).find(".artdeco-entity-lockup__title a")[0].innerHTML;
  let companyName = $(jobHtml).find(".job-card-container__company-name")[0]
    .innerHTML;
  let image = $(jobHtml).find(".job-card-list__entity-lockup img")[0].src;
  let companyId = $(jobHtml).find(".job-card-container__company-name")[0].href;
  let metaHTML = $(jobHtml).find(".job-card-container__metadata-item");
  let jobId = $(jobHtml).attr("data-job-id");
  let metaDetais = Array(...metaHTML).map((ite) => {
    return $(ite)[0].innerHTML.replace(/\n/g, "").trim();
  });

  url = url.replace(/\n/g, "").trim();
  title = title.replace(/\n/g, "").trim();
  companyName = companyName.replace(/\n/g, "").trim().toLowerCase();
  if(!companyId){
    return null;
  }
  companyId = companyId.replace(/\n/g, "").trim();
  companyId = companyId.split("/");
  companyId = companyId[companyId.length - 2];
  image = image.replace(/\n/g, "").trim();

  return {
    url,
    title,
    companyName,
    companyId,
    metaDetais,
    image,
    jobId,
    skills,
  };
}

const sleep = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
};

const scrapeData = async () => {
  await sleep(5);
  if (location.pathname.includes("/search/results/people/")) {
    saveRecruiterOfCompany();
    return;
  }

  saveTheRecomendedJobs();
};

const contactType = {
  recruiter: "RECRUITER",
  engineers: "ENGINEER",
};

const saveRecruiterOfCompany = async () => {
  // check if the url have recruiter as key word
  const params = new URLSearchParams(location.search);
  let keys = params.get("keywords");
  console.log(`==> : file: linkedinForeground.js : line 227 : keys`, keys);
  const showProceed = keys.includes("recruiter") || keys.includes("engineers");
  console.log(
    `==> : file: linkedinForeground.js : line 229 : showProceed`,
    showProceed
  );

  if (!showProceed) {
    return;
  }

  const keywords = keys.includes('recruiter') ? 'recruiter' : 'engineers';
  const companyName = keys.replace(keywords, "").trim().toLowerCase();

  let listOfRecruiterOfCompany = Array(
    ...$(".reusable-search__result-container ")
  ).map((item) => {
    let name = $(item).find(".app-aware-link span span")[0].innerHTML;
    name = name.replace("<!---->", "");
    name = name.replace("\x3C!---->", "");
    return {
      image: $(item).find(".entity-result__universal-image img").attr("src"),
      linkedIn: $(item).find("a.app-aware-link")[1].href,
      name,
      companyName,
      type: contactType[keywords],
    };
  });

  listOfRecruiterOfCompany = listOfRecruiterOfCompany.map((item) => {
    return {
      ...item,
      linkedIn: item.linkedIn
        ? item.linkedIn.split("?")[0].split("/")[4]
        : undefined,
    };
  });

  listOfRecruiterOfCompany = listOfRecruiterOfCompany.filter(
    (item) => item.linkedIn
  );

  console.log(
    "🚀 ~ file: linkedinForeground.js ~ line 238 ~ listOfRecruiterOfCompany ~ listOfRecruiterOfCompany",
    listOfRecruiterOfCompany
  );

  try {
    await postLinkedInContactData(listOfRecruiterOfCompany);
  } catch (error) {
    console.log("error", error);
  }
};

const saveTheRecomendedJobs = async () => {
  const { linkedInProfile } = getDetailsOfCandidate();
  const allTheListOfJobs = $(".job-card-container");
  const params = new URLSearchParams(location.search);
  let skills = params.get("keywords");
  if (!skills) {
    skills = $(".jobs-search-box__text-input")[0].value;
  }
  skills = skills?.split(" ");
  skills = skills?.length ? skills.filter((item) => item.trim()) : [];
  if (skills?.length) {
    let listToSave = Array(...allTheListOfJobs).map((item) =>
      getInfoFromCard(item, skills)
    );
    listToSave = listToSave.filter(item => item);
    console.log("start Scraping", listToSave);
    const responce = await postgetDetailsByLinkedInIdData(listToSave);
    console.log("responce:", responce);
  } else {
    console.log("no Skills found");
  }
};

console.log("step0:");

$(document).ready(function () {
  console.log("step1:");
  scrapeData();
  onUrlChange();

  $(".jobs-search-box__submit-button").click(saveTheRecomendedJobs);

  let previousUrl = "";

  const observer = new MutationObserver(() => {
    if (window.location.href !== previousUrl) {
      console.log(`URL changed from ${previousUrl} to ${window.location.href}`);
      previousUrl = window.location.href;
      // do your thing
      console.log("trigger");
    }
  });
  const config = { subtree: true, childList: true };

  // start observing change
  observer.observe(document, config);
});
