console.log('INside  myInstahyreScript content script');

const getContentJson = async () => {
    const name = $('.application-modal-wrap social-link social-github ng-scope').text();
    const gitHub = $('.application-modal-wrap .social-link.social-github.ng-scope a').attr("href");
    const linkedin = $('.application-modal-wrap .social-link.social-linkedin.ng-scope a').attr("href");
    const linkedINProfile = linkedin.split("/");
    const data = await getDetailsByLinkedInId(linkedINProfile[4]);
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
         }, 100);
    
    });
});