'use strict';
const logger_1 = require("./lib/logger");
const incoming_webhooks_1 = require("./mocker/incoming-webhooks");
function SlackMocker(config) {
    config = config || {};
    if (config.logLevel) {
        process.env.LOG_LEVEL = config.logLevel;
    }
    logger_1.logger.info('slack-mock running');
    module.exports.instance = {
        incomingWebhooks: {
            addResponse: incoming_webhooks_1.incomingWebhooks.addResponse,
            reset: incoming_webhooks_1.incomingWebhooks.reset,
            calls: incoming_webhooks_1.incomingWebhooks.calls,
            start: incoming_webhooks_1.incomingWebhooks.start,
            shutdown: incoming_webhooks_1.incomingWebhooks.shutdown
        },
        reset() {
            incoming_webhooks_1.incomingWebhooks.reset();
        }
    };
    return module.exports.instance;
}
module.exports = SlackMocker;
