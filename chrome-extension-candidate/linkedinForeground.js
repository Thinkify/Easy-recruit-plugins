let instance = null;
class Candidate {
  constructor(name = '', linkedInProfile = '', data = null) {
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
    <div id='iframe-wrapper'>
    </div>
    <a href="#" class="modal__close" id="modal__close">&times;</a>
  </nav>
</div>`;

const routeToJoin = '/apply';

function showTestResults() {
  const iframe = document.createElement('iframe');
  document.getElementById('iframe-wrapper').appendChild(iframe);

  const { linkedInProfile, name } = getDetailsOfCandidate();
  console.log('candidate:', candidateInfo.getDetais());

  const { data } = candidateInfo.getDetais();
  if (data?.linkedInProfile && data?.testResult) {
    iframe.src = `${getConfig().PRODUCTION_URL}/?linkedInProfile=${data?.linkedInProfile}`;
  } else if (data?.linkedInProfile) {
    iframe.src = `${getConfig().PRODUCTION_URL}/take-test`;
  } else {
    iframe.src = `${getConfig().PRODUCTION_URL}/apply/?linkedInProfile=${linkedInProfile}&name=${name}`;
  }
}

function closeSidebar() {
  const element = document.getElementById('thinkify_modal');
  element.classList.remove('menu-open');
  $('#iframe-wrapper').html('');
}

const getDetailsOfCandidate = () => {
  const contentExtracted = JSON.parse(
    $('code:contains("publicIdentifier")')[0].textContent
  );

  const linkedInProfile = contentExtracted?.included[0]?.publicIdentifier;
  const firstName = contentExtracted?.included[0]?.firstName || '';
  const lastName = contentExtracted?.included[0]?.lastName || '';
  const name = firstName + ' ' + lastName;

  candidateInfo.setDetails((linkedInProfile, name));

  return {
    linkedInProfile,
    name,
  };
};

function openSidebar() {
  const element = document.getElementById('thinkify_modal');
  element.classList.add('menu-open');
  showTestResults();
}

function hideMainPopupFirst() {
  $('#demo-modal-popup').removeClass('modal__target');
  $('#iframe-wrapper').html('');
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
    1: 'Add details',
    2: 'Vet yourself',
    3: 'Next Step',
  };
  const addDetailsButton = `<div class="add-details" id="demo-modal"><button id="thinkify-button">${buttonName[type]}</button></div>`;
  return addDetailsButton;
};

function addButtonIfCorrectPage() {
  const { linkedInProfile } = getDetailsOfCandidate();

  var checkExist = setInterval(function () {
    if ($('.jobs-apply-button--top-card').length) {
      console.log('Exists!');
      const model = $('.jobs-save-button ').parent();

      function appendButton(model, buttonView) {
        (newdiv2 = document.createElement('div')),
          (existingdiv1 = document.getElementById('foo'));
        model.append(buttonView, [newdiv2, existingdiv1]);
      }

      getContentJson(linkedInProfile).then((candidate) => {
        console.log('candidate:', candidate);
        if ($('#demo-modal').length === 0) {
          candidateInfo.setDetails({ data: candidate });
          const buttonToShow = getButtonName(candidate);
          appendButton(model, buttonToShow + popupSidebar);
          setTimeout(() => {
            // $('#demo-modal').click(showMainPopupFirst);
            $('#thinkify-button').click(openSidebar);
            $('#body-overlay').click(closeSidebar);
            $('#modal__close').click(closeSidebar);
          }, 0);
        }
      });
      clearInterval(checkExist);
    }
  }, 100);
}

function onUrlChange() {
  console.log('step2:');
  setTimeout(() => {
    addButtonIfCorrectPage();
  }, 100);
}

function getInfoFromCard(jobHtml){
  
  let url = $(jobHtml).find('.artdeco-entity-lockup__title a')[0].href;
  let title = $(jobHtml).find('.artdeco-entity-lockup__title a')[0].innerHTML;
  let companyName = $(jobHtml).find('.job-card-container__company-name')[0].innerHTML;
  let image = $(jobHtml).find('.job-card-list__entity-lockup img')[0].src;
  let companyId = $(jobHtml).find('.job-card-container__company-name')[0].href;
  let metaHTML = $(jobHtml).find('.job-card-container__metadata-item');
  let metaDetais = Array(...metaHTML).map(ite => {
    return $(ite)[0].innerHTML.replace(/\n/g, '').trim();;
  });

  url = url.replace(/\n/g, '').trim();
  title = title.replace(/\n/g, '').trim();
  companyName = companyName.replace(/\n/g, '').trim();
  companyId =companyId.replace(/\n/g, '').trim();
  image = image.replace(/\n/g, '').trim();

  return {
    url,
    title,
    companyName,
    companyId,
    metaDetais,
    image
  }
}

function saveTheRecomendedJobs(){
  const { linkedInProfile } = getDetailsOfCandidate();
  const allTheListOfJobs = $('.job-card-container');
  var listToSave = Array(...allTheListOfJobs).map(item => getInfoFromCard(item))
  console.log('start Scraping',listToSave);
}

$(document).ready(function () {
  console.log('step1:');
  saveTheRecomendedJobs();

  onUrlChange();

  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if ($('#demo-modal').length === 0) {
        onUrlChange();
      }
    }
  }).observe(document, { subtree: true, childList: true });
});
