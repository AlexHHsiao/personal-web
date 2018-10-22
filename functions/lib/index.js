"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const express = require('express');
const cors = require('cors');
const uuidv4 = require('uuid/v4');
const app = express();
// testing purpose
exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log(uuidv4());
    console.log(uuidv4());
    //response.send(new Player('12', 'haha', 'safasf'));
});
// express functions
const getGallery = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
});
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
// Add middleware to authenticate requests
//app.use(myMiddleware);
// build multiple CRUD interfaces:
app.get('/gallery', getGallery);
//Expose Express API as a single Cloud Function:
exports.personal = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map