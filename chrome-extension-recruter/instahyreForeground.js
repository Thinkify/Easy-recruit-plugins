console.log('Inside  myInstahyreScript content script');

const getContentJson = async (model) => {
    debugger;
    const name = $(modal[0]).find('.candidate-name span')[0].innerHTML
    const gitHub = $(modal[0]).find('.social-github a')[0].href;
    const linkedin = $(modal[0]).find('.social-linkedin a')[0].href;
    const PhoneNumber = $($(modal[0]).find('.info')[5]).find('span')[0].innerHTML;
    const email = $($(modal[0]).find('.info')[4]).find('span')[0].innerHTML;
    const linkedInProfile = linkedin.split("/");
    const data = await getDetailsByAny({
        name,gitHub,linkedInProfile,email
    });
    return data;
  };

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    $('.button-download-resume').click(function(e) {
        console.log('onclick is called');
        e.stopPropagation();
        console.log('$( this )',$( this ));
        var checkExist = setInterval(function() {
            if ($('.application-modal-wrap .social-link.social-linkedin.ng-scope a').length) {
               console.log("Exists!");
                const model = $('.application-modal-wrap')
                getContentJson(model).then((candidate) => {
                    console.log("candidate:", candidate);
                    const $newdiv1 = $(`<div id='layer'> 
                        <div>Current CTC: ${candidate.currentSalary}</div>
                        <div>Expected CTC: ${candidate.expectedSalary}</div>
                        <div>Notice period :${candidate.noticePeriod}</div>
                        <div>Updated on :${candidate.date}</div>
                        </div>`),
                      newdiv2 = document.createElement("div"),
                      existingdiv1 = document.getElementById("foo");
                      model.append( $newdiv1, [ newdiv2, existingdiv1 ] );

                  });

               clearInterval(checkExist);
            }
         }, 1000);
    
    });
});