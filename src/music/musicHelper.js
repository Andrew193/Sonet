import {updateSettings} from "../db";
import {notify} from "../App";

export function deleteTrack(settings, index, callback) {
    settings?.music?.splice(index, 1);
    settings?.musicDescriptions?.splice(index, 1);
    updateSettings({
        ...settings,
        music: settings?.music,
        musicDescriptions: settings?.musicDescriptions
    }, 1)
        .then(() => {
            notify("Deleted");
            callback(settings?.music)
        })
}

export function updateTrackDescription(settings, index, callback, newName, trackCategory) {
    settings.musicDescriptions[index] = {
        ...settings?.musicDescriptions[index],
        name: newName || settings?.musicDescriptions[index]?.name,
        category: trackCategory || settings?.musicDescriptions[index]?.category
    }

    updateSettings({
        ...settings,
        musicDescriptions: settings?.musicDescriptions
    }, 1)
        .then(() => {
            notify("Updated");
            callback(settings?.music)
        })
}
