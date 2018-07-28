import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Room, Player, RoomConfig, RoleSize} from './model/game';

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
const createRoom = async (req, res) => {
  let body: RoomConfig = req.body;

  if (Object.keys(body).length < RoleSize || body.villager
) {
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
  } else {
    res.sendStatus(200);
  }
};

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
//app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/', (req, res) => {
  //res.send(controller.createRoom(req.params.id));
  res.status(500).json({error: 'aaaaaa'});
  //res.json({error: 'aaaaaa'});
  //res.send({error: 'aaaaaa'});
  //res.sendStatus(200);
});

app.post('/createRoom', createRoom);

//Expose Express API as a single Cloud Function:
exports.game = functions.https.onRequest(app);
