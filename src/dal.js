const admin = require('firebase-admin');
const serviceAccount = require('../serviceKey.json');

const initializeFirestore = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  global.db = admin.firestore();
}

module.exports = { initializeFirestore }