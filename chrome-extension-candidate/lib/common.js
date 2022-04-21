// const BASE_URL = 'https://candidate-infon.herokuapp.com/api/v1/candidates';
const BASE_URL = 'https://shortline-be.herokuapp.com/api/v1/candidates';

const getDetailsByLinkedInId = (linkedINProfile='') => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/getCandidateByAny?linkedInProfile=${linkedINProfile}`)
          .then(response => response.json())
          .then(data => {
              const {candidate} = data;
              resolve({
                  ...candidate,
              });
          }).catch(err => {
              console.log('error:',err);
              reject(err);
          })
    });
  };