import * as request from "request";
import * as SlackMocker from "./incoming-webhooks";

let mock: any;

function sendToUrl(url: string, body: {}, cb: any) {
  request(
    {
      method: "POST",
      uri: url,
      json: true,
      body
    },
    cb
  );
}

function setup() {
  beforeAll(async () => {
    jest.setTimeout(60000);
    await SlackMocker.incomingWebhooks.start;
    mock = await SlackMocker.incomingWebhooks;
    // await mock.reset();
  });

  beforeEach(async () => {
    jest.resetModules();
    await mock.reset();
    expect(mock.calls).toHaveLength(0);
  });
  afterEach(async () => {
    // await mock.reset();
    // expect(mock.calls).toHaveLength(0);
  });
}

describe("calls", () => {
  setup();
  let url: string;
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
    request(
      {
        method: "POST",
        uri: url,
        form: formBody
      },
      () => {
        expect(mock.calls).toHaveLength(1);
        const firstCall = mock.calls[0];
        expect(firstCall.params).toEqual("walter=white");
        done();
      }
    );
  });
});

describe("reset", () => {
  setup();
  let url: string;
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
