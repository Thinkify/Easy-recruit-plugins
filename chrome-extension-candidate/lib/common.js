const getDetailsByLinkedInId = (linkedINProfile = '') => {
  return new Promise((resolve, reject) => {
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
