// const BASE_URL = 'https://candidate-infon.herokuapp.com/api/v1/candidates';
const BASE_URL = 'http://localhost:5000/api/v1/candidates';

const getDetailsByLinkedInId = (linkedINProfile='') => {
    return new Promise((resolve, reject) => {
        console.log('name to be fetched: ',linkedINProfile)
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

  const getDetailsByAny = (reqObject) => {
    return new Promise((resolve, reject) => {
        debugger;
        const urlParams = Object.keys(reqObject).reduce((current,acc )=>{
                return acc + `current=${reqObject[current]}&`
        },'');

        
        fetch(`${BASE_URL}/getCandidateByAny?${urlParams}`);
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