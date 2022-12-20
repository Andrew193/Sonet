import {useEffect, useState} from "react";
import {defaultSettingsConfig, getSettings} from "./db";

export function useOutsideClick(ref: any, onOutsideClick: any) {
    useEffect(() => {
        function outsideClickHandler(event: MouseEvent) {
            if (ref?.current && !ref?.current.contains(event?.target)) {
                onOutsideClick()
            }
        }

        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, [ref]);
}

export interface UseSettingsInterface {
    fontSize: number,
    color: number,
    background: number,
    configs: {
        size: Record<string | number, string>,
        background: Record<string | number, string>,
        color: Record<string | number, string>
    },
    list: {
        viewType: string,
        borderRadius: number,
        listItemStyles: Record<string, unknown>,
        margin: number,
        padding: number,
        boxShadow: boolean
    },
    headerConfig: {
        path: string,
        label: string
    }[],
    music: any[],
    musicDescriptions: any[]
}

export const useSettings =
    (updateKey = 1) => {
        const [settings, setSettings] = useState<UseSettingsInterface>(defaultSettingsConfig);

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
        } as const
    }