/* global OT API_KEY TOKEN SESSION_ID SAMPLE_SERVER_BASE_URL */

/* eslint-disable no-unused-vars */
// Make a copy of this file and save it as config.js (in the js directory).

// Set this to the base URL of your sample server, such as 'https://your-app-name.herokuapp.com'.
// Do not include the trailing slash. See the README for more information:

var SAMPLE_SERVER_BASE_URL = 'http://localhost';

// OR, if you have not set up a web server that runs the learning-opentok-php code,
// set these values to OpenTok API key, a valid session ID, and a token for the session.
// For test purposes, you can obtain these from https://tokbox.com/account.

var API_KEY = '47238554';
var SESSION_ID = '1_MX40NzIzODU1NH5-MTYyMjA0OTExMTg0OH5BcXhVNGgwU2d4NTY1Q09xNk9SRTlzVXd-fg';
var TOKEN = 'T1==cGFydG5lcl9pZD00NzIzODU1NCZzaWc9NTE5YjkwZDNjYWZmYmMyMzg5YWU5NGM5MjJkNWE2ZGE2ZTI5NWY3MjpzZXNzaW9uX2lkPTFfTVg0ME56SXpPRFUxTkg1LU1UWXlNakEwT1RFeE1UZzBPSDVCY1hoVk5HZ3dVMmQ0TlRZMVEwOXhOazlTUlRselZYZC1mZyZjcmVhdGVfdGltZT0xNjIyMDQ5MTI3Jm5vbmNlPTAuMzcyMDcyMzE3OTUxOTI4NSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjIyMTA2NzYyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';



var apiKey;
var sessionId;
var token;

function handleError(error) {
  if (error) {
    console.error(error);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function streamCreated(event) {
    var subscriberOptions = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    session.subscribe(event.stream, 'subscriber', subscriberOptions, handleError);
  });

  session.on('sessionDisconnected', function sessionDisconnected(event) {
    console.log('You were disconnected from the session.', event.reason);
  });

  // initialize the publisher
  var publisherOptions = {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  };
  var publisher = OT.initPublisher('publisher', publisherOptions, handleError);

  // Connect to the session
  session.connect(token, function callback(error) {
    if (error) {
      handleError(error);
    } else {
      // If the connection is successful, publish the publisher to the session
      session.publish(publisher, handleError);
    }
  });
}

// See the config.js file.
if (API_KEY && TOKEN && SESSION_ID) {
  apiKey = API_KEY;
  sessionId = SESSION_ID;
  token = TOKEN;
  initializeSession();
} else if (SAMPLE_SERVER_BASE_URL) {
  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
  fetch(SAMPLE_SERVER_BASE_URL + '/session').then(function fetch(res) {
    return res.json();
  }).then(function fetchJson(json) {
    apiKey = json.apiKey;
    sessionId = json.sessionId;
    token = json.token;

    initializeSession();
  }).catch(function catchErr(error) {
    handleError(error);
    alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
  });
}