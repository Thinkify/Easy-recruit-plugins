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

async function postgetDetailsByLinkedInIdData(data = {}) {
  // Default options are marked with *
  const url = `${getConfig().BE_URL}/jobs/registerJobsInBulk`;
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function getConfig() {
  const CONFIG = {
    PRODUCTION_URL: 'https://short-line-c.herokuapp.com',
    DEVELOPMENT_URL: 'http://localhost:3000',
    B_DEV_URL: 'https://shortline-be.herokuapp.com/api/v1/candidates',
    B_PROD_URL: 'https://shortline-be.herokuapp.com/api/v1/candidates',
    BE_URL: 'https://shortline-be.herokuapp.com/api/v1',
  };
  return CONFIG;
}
// accodian for the info
// jobs first
