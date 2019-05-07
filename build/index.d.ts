import * as nock from "nock";
export = SlackMocker;
declare function SlackMocker(config: ConfigOptions): Instance;
interface Instance {
    incomingWebhooks: IncomingWebhooks<any>;
    reset: () => void;
}
interface ConfigOptions {
    rtmPort?: number;
    logLevel?: string;
}
declare type IncomingWebhookUrl = string;
declare type IncomingWebhookHttpHeaders = nock.HttpHeaders;
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
