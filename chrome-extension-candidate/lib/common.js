// const BASE_URL = 'https://candidate-infon.herokuapp.com/api/v1/candidates';
const BASE_URL = 'http://localhost:5000/api/v1/candidates';

const getDetailsByLinkedInId = (linkedINProfile = '') => {
  return new Promise((resolve, reject) => {
    fetch(
      `${
        getConfig().B_PROD_URL
      }/getCandidateByAny?linkedInProfile=${linkedINProfile}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { candidate } = data;
        resolve({
          ...candidate,
        });
      })
      .catch((err) => {
        console.log('error:', err);
        reject(err);
      });
  });
};

function getConfig() {
  const CONFIG = {
    PRODUCTION_URL: 'https://short-line-c.herokuapp.com',
    DEVELOPMENT_URL: 'http://localhost:3000',
    B_PROD_URL: 'https://shortline-be.herokuapp.com/api/v1/candidates',
    B_DEV_URL: 'http://localhost:5000/api/v1/candidates',
  };
  return CONFIG;
}
// accodian for the info
// jobs first
