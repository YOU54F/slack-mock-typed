"use strict";

import * as nock from "nock";
import { logger } from "./lib/logger";

// tslint:disable-next-line: prefer-const
let instance: Instance;

export = SlackMocker;

function SlackMocker(config: ConfigOptions) {
  config = config || {};

  if (config.logLevel) {
    logger.level = config.logLevel;
  }

  logger.info("slack-mock running");

  return instance;
}

interface Instance {
  incomingWebhooks: IncomingWebhooks<any>;
  reset: () => void;
}

interface ConfigOptions {
  rtmPort?: number;
  logLevel?: string;
}

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
