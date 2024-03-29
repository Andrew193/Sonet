import Dexie from 'dexie';
import {headerLinksConfig} from "./header/HeaderContainerPage";

export const defaultSettingsConfig = {
    fontSize: -1,
    color: -1,
    background: -1,
    headerColor: "#ffffff00",
    configs: {
        size: {
            '-1': "",
            10: "10px",
            13: "13px",
            16: "16px",
            20: "20px",
            23: "23px"
        },
        background: {
            '-1': "",
            0: "#d3d0d0",
            1: "#282828",
            2: "#534df1",
        },
        color: {
            '-1': "",
            0: "#FF0000",
            1: "#FFA500",
            2: "#008000",
            3: "#0a00ce",
            4: "#FF7F50",
            5: "#bd9d33",
            6: "#2177e8",
            7: "#b32dd2"
        }
    },
    list: {
        viewType: "plain",
        borderRadius: 0,
        listItemStyles: {},
        margin: 0,
        padding: 0,
        boxShadow: false
    },
    headerConfig: headerLinksConfig,
    music: [],
    musicDescriptions: []
}

export const INDEX_DB_NAME = "SONET_34";
export const SETTINGS_DB_NAME = "Settings"

export const indexDB = new Dexie(INDEX_DB_NAME);

indexDB.version(20).stores({
    [SETTINGS_DB_NAME]: '++id',
});

export function setupDb(callBack) {
    indexDB[SETTINGS_DB_NAME].count()
        .then((recordsCount) => {
            if (recordsCount === 0) {
                indexDB[SETTINGS_DB_NAME].put(defaultSettingsConfig);
            }

            if (callBack) {
                callBack();
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

export async function getSettings() {
    return await indexDB[SETTINGS_DB_NAME].orderBy('id').filter((settingConfig) => Number(settingConfig.id) === Number(1)).toArray()
}

export async function updateSettings(data, id) {
    return await indexDB[SETTINGS_DB_NAME].update(id, data)
}