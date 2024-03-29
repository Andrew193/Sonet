import React from "react";
import SettingsStyles from "../settings/settings.module.css";
import {buttonsConfig} from "../create-post/CreatePostLine";
import {VscEmptyWindow} from "react-icons/all";
import {alpha, Box, hexToRgb, Typography} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {addPhotoToFolder} from "./galleryHelper";
import SolidTextareaStyle from "../components/solid-textarea/solid-textarea.module.css"
import InputEmoji from 'react-input-emoji';
import PropTypes from "prop-types";
import {useSettings} from "../hooks";

function FoldersActionsBar(props) {
    const {
        userId,
        setFolders
    } = props;

    const {settings} = useSettings();
    const [newFolderText, setNewFolderText] = useState("");
    const [isTextUpdate, setIsTextUpdate] = useState(false);
    const {t} = useTranslation();

    return (
        <div>
            <Box className={`${SettingsStyles.Actions} ${SettingsStyles.FoldersActions}`}>
                <style>{`
            .inputCover {
            position: absolute!important;
            z-index: 11;
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
            .react-emoji > .react-input-emoji--button {
            max-width: 45px !important;
            min-width: 45px !important;
            }
            `}</style>
                {isTextUpdate && <div className={"inputCover"}>
                    <div
                        style={{
                            width: "100%",
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: '15px',
                        }}
                        onDoubleClick={() => setIsTextUpdate(false)}
                    >
                        <InputEmoji
                            value={newFolderText}
                            onChange={setNewFolderText}
                            cleanOnEnter
                            placeholder={t("Type a new post text")}
                        />
                        <div
                            style={{
                                flex: '5 0',
                                padding: "10px"
                            }}
                        >
                    <span
                        id={"mainPostBtn"}
                        style={{
                            padding: "10px"
                        }}
                        onClick={() => {
                            setIsTextUpdate(false);
                            if (newFolderText) {
                                addPhotoToFolder({
                                    src: "",
                                    userId: userId,
                                    shared: false,
                                    sharedUser: "",
                                    name: newFolderText,
                                    folderBack: ""
                                }, setFolders)
                            }
                        }}
                    >Create Folder</span>
                        </div>
                    </div>
                </div>
                }
                <div>
                    <Typography
                        variant={"h4"}
                        component={"h4"}
                    >
                        Folders
                    </Typography>
                    <Typography
                        variant={"h6"}
                        component={"p"}
                    >Create, delete, update back image.</Typography>
                </div>
                <button
                    style={{
                        display: "flex",
                        justifyContent: 'space-evenly'
                    }}
                    className={`button btn btn-default  ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                    onClick={() => setIsTextUpdate(true)}
                >
                    <VscEmptyWindow/>
                    {t("Create")}
                </button>
            </Box>
            <div className={SolidTextareaStyle.ThematicBreak}/>
        </div>
    )
}

FoldersActionsBar.propTypes = {
    userId: PropTypes.number,
    setFolders: PropTypes.func
}

export default FoldersActionsBar;