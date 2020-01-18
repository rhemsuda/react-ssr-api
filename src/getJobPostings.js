const path = require('path');
const getJobPostings = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './data/jobPostings.json'), (err, data) => {
      if(!err) {
        let postingData = JSON.parse(data);
        resolve(postingData);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = { getJobPostings }