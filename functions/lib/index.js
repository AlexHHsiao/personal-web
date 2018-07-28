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
const game_1 = require("./model/game");
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
const createRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let body = req.body;
    if (Object.keys(body).length < game_1.RoleSize || body.villager) {
        return res.status(400).json({
            error: "Please provide correct body attribute",
            code: 400
        });
    }
    if (body.werewolf < 1 || body.villager < 1 || body.seer < 1) {
        return res.status(400).json({
            error: "Werewolf, villager, or seer cannot be less than 1",
            code: 400
        });
    }
    else {
        res.sendStatus(200);
    }
});
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
// Add middleware to authenticate requests
//app.use(myMiddleware);
// build multiple CRUD interfaces:
app.get('/', (req, res) => {
    //res.send(controller.createRoom(req.params.id));
    res.status(500).json({ error: 'aaaaaa' });
    //res.json({error: 'aaaaaa'});
    //res.send({error: 'aaaaaa'});
    //res.sendStatus(200);
});
app.post('/createRoom', createRoom);
//Expose Express API as a single Cloud Function:
exports.game = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map