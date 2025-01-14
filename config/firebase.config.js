const Firebase = require('firebase-admin');
const serviceAccount = require ('../drive-e618a-firebase-adminsdk-slooc-f808f6ba67.json');
const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket:'drive-e618a.firebasestorage.app'
})
module.exports = Firebase;