const getAllCompanyDataExtrationNotCompleted = (reqObject) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${
        getConfig().DEVELOPMENT_URL
      }/api/v1/company/getAllCompanyDataExtrationNotCompleted`
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log("error:", err);
        reject(err);
      });
  });
};

const getCompanies = async () => {
  const data = await getAllCompanyDataExtrationNotCompleted();
  return data;
};

async function openAndRun(companyName) {
  newTab = window.open("https://fiddle.jshell.net/fakePage/");
  intervalVar = setInterval(function () {
    myTimer(newTab, intervalVar);
  }, 1000);
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

async function* generator(companyName) {
  yield await openAndRun(companyName);
}

$(document).ready(async function () {
  console.log("init scraping:");
  // get all companies with data extraction = false;
  // open new tab in every 10 sec
  // scrape the data
  // then close the tab
  const companies = await getCompanies();
  console.log(`==> : file: scrapingData.js : line 13 : companies`, companies);
  const { companyList } = companies;
  (async () => {
    for await (const item of companyList) {
      console.log(item.companyName);
      generator(item.companyName);
    }
  })();
});

function getConfig() {
  let CONFIG = {
    PRODUCTION_URL: "https://sleepy-meadow-81233.herokuapp.com",
    DEVELOPMENT_URL: "http://localhost:5000",
    B_PROD_URL: "https://shortline-be.herokuapp.com/api/v1/candidates",
    B_DEV_URL: "http://localhost:5000/api/v1/candidates",
  };
  return CONFIG;
}
