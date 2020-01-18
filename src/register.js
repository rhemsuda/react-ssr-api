const path = require('path');
const register = (accountData) => {
  return new Promise((resolve, reject) => {
    let newAccount = {
      token: uuidv4(),
      accountType: accountData.accountType,
      email: accountData.email,
      password: accountData.password,
      data: {
        name: accountData.name,
        address: accountData.address,
        city: accountData.city,
        province: accountData.province,
        postalCode: accountData.postalCode,
        dateOfBirth: accountData.dateOfBirth,
        phoneNumber: accountData.phoneNumber,
        tos: accountData.tos,
        subscribe: accountData.subscribe
      }
    }

    let filePath = path.join(__dirname, './data/accounts.json');
    fs.readFile(filePath, (err, data) => {
      if(!err) {
        let accountData = JSON.parse(data);
        if(!accountData.find(a => a.email === newAccount.email)) {
          accountData.push(newAccount);
          fs.writeFile(filePath, JSON.stringify(accountData, null, 2), (err, data) => {
            if(!err) {
              resolve({token: newAccount.token})
            } else {
              reject({code: 0x00, message: err});
            }
          })
        } else {
          reject({code: 0x01, message: 'email already registered'});
        }      
      } else {
        reject({code: 0x00, message: err});
      }
    });
  });
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = { register }