const getDetailsByLinkedInId = (linkedINProfile='') => {
    return new Promise((resolve, reject) => {
        console.log('name to be fetched: ',linkedINProfile)
        fetch(`http://localhost:8081/candidates/getCandidateByLinkedInProfile/${linkedINProfile}`)
          .then(response => response.json())
          .then(data => {
              console.log("data",data);
              const candi = data.candidate[0];
              resolve({
                  ...candi,
              });
          }).catch(err => {
              console.log('error:',err);
              reject(err);
          })
    });
  };