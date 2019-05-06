"use strict";

import qs = require("qs");
import { logger } from "./logger";

export default function parseParams(path: string, requestBody: string) {
  let body: {} = requestBody;
  let queryString: {} = {};
  const pathParts = path.split("?");

  if (typeof requestBody === "string") {
    // parses content-type application/x-www-form-urlencoded
    logger.debug(
      `parsing application/x-www-form-urlencoded body: ${requestBody}`
    );
    body = qs.parse(requestBody);
  }

  if (pathParts[1]) {
    // query params from a GET request
    logger.debug(`parsing query parameters: ${pathParts[1]}`);
    queryString = qs.parse(`${pathParts[1]}`);
    typedKeys(queryString).forEach(key => {
      body[key] = queryString[key];
    });
  }

  function typedKeys<T>(o: T): Array<keyof T> {
    // type cast should be safe because that's what really Object.keys() does
    return Object.keys(o) as Array<keyof T>;
  }

  return body;
}
