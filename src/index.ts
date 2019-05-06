"use strict";

import * as nock from "nock";
import { logger } from "./lib/logger";
import * as incomingWebhooks from "./mocker/incoming-webhooks";

// module.exports.instance as Instance;

module.exports = (config: { rtmPort?: number; logLevel?: string }) => {
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

interface Instance {
  incomingWebhooks: IncomingWebhooks<any>;
  reset: () => void;
}
// Incoming Webhooks

type IncomingWebhookUrl = string;
type IncomingWebhookHttpHeaders = nock.HttpHeaders;

interface IncomingWebhooks<T> {
  addResponse: (opts: IncomingWebhookOptions<T>) => void;
  reset: () => void;
  calls: Array<IncomingWebhookCall<T>>;
}

interface IncomingWebhookOptions<T> {
  url?: IncomingWebhookUrl;
  statusCode?: number;
  body?: T;
  headers?: IncomingWebhookHttpHeaders;
}

interface IncomingWebhookCall<T> {
  url: IncomingWebhookUrl;
  params: T;
  headers: IncomingWebhookHttpHeaders;
}
