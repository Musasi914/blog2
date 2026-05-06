"use server";

import type { SerializablePushSubscription } from "@/types/PushSubscriptionType";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:sopmod120@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeUser(_sub: SerializablePushSubscription) {
  return { success: true };
}

export async function unsubscribeUser() {
  return { success: true };
}

export async function sendNotification(
  subscription: SerializablePushSubscription | null,
  message: string
) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
