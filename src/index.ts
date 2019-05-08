"use strict";

import * as nock from "nock";
import { logger } from "./lib/logger";
import { incomingWebhooks } from "./mocker/incoming-webhooks";

export = SlackMocker;

function SlackMocker(config?: ConfigOptions): Instance {
  config = config || {};

  if (config.logLevel) {
    process.env.LOG_LEVEL = config.logLevel;
  }

  logger.info("slack-mock running");

  module.exports.instance = {
    incomingWebhooks: {
      addResponse: incomingWebhooks.addResponse,
      reset: incomingWebhooks.reset,
      calls: incomingWebhooks.calls,
      start: incomingWebhooks.start,
      shutdown: incomingWebhooks.shutdown
    },
    reset() {
      incomingWebhooks.reset();
    }
  };

  return module.exports.instance;
}

interface Instance {
  incomingWebhooks: IncomingWebhooks<any>;
  reset: () => void;
}

interface ConfigOptions {
  logLevel?: string;
}

// Incoming Webhooks

type IncomingWebhookUrl = string;
type IncomingWebhookHttpHeaders = nock.HttpHeaders;

interface IncomingWebhooks<T> {
  addResponse: (opts: IncomingWebhookOptions<T>) => void;
  reset: () => void;
  shutdown: () => void;
  start: () => void;
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
