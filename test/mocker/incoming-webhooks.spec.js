"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const proxyquire = require("proxyquire").noCallThru();
const request = require("request");

chai.use(require("sinon-chai"));

describe("mocker: incoming webhooks", function() {
  let loggerMock;
  let incomingWebhooks;
  let utilsMock;
  let customResponsesMock;

  before(function() {
    loggerMock = {
      error: sinon.stub(),
      info: sinon.stub(),
      debug: sinon.stub()
    };

    customResponsesMock = {
      get: sinon.stub(),
      reset: sinon.stub(),
      set: sinon.stub()
    };

    utilsMock = {
      parseParams: sinon.stub()
    };

    // I ran into some weird scoping issues by redefining this in a beforeEach
    // moving to a before() fixed them
    incomingWebhooks = proxyquire("../../build/mocker/incoming-webhooks", {
      "../../build/lib/logger": loggerMock,
      "../../build/lib/custom-responses": customResponsesMock,
      "../../build/lib/utils": utilsMock
    });
  });

  beforeEach(function() {
    loggerMock.error.reset();
    loggerMock.info.reset();
    loggerMock.debug.reset();

    utilsMock.parseParams.reset();
    utilsMock.parseParams.returns({ parsed: "body" });

    customResponsesMock.get.reset();
    customResponsesMock.set.reset();
    customResponsesMock.reset.reset();
    customResponsesMock.get.returns(200, "OK", {});
    incomingWebhooks.start()
    incomingWebhooks.reset();
  });

  function sendToUrl(url, body, cb) {
    request(
      {
        method: "POST",
        uri: url,
        json: true,
        body: body
      },
      cb
    );
  }

  describe("calls", function() {
    let url;

    beforeEach(function() {
      url = "https://hooks.slack.com/calls";
    });

    it("should record calls", function(done) {
      const body = {
        walter: "white"
      };

      sendToUrl(url, body, () => {
        expect(incomingWebhooks.calls).to.have.length(1);

        const firstCall = incomingWebhooks.calls[0];
        expect(firstCall).to.have.keys(["url", "params", "headers"]);
        expect(firstCall.url).to.equal(url);
        expect(firstCall.params).to.deep.equal({ walter: "white" });
        expect(firstCall.headers).to.exist;

        done();
      });
    });

    it("should record a slack json object as application/x-www-form-urlencoded", function(done) {
      const formBody = {
        walter: "white"
      };

      request(
        {
          method: "POST",
          uri: url,
          form: formBody
        },
        () => {
          expect(incomingWebhooks.calls).to.have.length(1);
          const firstCall = incomingWebhooks.calls[0];
          expect(firstCall.params).to.deep.equal("walter=white");

          done();
        }
      );
    });
  });

  describe("reset", function() {
    let url;

    beforeEach(function() {
      url = "https://hooks.slack.com/reset";
    });

    it("should reset call count", function(done) {
      sendToUrl(url, {}, () => {
        expect(incomingWebhooks.calls).to.have.length(1);
        incomingWebhooks.reset();
        expect(incomingWebhooks.calls).to.have.length(0);

        done();
      });
    });
  });

  describe.only("shut down", function() {
    let url;

    beforeEach(function() {
      url = "https://hooks.slack.com/reset";
    });

    it("should fail to receive a call as the nock is not running", function(done) {


      sendToUrl(url, {}, () => {
        expect(incomingWebhooks.calls).to.have.length(1);
        incomingWebhooks.reset();
        expect(incomingWebhooks.calls).to.have.length(0);

        done();
      });
    });
  });

});
