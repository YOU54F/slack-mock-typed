"use strict";
const logger_1 = require("./lib/logger");
// tslint:disable-next-line: prefer-const
let instance;
function SlackMocker(config) {
    config = config || {};
    if (config.logLevel) {
        logger_1.logger.level = config.logLevel;
    }
    logger_1.logger.info("slack-mock running");
    return instance;
}
module.exports = SlackMocker;
