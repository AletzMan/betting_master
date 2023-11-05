

import { useEffect, useState } from "react"

export function useOrientation() {
    const [isLandscape, setIsLandscape] = useState(false)

    useEffect(() => {
        screen.orientation.addEventListener("change", EventOrientation)
        return () => {
            window.removeEventListener("change", EventOrientation)
        }
    }, [])

    const EventOrientation = () => {
        if (
            (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary") &&
            (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/Windows Phone/i))
        ) {
            setIsLandscape(true)
        } else {
            setIsLandscape(false)
        }
    }
    return {
        isLandscape
    }
}