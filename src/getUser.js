const path = require('path');
const getUser = (token) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './data/accounts.json'), (err, data) => {
      if(!err) {
        let accountData = JSON.parse(data);
        accountData.forEach(a => {
          if(a.token === token) {
            resolve({email: a.email, ...a.data});
          }
        });
        reject(false);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = { getUser }