"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const SlackMocker = require("./incoming-webhooks");
let mock;
function sendToUrl(url, body, cb) {
    request({
        method: "POST",
        uri: url,
        json: true,
        body
    }, cb);
}
function setup() {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        jest.setTimeout(60000);
        yield SlackMocker.incomingWebhooks.start;
        mock = yield SlackMocker.incomingWebhooks;
        // await mock.reset();
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        jest.resetModules();
        yield mock.reset();
        expect(mock.calls).toHaveLength(0);
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        // await mock.reset();
        // expect(mock.calls).toHaveLength(0);
    }));
}
describe("calls", () => {
    setup();
    let url;
    url = "https://hooks.slack.com/calls";
    it("should record calls", done => {
        const body = {
            walter: "white"
        };
        sendToUrl(url, body, () => {
            expect(mock.calls).toHaveLength(1);
            const firstCall = mock.calls[0];
            expect(firstCall).toMatchObject({
                headers: {},
                params: { walter: "white" },
                url: "https://hooks.slack.com/calls"
            });
            expect(firstCall.url).toEqual(url);
            expect(firstCall.params).toMatchObject({ walter: "white" });
            expect(firstCall.headers).toEqual({});
            done();
        });
    });
    it("should record a slack json object as application/x-www-form-urlencoded", done => {
        const formBody = { walter: "white" };
        request({
            method: "POST",
            uri: url,
            form: formBody
        }, () => {
            expect(mock.calls).toHaveLength(1);
            const firstCall = mock.calls[0];
            expect(firstCall.params).toEqual("walter=white");
            done();
        });
    });
});
describe("reset", () => {
    setup();
    let url;
    url = "https://hooks.slack.com/reset";
    it("should reset call count", done => {
        const body = {
            walter: "white"
        };
        sendToUrl(url, {}, () => {
            expect(mock.calls).toHaveLength(1);
            mock.reset();
            expect(mock.calls).toHaveLength(0);
            done();
        });
    });
});
