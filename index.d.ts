import { IncomingWebhooks } from "./mocker/incoming-webhooks";
export declare function SlackMocker(config?: ConfigOptions): Instance;
export interface Instance {
    incomingWebhooks: IncomingWebhooks<any>;
    reset: () => void;
}
export interface ConfigOptions {
    logLevel?: string;
}
