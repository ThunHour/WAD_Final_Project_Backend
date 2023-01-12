import firebaseAdmin from "firebase-admin";

const ServiceAccount = require("./storage.json");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(ServiceAccount),
});

module.exports = () => {
  return admin.storage().bucket("wad-final-image-storage.appspot.com");
};
