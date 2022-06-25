import s from "./profile.module.css"
import Script from "./profileHelper"
import {AiOutlineDownload, AiOutlineHighlight} from "react-icons/ai";
import UserHelper from "../../helpers/userHelper"
import {useMemo, useRef, useState} from "react";
import {alpha, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {BsPen} from "react-icons/all";
import {downloadFile} from "../../utils";
import AvatarImageMenu from "./AvatarImageMenu";

function AvatarLine(props) {
    const {
        imgUrl,
        myId,
        id,
        settings
    } = props;

    const avatarUrl = useMemo(() => {
        try {
            return JSON.parse(imgUrl)?.webContentLink;
        } catch (error) {
            return imgUrl;
        }
    }, [imgUrl])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <style>
                {`
                .menuUserModal div.MuiPaper-elevation{
                background: ${settings?.configs?.background[settings?.background]} !important;
                color: ${settings?.configs?.color[settings?.color]} !important;
                box-shadow: 0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)} !important;
                }
                .menuUserModal div.MuiPaper-elevation span{
                font-size: ${settings?.configs?.size[settings?.fontSize] || "16px"} !important;
                }
                .menuUserModal div.MuiPaper-elevation svg{
                font-size: ${settings?.configs?.size[settings?.fontSize] || "16px"} !important;
                }
                #updateButton{
                 border-color: ${settings?.configs?.color[settings?.color]} !important;
                 color: ${settings?.configs?.color[settings?.color]} !important;
                 font-size:${settings?.configs?.size[settings?.fontSize]} !important;
                }
                `}
            </style>

            <AvatarImageMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                image={avatarUrl}
                avatarUrl={avatarUrl}
                backStyle={`${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.2)}`}
            />

            <div className={s.FirstLine}>
                <img
                    alt={"Avatar"}
                    src={avatarUrl}
                    onClick={(e) => {
                        (myId === id) && handleClick(e)
                    }}
                />
                {myId === id && <button
                    id={"updateButton"}
                    onClick={() => {
                        window?.document?.body?.querySelector(".App")?.classList?.add("Open")
                        Script.openModal("Muser")
                    }}
                >
                    <AiOutlineHighlight className={s.CommonIcon}/>Set up profile
                </button>}
            </div>
        </>)
}

export default AvatarLine;