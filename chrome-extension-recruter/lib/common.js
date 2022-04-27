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
      `${CONFIG.B_PROD_URL}/getCandidateByAny?linkedInProfile=${linkedINProfile}`
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
