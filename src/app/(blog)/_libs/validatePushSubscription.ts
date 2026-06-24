import type { SerializablePushSubscription } from "@/types/PushSubscriptionType";

const trustedPushServiceHostnames = new Set([
  "fcm.googleapis.com",
  "updates.push.services.mozilla.com",
  "web.push.apple.com",
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isTrustedPushSubscription(
  subscription: SerializablePushSubscription | null
): subscription is SerializablePushSubscription {
  if (!subscription || !isNonEmptyString(subscription.endpoint)) {
    return false;
  }

  if (
    !isNonEmptyString(subscription.keys?.p256dh) ||
    !isNonEmptyString(subscription.keys?.auth)
  ) {
    return false;
  }

  try {
    const endpoint = new URL(subscription.endpoint);

    return (
      endpoint.protocol === "https:" &&
      (endpoint.port === "" || endpoint.port === "443") &&
      trustedPushServiceHostnames.has(endpoint.hostname)
    );
  } catch {
    return false;
  }
}
