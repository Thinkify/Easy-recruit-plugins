// const BASE_URL = 'https://candidate-infon.herokuapp.com/api/v1/candidates';
const BASE_URL = 'http://localhost:5000/api/v1/candidates';

const setDetailsByLinkedInId = (formData={}) => {
    return new Promise((resolve, reject) => {
        console.log('formData to be fetched: ',formData)
        fetch(`${BASE_URL}/addcandidate`, {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json())
              .then(data => {
                const {newUser={}} = data?.user;
                resolve({
                    ...newUser,
                });
            }).catch(err => {
                console.log('error:',err);
                reject(err);
            })
    });
  };

  export default setDetailsByLinkedInId;