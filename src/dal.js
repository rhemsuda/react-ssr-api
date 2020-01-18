const admin = require('firebase-admin');
const serviceAccount = require('../serviceKey.json');
global.fs = require('fs');

const initializeFirestore = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  global.db = admin.firestore();
}

module.exports = { initializeFirestore }