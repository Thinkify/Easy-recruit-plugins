const NOTICE_PERIOD = {
  0: "immediate",
  1: "15 days",
  2: "1 months",
  3: "2 months",
  4: "3 months",
};
const url = `https://www.instahyre.com/api/v1/search_candidate?`;
const query = {
  all_skills: "React.js,Redux",
  entire_resume: "true",
  filter_date: "2022-03-15T10:41:57",
  hide_profiles: "0:0:90",
  hide_viewed_by_others: "false",
  hide_viewed_by_self: "false",
  limit: "30",
  must_match_education: "false",
  needs_manager_exp: "false",
  notice_period: "2",
  offset: "0",
  only_top_pg_institutes: "false",
  only_top_ug_institutes: "false",
  pg_education: "0",
  salary_max: "8",
  status: "1",
  ug_education: "0",
  workex_min: "1",
};
let queryParams = $.param(query);

const getTransplieData = (data) => {
  const tData = {};
  tData.email = data.user.email;
  tData.name = data.user.full_name;
  tData.skills = data.main_skills.map((it) => it[0]);
  tData.currentCompany = data.current_company;
  tData.currentDesignation = data.current_designation;
  tData.totalExperience = data.display_total_experience;
  tData.currentLocation = data.jsp.current_location;
  tData.noticePeriod = NOTICE_PERIOD[data.jsp.notice_period];
  tData.currentSalary = data.jsp.display_salary;
  tData.latestUniversityName = data.latest_university_name;
  tData.contact = data.phone;
  tData.pastCompanies = data.previous_companies.split(",");
  tData.image = data.profile_image_src;
  tData.instahyreId = data.id;
  tData.resumeHTML = data?.resume?.html_file;
  tData.resumePdf = data?.resume?.pdf_file;
  tData.instahyreId = data.id;
  tData.expectedSalary = 0;
  tData.gitHub = data?.social?.github ? data?.social?.github.split("/")[3] : "";
  tData.linkedInProfile = data?.social?.linkedin
    ? data?.social?.linkedin.split("/")[4]
    : "";
  return tData;
};

const callToGetMetaInfo = async () => {
  const res = await fetch(url + queryParams);
  const data = await res.json();
  let meta = data.meta;
  return await new Promise((resolve) => {
    resolve(meta);
  });
};

const scrapeInstahyre = async (offset = "0") => {
  queryParams = $.param({ ...query, offset });
  const res = await fetch(url + queryParams);
  const data = await res.json();
  let transpliedData = data.objects.map((item) => item.id);
  let candidateList = data.objects;
  const socialData = await scrapeSocialProfile(transpliedData);
  candidateList = candidateList.map((item) => {
    let restOfData = socialData?.candidates[item.id];
    return getTransplieData({
      ...item,
      ...restOfData,
    });
  });
  return await new Promise((resolve) => {
    resolve(candidateList);
  });
};

$(document).ready(async function () {
  const { total_count } = await callToGetMetaInfo();
  let offset = 0;
  const limit = 30;
  for (let i = offset; i <= total_count; i += limit) {
    let time = 0;
    setTimeout(async () => {
      const list = await scrapeInstahyre(i);
      const resp = await addCandidateInfo(list);
      console.log(
        `==> : file: scrapingDataInstahyre.js : line 46 : resp`,
        resp
      );
      time++;
    }, 10000 * time);
  }
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
