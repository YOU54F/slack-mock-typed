"use strict";

const incomingWebhooks = module.exports;
import nock = require("nock");
import customResponses = require("../lib/custom-responses");
import logger = require("../lib/logger");
import utils = require("../lib/utils");
const baseUrl = "https://hooks.slack.com";

// Slack accepts both GET and POST requests, will intercept API and OAuth calls
nock(baseUrl)
  .persist()
  .post(/.*/, () => true)
  .reply(reply);

incomingWebhooks.calls = [];

incomingWebhooks.reset = function() {
  logger.debug(`resetting incoming-webhooks`);

  customResponses.reset("incoming-webhooks");
  incomingWebhooks.calls.splice(0, incomingWebhooks.calls.length);
};

incomingWebhooks.addResponse = function(opts) {
  customResponses.set("incoming-webhooks", opts);
};

function reply(path, requestBody) {
  const url = `${baseUrl}${path}`;

  logger.debug(`intercepted incoming-webhooks request`);

  incomingWebhooks.calls.push({
    url,
    params: utils.parseParams(path, requestBody),
    headers: this.req.headers
  });

  return customResponses.get("incoming-webhooks", url);
}
