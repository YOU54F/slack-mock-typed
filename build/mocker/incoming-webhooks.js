"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomingWebhooks = module.exports;
const nock = require("nock");
const customResponses = require("../lib/custom-responses");
const logger_1 = require("../lib/logger");
const utils_1 = require("../lib/utils");
const baseUrl = "https://hooks.slack.com";
// Slack accepts both GET and POST requests, will intercept API and OAuth calls
exports.incomingWebhooks.start = () => {
    logger_1.logger.info(`starting mock`);
    nock(baseUrl)
        .persist()
        .post(/.*/, () => true)
        .reply(reply);
};
exports.incomingWebhooks.calls = [];
exports.incomingWebhooks.reset = () => {
    logger_1.logger.debug(`resetting incoming-webhooks`);
    customResponses.reset("incoming-webhooks");
    exports.incomingWebhooks.calls.splice(0, exports.incomingWebhooks.calls.length);
};
exports.incomingWebhooks.addResponse = opts => {
    logger_1.logger.debug(`adding incoming-webhook response` + opts);
    customResponses.set("incoming-webhooks", opts);
};
exports.incomingWebhooks.shutdown = () => {
    logger_1.logger.info(`shutting down incoming-webhooks`);
    nock.cleanAll();
    nock.restore();
};
function reply(path, requestBody) {
    const url = `${baseUrl}${path}`;
    logger_1.logger.debug(`intercepted incoming-webhooks request`);
    exports.incomingWebhooks.calls.push({
        url,
        params: utils_1.default(path, requestBody),
        headers: {}
    });
    return customResponses.get("incoming-webhooks", url);
}
