import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const express = require('express');
const cors = require('cors');
const uuidv4 = require('uuid/v4');
const app = express();

// testing purpose
export const helloWorld = functions.https.onRequest((request, response) => {
  console.log(uuidv4());
  console.log(uuidv4());
  //response.send(new Player('12', 'haha', 'safasf'));
});


// express functions

const getGallery = async (req, res) => {
  const dbRef = admin.firestore();

  dbRef.collection('profile').get().then(snapshot => {
    let galleryCollection = [];

    snapshot.forEach(doc => {
      galleryCollection.push(doc.data());
    });

    return res.status(200).json({
      success: galleryCollection,
      code: 200
    });
  })
    .catch(error => {
      return res.status(503).json({
        error: error,
        code: 503
      });
    });
};

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// Add middleware to authenticate requests
//app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/gallery', getGallery);

//Expose Express API as a single Cloud Function:
exports.personal = functions.https.onRequest(app);
