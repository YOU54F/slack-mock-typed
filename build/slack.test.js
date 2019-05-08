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
const SlackMocker = require("./mocker/incoming-webhooks");
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
        const formBody = { "text": "cypress-slack-reporter test run passed\nThis run was triggered by <https://bitbucket.org/YOU54F/cypress-slack-reporter/commits/46ad90a811a08af87fe26c35a1be710dbb486acc|YOU54F>", "attachments": [{ "color": "#36a64f", "fallback": "Report available at https://circleci.com/api/v1.1/project/bitbucket/YOU54F/cypress-slack-reporter/157/artifacts/0/root/app/src/slack/test/jsonTestPass/sampleReport.html", "text": "Branch: master\nTotal Passed:  18", "actions": [{ "type": "button", "text": "Test Report", "url": "https://circleci.com/api/v1.1/project/bitbucket/YOU54F/cypress-slack-reporter/157/artifacts/0/root/app/src/slack/test/jsonTestPass/sampleReport.html", "style": "primary" }, { "type": "button", "text": "CircleCI Logs", "url": "https://circleci.com/gh/YOU54F/cypress-slack-reporter/157", "style": "primary" }] }, { "text": "<https://circleci.com/api/v1.1/project/bitbucket/YOU54F/cypress-slack-reporter/157/artifacts/0/root/app/src/slack/test/videosDirPopulated/small.mp4|Video:- small.mp4>\n<https://circleci.com/api/v1.1/project/bitbucket/YOU54F/cypress-slack-reporter/157/artifacts/0/root/app/src/slack/test/screenshotDirPopulated/pnggrad16rgb.png|Screenshot:- pnggrad16rgb.png>\n", "color": "#36a64f" }], "unfurl_links": false, "unfurl_media": false };
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
