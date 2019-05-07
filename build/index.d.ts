import { IncomingHttpHeaders } from "http";
import * as nock from "nock";

export = SlackMocker;

declare function SlackMocker(
  config?: SlackMocker.ConfigOptions
): SlackMocker.Instance;

declare namespace SlackMocker {
  let instance: Instance;

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
}
