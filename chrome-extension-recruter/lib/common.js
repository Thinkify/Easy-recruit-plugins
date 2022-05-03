function createObjectParams(object) {
  if (!object) return '';

  return Object.keys(object).reduce((acc, current) => {
    if (!object[current]) return acc;
    return acc + `${current}=${object[current]}&`;
  }, '');
}

const getDetailsByLinkedInId = (linkedINProfile = '') => {
  return new Promise((resolve, reject) => {
    console.log('name to be fetched: ', linkedINProfile);
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

const getDetailsByAny = (reqObject) => {
  return new Promise((resolve, reject) => {
    var { email } = reqObject;
    const urlParams = createObjectParams({ email });
    fetch(`${B_PROD_URL}/getCandidateByAny?${urlParams}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log('error:', err);
        reject(err);
      });
  });
};

function getConfig() {
  let CONFIG = {
    PRODUCTION_URL: 'https://sleepy-meadow-81233.herokuapp.com',
    DEVELOPMENT_URL: 'http://localhost:3000',
    B_PROD_URL: 'https://shortline-be.herokuapp.com/api/v1/candidates',
    B_DEV_URL: 'http://localhost:5000/api/v1/candidates',
  };
  return CONFIG;
}
