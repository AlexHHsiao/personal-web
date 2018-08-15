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
exports.notifTest = functions.https.onRequest((req, res) => {
    const payload = {
        notification: {
            title: 'this is test',
            body: 'did you get my message??????'
        }
    };
    // 774914481358
    return admin.messaging().sendToDevice('774914481358', payload);
});
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
    const dbRef = admin.firestore();
    const roomID = Math.random().toString().substr(2, 6);
    const playerSelf = {
        name: null,
        role: null,
        playerID: uuidv4(),
        roomID: roomID,
        seat: null
    };
    const roomObj = {
        gameEnd: true,
        full: false,
        players: [playerSelf],
        owner: playerSelf,
        roomID: roomID,
        roomConfig: body
    };
    dbRef.collection('room').doc(roomID).set(roomObj);
    dbRef.collection('player').doc(playerSelf.playerID).set(playerSelf);
    return res.status(200).json({
        roomObj: roomObj,
        player: playerSelf,
        code: 200
    });
});
const joinRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    if (typeof body.roomID !== 'string') {
        return res.status(400).json({
            error: 'Please provide correct room id',
            code: 400
        });
    }
    const dbRef = admin.firestore();
    dbRef.collection('room').doc(body.roomID).get().then(doc => {
        if (!doc.exists) {
            return res.status(404).json({
                error: 'No such room id',
                code: 404
            });
        }
        else {
            const player = {
                name: null,
                role: null,
                playerID: uuidv4(),
                roomID: body.roomID,
                seat: null
            };
            const newRoomObj = Object.assign({}, doc.data());
            newRoomObj.players.push(player);
            if (newRoomObj.players.length === newRoomObj.roomConfig.size) {
                newRoomObj.full = true;
            }
            dbRef.collection('player').doc(player.playerID).set(player);
            dbRef.collection('room').doc(body.roomID).set(newRoomObj);
            return res.status(200).json({
                roomObj: newRoomObj,
                player: player,
                code: 200
            });
        }
    }).catch(error => {
        return res.status(503).json({
            error: error,
            code: 503
        });
    });
});
const takeSeat = (req, res) => __awaiter(this, void 0, void 0, function* () {
});
const leaveRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const playerID = req.params.player;
    if (!playerID) {
        return res.status(400).json({
            error: 'Please provide correct attribute',
            code: 400
        });
    }
    const dbRef = admin.firestore();
    dbRef.collection('player').doc(playerID).get().then(doc => {
        if (!doc.exists) {
            return res.status(404).json({
                error: 'No such player id',
                code: 404
            });
        }
        else {
            dbRef.collection('room').doc(doc.data().roomID).get().then(room => {
                if (!room.exists) {
                    return res.status(404).json({
                        error: 'This player\' room doesn\'t exist',
                        code: 404
                    });
                }
                else {
                    const newRoomObj = Object.assign({}, room.data());
                    let counter = 0;
                    for (const player of newRoomObj.players) {
                        if (player.playerID === playerID) {
                            newRoomObj.players.splice(counter, 1);
                            //======================== send push notification here to frontend
                            newRoomObj.full = false;
                            dbRef.collection('player').doc(playerID).delete();
                            dbRef.collection('room').doc(newRoomObj.roomID).set(newRoomObj);
                            return res.status(200).json({
                                code: 200
                            });
                        }
                        counter++;
                    }
                    return res.status(400).json({
                        error: 'Something went wrong',
                        code: 400
                    });
                }
            }).catch(error => {
                return res.status(503).json({
                    error: error,
                    code: 503
                });
            });
        }
    }).catch(error => {
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
app.post('/createRoom', createRoom);
app.post('/joinRoom', joinRoom);
app.post('/takeSeat', takeSeat);
app.delete('/leaveRoom/:player', leaveRoom);
//Expose Express API as a single Cloud Function:
exports.game = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map