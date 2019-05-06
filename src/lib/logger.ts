// "use strict";

// import winston = require("winston");
// export { logger };

// // log levels: error, warn, info, verbose, debug, silly

// export default function logger(loglevel: string) {
//   return new winston.Logger({
//     transports: [
//       new winston.transports.Console({
//         // handle logging uncaughtException
//         handleExceptions: true,
//         humanReadableUnhandledException: true,
//         formatter: options => {
//           let message = options.message ? options.message : "";

//           if (options.meta) {
//             if (options.meta.stack) {
//               message += `\n ${
//                 Array.isArray(options.meta.stack)
//                   ? options.meta.stack.join("\n")
//                   : options.meta.stack
//               }`;
//             } else if (Object.keys(options.meta).length) {
//               message += `\n${JSON.stringify(options.meta, null, 2)}`;
//             }
//           }

//           return `slack-mock ${options.level.toUpperCase()} ${message}`;
//         }
//       })
//     ]
//   });
// }

import { Logger, LoggerInstance, LoggerOptions, transports } from "winston";

const defaultLevel = process.env.LOG_LEVEL;

const options: LoggerOptions = {
  handleExceptions: true,
  humanReadableUnhandledException: true,
  level: defaultLevel,
  transports: [
    new transports.Console({
      colorize: true,
      showLevel: true,
      timestamp: true,
      name: "slack-mock",
      level: "info"
    })
  ]
};

const logger: LoggerInstance = new Logger(options);

export { logger };
