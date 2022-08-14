import {useEffect, useState} from "react";
import {getSettings} from "./db";

export function useOutsideClick(ref, onOutsideClick) {
    useEffect(() => {
        function outsideClickHandler(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick()
            }
        }

        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, [ref]);
}

export function useSettings(updateKey) {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getSettingsCover() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getSettingsCover();
    }, [updateKey]);

    return {
        settings,
        setSettings
    }
}