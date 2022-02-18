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

const similarJobs=`
<div class="after-vet-popup-section-1">
<div data-job-id="2733248379" class="job-card-container relative job-card-list
job-card-container--clickable
job-card-list--underline-title-on-hover  jobs-search-two-pane__job-card-container--viewport-tracking-1">

<div id="ember56" class="job-card-list__entity-lockup artdeco-entity-lockup artdeco-entity-lockup--size-4 ember-view">
    <div id="ember57" class="mr1 artdeco-entity-lockup__image artdeco-entity-lockup__image--type-square ember-view" type="square">
      <a data-control-id="wUiqVkY6Z71FfHWgUx9vWg==" tabindex="-1" href="/jobs/view/2733248379/?eBP=CwEAAAF_B_eHZD5z4NkYzkvUJWxxz6qrTp0XbqhshtJZz367BV0oL8FScRJ3XS4Spx-H6zmOynJreUCZfAsUch2vWvZHkwrai7bEOdqvwKs9XcL1Dt0_UAXxdWNZBz4MoHoJ_6iR50WItIKwOb66-Ix1j62ZuqepRMxXKtfLzUYwRTI4P17yi6bJ_BfXLPkJuLfT8aKoMg1Zw5Ip5CAFPZTU8DfC8VFDW5xhtycxxUNCSG9t1y0kZ6watft8xShKvzu1oQzUTV9krAQcd260L-IrZK8BbdWsr05fPUWj-ipKPDN_WfiUf98PJAHVVbbq2g&amp;recommendedFlavor=SCHOOL_RECRUIT&amp;refId=DuXIXGlxwhBsbHmmBg7RPg%3D%3D&amp;trackingId=wUiqVkY6Z71FfHWgUx9vWg%3D%3D&amp;trk=flagship3_jobs_discovery_jymbii" id="ember58" class="disabled ember-view job-card-container__link">
        <img title="Amazon" src="https://media-exp1.licdn.com/dms/image/C560BAQHTvZwCx4p2Qg/company-logo_100_100/0/1612205615891?e=1652918400&amp;v=beta&amp;t=Xlq6OBTTZ7nWSXYlW7excBzDI6Cc7z44WVB6ue3mWpI" alt="Amazon logo" id="ember59" class="ember-view">
      </a>
    
</div>

<div id="ember60" class="flex-grow-1 artdeco-entity-lockup__content ember-view">
  <div id="ember61" class="full-width artdeco-entity-lockup__title ember-view">
      <a data-control-id="wUiqVkY6Z71FfHWgUx9vWg==" tabindex="0" href="/jobs/view/2733248379/?eBP=CwEAAAF_B_eHZD5z4NkYzkvUJWxxz6qrTp0XbqhshtJZz367BV0oL8FScRJ3XS4Spx-H6zmOynJreUCZfAsUch2vWvZHkwrai7bEOdqvwKs9XcL1Dt0_UAXxdWNZBz4MoHoJ_6iR50WItIKwOb66-Ix1j62ZuqepRMxXKtfLzUYwRTI4P17yi6bJ_BfXLPkJuLfT8aKoMg1Zw5Ip5CAFPZTU8DfC8VFDW5xhtycxxUNCSG9t1y0kZ6watft8xShKvzu1oQzUTV9krAQcd260L-IrZK8BbdWsr05fPUWj-ipKPDN_WfiUf98PJAHVVbbq2g&amp;recommendedFlavor=SCHOOL_RECRUIT&amp;refId=DuXIXGlxwhBsbHmmBg7RPg%3D%3D&amp;trackingId=wUiqVkY6Z71FfHWgUx9vWg%3D%3D&amp;trk=flagship3_jobs_discovery_jymbii" id="ember62" class="disabled ember-view job-card-container__link job-card-list__title">
        Software Development Engineer
      </a>
  
</div>

  <div id="ember63" class="artdeco-entity-lockup__subtitle ember-view">
        <a data-control-id="wUiqVkY6Z71FfHWgUx9vWg==" data-control-name="job_card_company_link" href="/company/1586/" id="ember64" class="job-card-container__link job-card-container__company-name ember-view">
          Amazon
        </a>
          </div>

  <div id="ember65" class="artdeco-entity-lockup__caption ember-view">
      <ul class="job-card-container__metadata-wrapper">
          <li class="job-card-container__metadata-item">Bengaluru, Karnataka, India</li>
          <li class="job-card-container__metadata-item job-card-container__metadata-item--workplace-type">
            On-site
          </li>
      </ul>
  </div>
<!---->    </div>


</div>


    <!---->
    



</div>
</div>

`
const similarJobsUber=`
<div id="ember90" class="job-card-list__entity-lockup artdeco-entity-lockup artdeco-entity-lockup--size-4 ember-view">
        <div id="ember91" class="mr1 artdeco-entity-lockup__image artdeco-entity-lockup__image--type-square ember-view" type="square">
          <a data-control-id="Ssi1halfObiQBFZhrLpY1w==" tabindex="-1" href="/jobs/view/2752443605/?eBP=CwEAAAF_CB_5Ktg57E65PcXHeUsgVf3Ep4joO4pqV7CP860XMKCBxyFzXYF2MH4FsLShEBplvrL-BYM5aSHWMim4cT5EvKYhxsBFAkCzkM_6aZN5ya5NIWbOIlDnRtCHPTrHIIBX3zSHLeQWBxJucdNs1e_JJia9GkKeAycdJq69nPlF85SiQDMm0sF0P5nnEEVNFyp33EPl2o675ToN-Q9e4eqr6LBe_nhJXR2UH6Goa2wEOLWvhq4TYrFDpymKvjD1VlGFhlLxU27r670MaznTvrK1rFmouBN9lKGBgn9aG6xp_vuvlHgCW3QgwqeqEvHRmsPSiiIfwPmkOUnJsISNX3PytBYMWBxcYbuazlK0&amp;recommendedFlavor=IN_NETWORK&amp;refId=Bn9wWxc2%2Fa7ODK47pSdByQ%3D%3D&amp;trackingId=Ssi1halfObiQBFZhrLpY1w%3D%3D&amp;trk=flagship3_jobs_discovery_jymbii" id="ember92" class="disabled ember-view job-card-container__link">
            <img title="Uber" src="https://media-exp1.licdn.com/dms/image/C4D0BAQFiYnR1Mbtxdg/company-logo_100_100/0/1538169321193?e=1652918400&amp;v=beta&amp;t=z1gtMeUz-a7OqGhDu7isRcBoKzeJImbnjo9ojyXuZL8" alt="Uber logo" id="ember93" class="ember-view">
          </a>
        
</div>
    
    <div id="ember94" class="flex-grow-1 artdeco-entity-lockup__content ember-view">
      <div id="ember95" class="full-width artdeco-entity-lockup__title ember-view">
          <a data-control-id="Ssi1halfObiQBFZhrLpY1w==" tabindex="0" href="/jobs/view/2752443605/?eBP=CwEAAAF_CB_5Ktg57E65PcXHeUsgVf3Ep4joO4pqV7CP860XMKCBxyFzXYF2MH4FsLShEBplvrL-BYM5aSHWMim4cT5EvKYhxsBFAkCzkM_6aZN5ya5NIWbOIlDnRtCHPTrHIIBX3zSHLeQWBxJucdNs1e_JJia9GkKeAycdJq69nPlF85SiQDMm0sF0P5nnEEVNFyp33EPl2o675ToN-Q9e4eqr6LBe_nhJXR2UH6Goa2wEOLWvhq4TYrFDpymKvjD1VlGFhlLxU27r670MaznTvrK1rFmouBN9lKGBgn9aG6xp_vuvlHgCW3QgwqeqEvHRmsPSiiIfwPmkOUnJsISNX3PytBYMWBxcYbuazlK0&amp;recommendedFlavor=IN_NETWORK&amp;refId=Bn9wWxc2%2Fa7ODK47pSdByQ%3D%3D&amp;trackingId=Ssi1halfObiQBFZhrLpY1w%3D%3D&amp;trk=flagship3_jobs_discovery_jymbii" id="ember96" class="disabled ember-view job-card-container__link job-card-list__title">
            Software Engineer II, iOS - Micromobility
          </a>
      
</div>

      <div id="ember97" class="artdeco-entity-lockup__subtitle ember-view">
            <a data-control-id="Ssi1halfObiQBFZhrLpY1w==" data-control-name="job_card_company_link" href="/company/1815218/" id="ember98" class="job-card-container__link job-card-container__company-name ember-view">
              Uber
            </a>
              </div>

      <div id="ember99" class="artdeco-entity-lockup__caption ember-view">
          <ul class="job-card-container__metadata-wrapper">
              <li class="job-card-container__metadata-item">Bengaluru, Karnataka, India</li>
<!---->          </ul>
      </div>
<!---->    </div>
    
  
</div>
`

function createAfterVetPopup(testResult){
  const MockInterview = `<div class='mentor-button'>Get MockInterview</div>`;
  const LearnMore = `<div class='mentor-button'>Learn more</div>`;
  const overallScore = testResult['Overall score'];
  const javaScriptKnowledge = testResult['JavaScript Knowledge'];
  const reactKnowledge = testResult['React Knowledge'];

  const section1 = `
  <div class="after-vet-popup-section-1">
  <div class='section-title'>
    <div class="section-title-name">Similar Jobs </div>

  </div>
  <div class="popup-rating-cointainer">
      <div class="after-vet-popup-section-1">
      <div class="ember-view jobs-unified-description__salary-main-rail-card">  
          <div class="artdeco-card mb4 pb1">
          <div class="jobs-salary-main-rail-empty-state-card__feedback-btn">
          <span class="t-14 t-black--light mt1">
              ${similarJobs}
          </span>
    </div>
    <div class="jobs-salary-main-rail-empty-state-card__feedback-btn">
          <span class="t-14 t-black--light mt1">
              ${similarJobsUber}
          </span>
    </div>
           </div>
      </div>
  </div>
</div>
</div>
  `

  const section3 = `
  <div class="after-vet-popup-section-1">
  <div class='section-title'>
    <div class="section-title-name">Mentors </div>

  </div>
  <div class="popup-rating-cointainer">
      <div class="after-vet-popup-section-1">
      <div class="ember-view jobs-unified-description__salary-main-rail-card">  
          <div class="artdeco-card mb4 pb1">
          <div class="jobs-salary-main-rail-empty-state-card__feedback-btn">
          <span class="t-14 t-black--light mt1">
              ${similarJobs}
          </span>
    </div>
    <div class="jobs-salary-main-rail-empty-state-card__feedback-btn">
          <span class="t-14 t-black--light mt1">
              ${similarJobs}
          </span>
    </div>
           </div>
      </div>
  </div>
</div>
</div>
  `

  const section2 = `
  <div class="after-vet-popup-section-1">
  <div class='section-title'>
  <div class="section-title-name">Your Score</div>
  <div class="popup-close">X</div>
  </div>
  <div class="popup-rating-cointainer">
      <div class="after-vet-popup-section-1">
      <div class="ember-view jobs-unified-description__salary-main-rail-card">  
          <div class="artdeco-card mb4 pb1">
          <div class="jobs-salary-main-rail-empty-state-card__feedback-btn">
          <span class="t-14 t-black--light mt1">
              Overall score : ${overallScore}
          </span>
    </div>
    <div class="jobs-salary-main-rail-empty-state-card__feedback-btn">
          <span class="t-14 t-black--light mt1">
              JavaScript Knowledge: ${javaScriptKnowledge}
          </span>
    </div>
    <div class="jobs-salary-main-rail-empty-state-card__feedback-btn">
          <span class="t-14 t-black--light mt1">
              React Knowledge : ${reactKnowledge}
          </span>
    </div>    
           </div>
      </div>
  </div>
</div>
</div>
  `

  const popup = `
        <div id='after-vet-popup-container' class="after-vet-popup-container hidden">
          <div class="after-vet-popup-container-content">
              ${section2}
              ${section1}
              ${section3}
          </div>       
        </div>
  `;
  return popup;
}

function showTestResults(e){
  e.stopPropagation();
  $('#after-vet-popup-container').removeClass('hidden');
};

function hideTestResults(e){
  e.stopPropagation();
  console.log('hide data...')
  $('#after-vet-popup-container').addClass('hidden');
};

function addClicked(event){
    event.stopPropagation();
    console.log('addClicked is clicked!!');
    const width = 440;
    const height = 220;
    const left = (screen.width/2)-(width/2);
    const top = (screen.height/2)-(height/2); 

    chrome.runtime.sendMessage({
        action: 'createWindowPopup',
        payload:{width,height,left,top}
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
                let attachedPopup = '';
                if(candidate && candidate.testResult){
                  buttonView = StatusButton;
                  attachedPopup = createAfterVetPopup(candidate.testResult)
                }else if(candidate && candidate.linkedInProfile){
                  buttonView = vetButton;
                } 
                newdiv2 = document.createElement("div"),
                existingdiv1 = document.getElementById("foo");
                model.append( buttonView, [ newdiv2, existingdiv1 ] );
                
                if(candidate && candidate.testResult){
                  $('.add-details').click(showTestResults);
                  $('.add-details').append(attachedPopup);
                  $('.popup-close').click(hideTestResults);
                }else if(candidate && candidate.linkedInProfile){
                  $('.add-details').click(addClicked);
                } 
               
              });

           clearInterval(checkExist);
        }
     }, 100);

    // $('.jobs-apply-button--top-card').append(addDetailsButton);

});

