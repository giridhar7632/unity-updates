"use client";

import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

const Push = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription>();
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const { toast } = useToast();

  useEffect(() => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      const setupNotifications = () => {
        navigator.serviceWorker.ready.then((reg) => {
          reg.pushManager.getSubscription().then((sub) => {
            if (
              sub &&
              !(
                sub.expirationTime &&
                Date.now() > sub.expirationTime - 5 * 60 * 1000
              )
            ) {
              console.log({ sub });
              // sendSubscription(session, sub, username).then((res) => {
              // console.log("subscribed");
              // });
              setSubscription(sub);
              setIsSubscribed(true);
            } else {
              reg.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  // applicationServerKey: base64ToUint8Array(
                  //   process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC,
                  // ),
                })
                .then((newSub) => {
                  console.log("User is subscribed:", newSub);
                  console.log({ sub });

                  // sendSubscription(session, newSub, username).then((res) => {
                  //   console.log("subscribed");
                  // });
                  setSubscription(newSub);
                  setIsSubscribed(true);
                })
                .catch((err) => {
                  if (Notification.permission === "denied") {
                    console.warn("Permission for notifications was denied");
                  } else {
                    console.error("Failed to subscribe the user: ", err);
                  }
                });
            }
          });
          setRegistration(reg);
        });
      };
      if (Notification.permission === "granted") {
        setupNotifications();
      } else if (Notification.permission !== "denied") {
        toast({
          title: "Enable Notifications",
          description: "Please enable notifications to receive updates",
        });
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setupNotifications();
          }
        });
      }
    }
  }, []);

  return <></>;
};

export default Push;
