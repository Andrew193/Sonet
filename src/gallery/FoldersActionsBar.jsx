import s from "../settings/settings.module.css";
import {buttonsConfig} from "../createPost/CreatePostLine";
import {MdOutlineCreate, VscEmptyWindow} from "react-icons/all";
import {alpha, Box, hexToRgb} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getSettings} from "../db";
import {addPhotoToFolder} from "./galleryHelper";
import InputEmoji from 'react-input-emoji';

function FoldersActionsBar(props) {
    const {
        userId,
        setFolders
    } = props;

    const [settings, setSettings] = useState({})
    const [newFolderText, setNewFolderText] = useState("");
    const [isTextUpdate, setIsTextUpdate] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        async function getSettingsConfig() {
            const response = await getSettings();

            setSettings(response[0]);
        }

        getSettingsConfig();
    }, [])

    return (
        <Box
            className={s.Actions}
        >
            <style>{`
            .inputCover {
            position: absolute!important;
            z-index: 10;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "#f6f2ff"), 0.4)}!important;
            }
            .inputCover > div{
             height: 100%;
            }
            .folderItem {
            cursor: pointer;
            background: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "#7986cb"), 0.5)};
            }
            `}</style>

            {isTextUpdate && <div
                className={"inputCover"}
            >
                <InputEmoji
                    value={newFolderText}
                    onChange={setNewFolderText}
                    cleanOnEnter
                    placeholder={t("Type a new post text")}
                />
                <span
                    id={"mainPostBtn"}
                    onClick={() => {
                        setIsTextUpdate(false);
                        addPhotoToFolder({
                            src: "",
                            userId: userId,
                            shared: false,
                            sharedUser: "",
                            name: newFolderText,
                            folderBack: ""
                        }, setFolders)
                    }}
                >Create Folder</span>
            </div>
            }
            <button
                className={`button btn btn-default  ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                onClick={() => {
                    setIsTextUpdate(true)
                }}
            >
                <VscEmptyWindow/>
                {t("Create")}
            </button>
        </Box>
    )
}

export default FoldersActionsBar;