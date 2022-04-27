const { PRODUCTION_URL } = require('./config');

console.log('Inside  myInstahyreScript content script');

const getContentJson = (model) => {
  if (!model.length) {
    return null;
  }

  const name = $(model[0]).find('.candidate-name span')[0]?.innerHTML;
  const email = $($(model[0]).find('.info')[4]).find('a')[0]?.innerHTML;
  let currentSalary = $($(model[0]).find('.info')[3]).find('span')[1]
    ?.innerHTML;
  console.log(currentSalary);
  if (currentSalary) {
    currentSalary = currentSalary.split(' ')[0];
    currentSalary = Number(currentSalary) * 100000; // 1 Lakh
  }

  let gitHub = $(model[0]).find('.social-github a')[0]?.href;
  if (gitHub) {
    gitHub = gitHub?.split('/')[3];
  }

  let linkedInProfile = $(model[0]).find('.social-linkedin a')[0]?.href;
  if (linkedInProfile) {
    linkedInProfile = linkedInProfile.split('/')[4];
  }

  let contact = $($(model[0]).find('.info')[5]).find('span')[0]?.innerHTML;
  if (contact) {
    contact = contact.split('/')[0];
  }

  const data = {
    name,
    gitHub,
    linkedInProfile,
    email,
    contact,
    currentSalary,
  };
  console.log(data);
  return data;
};

const button = `<div class="info-button" id="thinkify-button">
<label>
    <a class="button-download-resume button-download cursor-pointer ng-scope" target="_blank" href="">
      <i class="fa fa-fw fa-info"></i>Show Info
    </a>
</label>
<span class="action-checked ng-scope" tooltip=""></span>
</div>`;

const popupSidebar = `
<div id="thinkify_modal">
  <div id="body-overlay"></div>
  <nav class="real-menu" role="navigation">
    <div id='iframe-wrapper'>
    </div>
    <a href="#" class="modal__close" id="modal__close">&times;</a>
  </nav>
</div>`;

async function openSidebar(event) {
  // const URL = 'https://sleepy-meadow-81233.herokuapp.com';
  // const URL = 'http://localhost:3000';
  event.preventDefault();
  event.stopPropagation();
  const element = document.getElementById('thinkify_modal');
  element.classList.add('menu-open');
  const iframe = document.createElement('iframe');
  document.getElementById('iframe-wrapper').appendChild(iframe);
  const model = $('.application-modal-wrap');
  const userData = getContentJson(model);

  if (userData) {
    const response = await getDetailsByAny(userData);
    let url = '';
    const params = createObjectParams(userData);
    console.log('====', response);
    if (response.message === 'User not found') {
      url = `${PRODUCTION_URL}/add?${params}`;
    } else {
      url = `${PRODUCTION_URL}/?find=${response?.candidate?.email}&hf=true`;
    }
    iframe.src = url;
    $('#modal__close').click(closeSidebar);
  }
}

function closeSidebar() {
  const element = document.getElementById('thinkify_modal');
  element.classList.remove('menu-open');
  $('#iframe-wrapper').html('');
}

function addButtonIfCorrectPage() {
  console.log('====in buton ciode');
  $('.candidate-action-links.resume-modal > div:nth-child(' + 3 + ')').after(
    button
  );

  setTimeout(() => {
    $('body').append(popupSidebar);
    document
      .getElementById('thinkify-button')
      .addEventListener('click', openSidebar);
    document
      .getElementById('body-overlay')
      .addEventListener('click', closeSidebar);
  }, 0);
}

// A $( document ).ready() block.
$(document).ready(function () {
  console.log('ready!');
  $('.button-download-resume').click(function (e) {
    e.stopPropagation();
    const id = setInterval(function () {
      if ($('.application-modal-wrap').length) {
        addButtonIfCorrectPage();
        clearInterval(id);
      }
    }, 500);
  });
});
