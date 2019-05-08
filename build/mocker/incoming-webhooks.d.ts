export declare const incomingWebhooks: IncomingWebhooks<[]>;
import * as nock from "nock";
declare type IncomingWebhookUrl = string;
declare type IncomingWebhookHttpHeaders = nock.HttpHeaders;
interface IncomingWebhooks<T> {
    addResponse: (opts: IncomingWebhookOptions<T>) => void;
    reset: () => void;
    start: () => void;
    shutdown: () => void;
    calls: Array<IncomingWebhookCall<T>>;
}
interface IncomingWebhookOptions<T> {
    url: IncomingWebhookUrl;
    statusCode: number;
    body: T;
    headers: IncomingWebhookHttpHeaders;
}
interface IncomingWebhookCall<T> {
    url: IncomingWebhookUrl;
    params: T;
    headers: IncomingWebhookHttpHeaders;
}
export {};
