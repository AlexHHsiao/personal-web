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
//&& body.witchSaveSelf
//!(body.werewolf && body.villager && body.seer && body.size)
// express functions
const createRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    // check necessary attribute
    if (typeof body.werewolf !== 'number'
        || typeof body.seer !== 'number'
        || typeof body.villager !== 'number'
        || typeof body.size !== 'number'
        || typeof body.fool !== 'number'
        || typeof body.hunter !== 'number'
        || typeof body.witch !== 'number'
        || typeof body.guard !== 'number'
        || typeof body.witchSaveSelf !== 'boolean') {
        return res.status(400).json({
            error: 'Please provide correct body attribute',
            code: 400
        });
    }
    // necessary attribute value must be correct
    if (body.werewolf < 2
        || body.villager < 2
        || body.seer < 2
        || body.size < game_1.MinRoomSize) {
        return res.status(400).json({
            error: 'Werewolf, villager, or seer cannot be less than 2, ' +
                'and group size must be more than ' + game_1.MinRoomSize,
            code: 400
        });
    }
    const roomRef = admin.firestore().collection('room');
    const roomID = Math.random().toString().substr(2, 6);
    const roomObj = {
        gameEnd: false,
        full: false,
        players: [],
        roomID: roomID,
        roomConfig: body
    };
    roomRef.doc(roomID).set(roomObj);
    return res.status(200).json({
        roomObj: roomObj,
        code: 200
    });
});
const joinRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    if (typeof body.roomID !== 'number') {
        return res.status(400).json({
            error: 'Please provide correct room id',
            code: 400
        });
    }
    return res.status(200).json({
        code: 200
    });
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
app.post('/joinRoom', joinRoom);
//Expose Express API as a single Cloud Function:
exports.game = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map