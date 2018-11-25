"use strict";
const webhook = require('WebHookDialogFlow');
const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/action", function(req, res) {
  // const result = await webhook.do_action(req);
  var speech = 
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "point-bank-bot"
  });
});
//test CI-CD


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
