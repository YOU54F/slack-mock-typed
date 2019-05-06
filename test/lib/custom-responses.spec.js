"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const proxyquire = require("proxyquire").noCallThru();

chai.use(require("sinon-chai"));

describe("custom responses", function() {
  let loggerMock;
  let customResponses;

  before(function() {
    loggerMock = {
      error: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub()
    };

    customResponses = proxyquire("../../build/lib/custom-responses", {
      "../../build/lib/logger": loggerMock
    });
  });

  beforeEach(function() {
    loggerMock.error.reset();
    loggerMock.info.reset();
    loggerMock.debug.reset();

    customResponses.resetAll();
  });

  describe("set", function() {
    it("should default body to OK", function() {
      const opts = {
        url: "set.walter.white",
        statusCode: 404
      };

      customResponses.set("incoming-webhooks", opts);
      expect(
        customResponses.get("incoming-webhooks", "set.walter.white")[1]
      ).to.equal("OK");
    });
  });

  describe("get", function() {
    it("should get a default response", function() {
      expect(
        customResponses.get("incoming-webhooks", "get.walter.white")
      ).to.deep.equal([200, "OK", {}]);
    });
  });

  describe("reset", function() {
    it("should clear responses for a type", function() {

      customResponses.set("incoming-webhooks", {
        url: "reset.walter.white",
        statusCode: 202
      });

      expect(
        customResponses.get("incoming-webhooks", "reset.walter.white")[0]
      ).to.equal(202);
    });
  });

  describe("resetAll", function() {
    beforeEach(function() {});

    it("should clear responses for all types", function() {
      customResponses.set("incoming-webhooks", {
        url: "reset.walter.white",
        statusCode: 202
      });

      customResponses.resetAll();

      expect(
        customResponses.get("incoming-webhooks", "reset.walter.white")[0]
      ).to.equal(200);
    });
  });
});
