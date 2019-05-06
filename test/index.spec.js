"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const proxyquire = require("proxyquire").noCallThru();

chai.use(require("sinon-chai"));

describe("slack-mock", function() {
  let incomingWebhooksMock;
  let loggerMock;
  let mocker;

  beforeEach(function() {
    loggerMock = {
      error: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub()
    };

    incomingWebhooksMock = {
      addResponse: sinon.stub(),
      reset: sinon.stub(),
      calls: []
    };

    mocker = proxyquire("../build/index", {
      "./mocker/incoming-webhooks": incomingWebhooksMock,
      "./lib/logger": loggerMock
    });
  });

  describe("api", function() {
    let instance;

    beforeEach(function() {
      instance = mocker();
    });

    it("should expose incoming webhooks api", function() {
      expect(instance.incomingWebhooks).to.have.keys([
        "addResponse",
        "reset",
        "calls"
      ]);
      expect(instance.incomingWebhooks.addResponse, "addResponse").to.equal(
        incomingWebhooksMock.addResponse
      );
      expect(instance.incomingWebhooks.reset, "reset").to.equal(
        incomingWebhooksMock.reset
      );
      expect(instance.incomingWebhooks.calls, "calls").to.equal(
        incomingWebhooksMock.calls
      );
    });

    it("should expose a reset method", function() {
      instance.reset();
      expect(incomingWebhooksMock.reset, "incoming webhooks").to.have.been
        .called;
    });
  });
});
