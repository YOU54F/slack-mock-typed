"use strict";

const incomingWebhooks = module.exports as IncomingWebhooks<[]>;
import * as nock from "nock";
import * as customResponses from "../lib/custom-responses";
import { logger } from "../lib/logger";
import parseParams from "../lib/utils";
const baseUrl = "https://hooks.slack.com";

type IncomingWebhookUrl = string;
type IncomingWebhookHttpHeaders = nock.HttpHeaders;

// Slack accepts both GET and POST requests, will intercept API and OAuth calls
nock(baseUrl)
  .persist()
  .post(/.*/, () => true)
  .reply(reply);

export function calls() {
  return [] as Array<IncomingWebhookCall<[]>>;
}

export function reset() {
  logger.debug(`resetting incoming-webhooks`);

  customResponses.reset("incoming-webhooks");
  incomingWebhooks.calls.splice(0, incomingWebhooks.calls.length);
}

export function addResponse(opts: {
  url: IncomingWebhookUrl;
  statusCode: number;
  body: [];
  headers: IncomingWebhookHttpHeaders;
}) {
  customResponses.set("incoming-webhooks", opts);
}

function reply(path: string, requestBody: string) {
  const url = `${baseUrl}${path}`;

  logger.debug(`intercepted incoming-webhooks request`);

  incomingWebhooks.calls.push({
    url,
    params: parseParams(path, requestBody) as [],
    headers: this.req.headers
  });

  return customResponses.get("incoming-webhooks", url);
}

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
