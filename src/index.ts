"use strict";

import logger = require("./lib/logger");
import incomingWebhooks = require("./mocker/incoming-webhooks");

module.exports.instance;

module.exports = function(config) {
  if (module.exports.instance) {
    return module.exports.instance;
  }

  config = config || {};

  if (config.logLevel) {
    logger.level = config.logLevel;
  }

  logger.info("slack-mock running");

  module.exports.instance = {
    incomingWebhooks: {
      addResponse: incomingWebhooks.addResponse,
      reset: incomingWebhooks.reset,
      calls: incomingWebhooks.calls
    },
    reset() {
      incomingWebhooks.reset();
    }
  };

  return module.exports.instance;
};
