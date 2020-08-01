// import admin from 'firebase-admin';
const admin = require('firebase-admin');
// eslint-disable-next-line import/no-unresolved
// import serviceAccount from '../serviceAccount';
const serviceAccount = require('../serviceAccount');

var firestore = null;
// export function initializeFirebase() {
module.exports.initializeFirebase = function () {
  return new Promise((resolve) => {
    const firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firestore = admin.firestore();
    resolve({ app: firebaseApp, firestore: firestore });
  });
}

// export { firestore };
module.exports.firestore = firestore;