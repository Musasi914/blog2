import assert from "node:assert/strict";
import test from "node:test";

import { isTrustedPushSubscription } from "./validatePushSubscription";

const validKeys = {
  p256dh: "public-key",
  auth: "auth-secret",
};

test("accepts known browser push service endpoints", () => {
  assert.equal(
    isTrustedPushSubscription({
      endpoint: "https://fcm.googleapis.com/fcm/send/example",
      keys: validKeys,
    }),
    true
  );

  assert.equal(
    isTrustedPushSubscription({
      endpoint: "https://updates.push.services.mozilla.com/wpush/v2/example",
      keys: validKeys,
    }),
    true
  );

  assert.equal(
    isTrustedPushSubscription({
      endpoint: "https://web.push.apple.com/example",
      keys: validKeys,
    }),
    true
  );
});

test("rejects forged push endpoints that could trigger SSRF", () => {
  assert.equal(
    isTrustedPushSubscription({
      endpoint: "https://127.0.0.1/admin",
      keys: validKeys,
    }),
    false
  );

  assert.equal(
    isTrustedPushSubscription({
      endpoint: "https://fcm.googleapis.com@127.0.0.1/admin",
      keys: validKeys,
    }),
    false
  );

  assert.equal(
    isTrustedPushSubscription({
      endpoint: "http://fcm.googleapis.com/fcm/send/example",
      keys: validKeys,
    }),
    false
  );

  assert.equal(
    isTrustedPushSubscription({
      endpoint: "https://fcm.googleapis.com:8443/fcm/send/example",
      keys: validKeys,
    }),
    false
  );
});
