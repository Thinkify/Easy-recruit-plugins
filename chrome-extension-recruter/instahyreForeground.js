console.log("Inside  myInstahyreScript content script");

const getContentJson = async (model) => {
  // debugger;
  const name = $(model[0]).find(".candidate-name span")[0].innerHTML;
  // const gitHub = $(model[0]).find('.social-github a')[0].href;
  // const linkedin = $(model[0]).find('.social-linkedin a')[0].href;
  const PhoneNumber = $($(model[0]).find(".info")[5]).find("span")[0].innerHTML;
  const email = $($(model[0]).find(".info")[4]).find("span")[0].innerHTML;
  // const linkedInProfile = linkedin.split('/');
  const data = { name, PhoneNumber, email };
  // const data = await getDetailsByAny({
  //   name,
  //   gitHub,
  //   linkedInProfile,
  //   email,
  // });
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

const mainPopup = `<div id="demo-modal-popup" class="my_modal">
	<div class="modal__content">
		<div id='iframe-wrapper'>
		</div>
		<a href="#" class="modal__close">&times;</a>
	</div>
</div>`;

function hideModal() {
  $("#demo-modal-popup").removeClass("modal__target");
  $("#iframe-wrapper").html("");
}

function showModal(candidateInfo) {
  var iframe = document.createElement("iframe");
  document.getElementById("iframe-wrapper").appendChild(iframe);
  iframe.src = `https://sleepy-meadow-81233.herokuapp.com/?find=yatinkathuria74@gmail.com`;
  $("#demo-modal-popup").addClass("modal__target");
  $("#demo-modal-popup").click(hideModal);
}

function handleThinkifyButtonClick(event) {
  event.preventDefault();
  event.stopPropagation();
  showModal("amangautam72");
}

function addButtonIfCorrectPage() {
  console.log("====in buton ciode");
  $(".candidate-action-links.resume-modal > div:nth-child(" + 3 + ")").after(
    button
  );

  setTimeout(() => {
    $("#thinkify-button").click(handleThinkifyButtonClick);
    $("body").append(mainPopup);
  }, 0);
}

// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
  $(".button-download-resume").click(function (e) {
    e.stopPropagation();
    const id = setInterval(function () {
      if ($(".application-modal-wrap").length) {
        const model = $(".application-modal-wrap");
        getContentJson(model);
        addButtonIfCorrectPage();

        clearInterval(id);
      }
    }, 500);
  });
});
