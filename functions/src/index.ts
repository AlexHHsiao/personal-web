import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Room, Player, RoomConfig, MinRoomSize} from './model/game';

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

// fire storage functions

exports.createUser = functions.firestore
  .document('img/{userId}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    // access a particular field as you would any JS property
    console.log(newValue);

    // perform desired operations ...
  });


// express functions
const createRoom = async (req, res) => {
  const body: RoomConfig = req.body;

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
    || body.size < MinRoomSize) {
    return res.status(400).json({
      error: 'Werewolf, villager, or seer cannot be less than 2, ' +
        'and group size must be more than ' + MinRoomSize,
      code: 400
    });
  }

  const dbRef = admin.firestore();
  const roomID = Math.random().toString().substr(2, 6);

  const playerSelf: Player = {
    name: null,
    role: null,
    playerID: uuidv4(),
    roomID: roomID,
    seat: null
  };

  const roomObj: Room = {
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
};

const joinRoom = async (req, res) => {
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
    } else {

      const player: Player = {
        name: null,
        role: null,
        playerID: uuidv4(),
        roomID: body.roomID,
        seat: null
      };

      const newRoomObj = {...doc.data()};
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
};

/*const takeSeat = async (req, res) => {

};*/

const leaveRoom = async (req, res) => {

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
    } else {

      dbRef.collection('room').doc(doc.data().roomID).get().then(room => {
        if (!room.exists) {
          return res.status(404).json({
            error: 'This player\' room doesn\'t exist',
            code: 404
          });
        } else {
          const newRoomObj = {...room.data()};

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
};

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// Add middleware to authenticate requests
//app.use(myMiddleware);

// build multiple CRUD interfaces:
app.post('/createRoom', createRoom);
app.post('/joinRoom', joinRoom);
//app.post('/takeSeat', takeSeat);
app.delete('/leaveRoom/:player', leaveRoom);

//Expose Express API as a single Cloud Function:
exports.game = functions.https.onRequest(app);
