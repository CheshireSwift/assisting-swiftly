'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// action name from Dialogflow intent
const STATE_ACTION = 'change_state';

// parameters from intent
const DEVICE_ARGUMENT = 'device';
const DEVICE_STATE_ARGUMENT = 'device_state';

exports.assistingSwiftly = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function changeDeviceState(app) {
    const device = app.getArgument(DEVICE_ARGUMENT);
    const deviceState = app.getArgument(DEVICE_STATE_ARGUMENT) || 'toggle';
    app.tell(`Okay, I will ${deviceState} the ${device}`);
  }

  // action map, for intent names to functions
  const actionMap = new Map();
  actionMap.set(STATE_ACTION, changeDeviceState);

  app.handleRequest(actionMap);
})
