"use strict";
import { logger } from "./lib/logger";
import { incomingWebhooks, IncomingWebhooks } from "./mocker/incoming-webhooks";

export function SlackMocker(config?: ConfigOptions): Instance {
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
      start: incomingWebhooks.start
    },
    reset() {
      incomingWebhooks.reset();
    }
  };

  return module.exports.instance;
}

export interface Instance {
  incomingWebhooks: IncomingWebhooks<any>;
  reset: () => void;
}

export interface ConfigOptions {
  logLevel?: string;
}
