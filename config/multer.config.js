const multer = require('multer');
const firebaseStorage = require("multer-firebase-storage");
const firebase = require('./firebase.config');
const serviceAccount = require('../drive-e618a-firebase-adminsdk-slooc-f808f6ba67.json');
const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName:'drive-e618a.firebasestorage.app',
    unique: true
})
const upload = multer({
    storage:storage
})
module.exports = upload;