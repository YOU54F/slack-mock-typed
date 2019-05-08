"use strict";

import * as proxyquire from "proxyquire";
import * as sinon from "sinon";

describe("custom responses", () => {
  let loggerMock: any;
  let customResponses: any;

  beforeEach(() => {
    loggerMock = {
      error: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub()
    };

    customResponses = proxyquire("./custom-responses.ts", {
      "./logger": loggerMock
    });
  });

  beforeEach(() => {
    loggerMock.error.reset();
    loggerMock.info.reset();
    loggerMock.debug.reset();

    customResponses.resetAll();
  });

  describe("set", () => {
    it("should default body to OK", () => {
      const opts = {
        url: "set.walter.white",
        statusCode: 404
      };

      customResponses.set("incoming-webhooks", opts);
      expect(
        customResponses.get("incoming-webhooks", "set.walter.white")[1]
      ).toEqual("OK");
    });
  });

  describe("get", () => {
    it("should get a default response", () => {
      expect(
        customResponses.get("incoming-webhooks", "get.walter.white")
      ).toMatchObject([200, "OK", {}]);
    });
  });

  describe("reset", () => {
    it("should clear responses for a type", () => {
      customResponses.set("incoming-webhooks", {
        url: "reset.walter.white",
        statusCode: 202
      });

      expect(
        customResponses.get("incoming-webhooks", "reset.walter.white")[0]
      ).toEqual(202);
    });
  });

  describe("resetAll", () => {
    it("should clear responses for all types", () => {
      customResponses.set("incoming-webhooks", {
        url: "reset.walter.white",
        statusCode: 202
      });

      customResponses.resetAll();

      expect(
        customResponses.get("incoming-webhooks", "reset.walter.white")[0]
      ).toEqual(200);
    });
  });
});
