/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { getToken, onMessage, Unsubscribe } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { fetchToken, messaging } from "@/config/firebase";
import { enqueueSnackbar } from "notistack";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { ZodIssue } from "zod";

async function getNotificationPermissionAndToken(uid: string) {
    // Step 1: Check if Notifications are supported in the browser.
    if (!("Notification" in window)) {
        console.info("This browser does not support desktop notification");
        return null;
    }

    // Step 2: Check if permission is already granted.
    if (Notification.permission === "granted") {
        return await fetchToken();
    }

    // Step 3: If permission is not denied, request permission from the user.
    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const newToken = await fetchToken();
            if (newToken)
                handleSaveToken(uid, newToken)
            return newToken
        }
    }

    return null;
}

const handleSaveToken = async (uid: string, token: string) => {
    try {
        const response = await axios.patch(`/api/users/${uid}`, {
            tokenNotifications: token,
            notifications: true
        })
    } catch (error) {
    }
}

const useFcmToken = () => {
    const session = useSession()
    const router = useRouter()
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const retryLoadToken = useRef(0)
    const isLoading = useRef(false)

    const loadToken = async () => {
        if (session.data?.user) {

            if (isLoading.current) return;

            isLoading.current = true;
            const token = await getNotificationPermissionAndToken(session.data?.user?.id as string);

            if (Notification.permission === "denied") {
                setNotificationPermissionStatus("denied");
                console.info(
                    "%cPush Notifications issue - permission denied",
                    "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
                );
                isLoading.current = false;
                return;
            }

            if (!token) {
                if (retryLoadToken.current >= 3) {
                    alert("Unable to load token, refresh the browser");
                    console.info(
                        "%cPush Notifications issue - unable to load token after 3 retries",
                        "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
                    );
                    isLoading.current = false;
                    return;
                }

                retryLoadToken.current += 1;
                console.error("An error occurred while retrieving token. Retrying...");
                isLoading.current = false;
                await loadToken();
                return;
            }

            setNotificationPermissionStatus(Notification.permission);
            setToken(token);
            isLoading.current = false;
        }
    };



    useEffect(() => {
        if ("Notification" in window) {
            loadToken();
        }
    }, [session]);

    useEffect(() => {
        const setupListener = async () => {
            if (!token) return;
            const m = await messaging();
            if (!m) return;

            // Step 9: Register a listener for incoming FCM messages.
            const unsubscribe = onMessage(m, (payload) => {
                if (Notification.permission !== "granted") return;
                const link = payload.fcmOptions?.link || payload.data?.link;

                if (link) {
                    enqueueSnackbar(payload.notification?.body, { variant: "info" })
                } else {
                    enqueueSnackbar(payload.notification?.body, { variant: "info" })
                }

                // --------------------------------------------
                // Disable this if you only want toast notifications.
                const n = new Notification(
                    payload.notification?.title || "New message",
                    {
                        body: payload.notification?.body || "This is a new message",
                        data: link ? { url: link } : undefined,
                    }
                );

                // Step 10: Handle notification click event to navigate to a link if present.
                n.onclick = (event) => {
                    event.preventDefault();
                    const link = (event.target as any)?.data?.url;
                    if (link) {
                        router.push(link);
                    } else {
                        console.log("No link found in the notification payload");
                    }
                };
                // --------------------------------------------
            });

            return unsubscribe;
        };

        let unsubscribe: Unsubscribe | null = null;

        setupListener().then((unsub) => {
            if (unsub) {
                unsubscribe = unsub;
            }
        });

        // Step 11: Cleanup the listener when the component unmounts.
        return () => unsubscribe?.();
    }, [token, router]);

    return { token, notificationPermissionStatus }; // Return the token and permission status.
};

export default useFcmToken;