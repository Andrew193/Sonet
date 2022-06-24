import {Link} from "react-router-dom";
import VerificationLine from "./VerificationLine";
import AvatarLine from "./AvatarLine";
import DateHelper from "../../helpers/dateHelper.js";
import FlexColl from "./FlexColl.jsx";
import Script from "./profileHelper"
import postServ from "../../posts/script.js"
import {useEffect, useRef, useState} from "react";
import PageHeader from "../common/navigationLine/NavigationLine.jsx";
import UserHelper from "../../helpers/userHelper";
import spareBacImg from "./img/luxfon.com-4767.jpg";
import {alpha, hexToRgb, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {downloadFile} from "../../utils";
import {AiOutlineDownload} from "react-icons/ai";
import {BsPen} from "react-icons/all";
import AboutYou from "./AboutYou";
import UsersActivities from "./UsersActivities";

function ClearProfile(props) {
    const {
        s,
        history,
        userInfo,
        settings
    } = props;

    const myId = JSON.parse(localStorage.getItem("userInfo")).id;

    const [count, setCount] = useState(0);

    const createdAt = DateHelper.fromNow(userInfo.createdAt);
    const updatedAt = DateHelper.fromNow(userInfo.updatedAt);

    let image = useRef();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        Script.getPCount(userInfo.id, setCount);
    }, [userInfo.id]);

    return (<>
            <style>
                {`
                ::-webkit-scrollbar-thumb {
                background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)"), 0.6)};
                }
                
                ::-webkit-scrollbar-track {
                background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)"), 0.2)};
                }
                `}
            </style>
            <form>
                <input
                    ref={(el) => image = el}
                    onChange={() => UserHelper.updateImage(image, "setBack")}
                    type="file"
                    style={{display: "none"}}
                />
            </form>

            <Menu
                className={"menuUserModal"}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                aria-haspopup="true"
            >
                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        downloadFile(JSON.parse(userInfo.back)?.webContentLink || spareBacImg)
                    }}
                >
                    <ListItemIcon>
                        <AiOutlineDownload/>
                    </ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        UserHelper.CallImageInput(image)
                    }}
                >
                    <ListItemIcon>
                        <BsPen/>
                    </ListItemIcon>
                    <ListItemText>Update my Back</ListItemText>
                </MenuItem>
            </Menu>

            <PageHeader historyPath={"/"}>
                <>
                    <div>
                        <Link
                            to={{pathname: "/profile"}}
                        >
                            {userInfo.userName}</Link>
                        <br/>
                        <span
                            className={s.PostCount}
                            onClick={() => postServ.getMy(history, userInfo.id)}
                        >{0 || count} Posts
                        </span>
                    </div>
                    <VerificationLine
                        userInfo={userInfo}
                        myId={myId}
                        settings={settings}
                    />
                </>
            </PageHeader>
            <div
                className={s.Back}
                onClick={(e) => {
                    (myId === userInfo.id) && handleClick(e)
                }}
                style={userInfo.back && {backgroundImage: `url(${JSON.parse(userInfo.back)?.webContentLink})`}}
            />
            <AvatarLine
                imgUrl={userInfo.avatar}
                myId={myId}
                id={userInfo.id}
                settings={settings}
            />
            <div
                className={"Separator"}
                onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}
            />
            <FlexColl
                settings={settings}
                myId={myId}
                up={updatedAt}
                cr={createdAt}
                userInfo={userInfo}
            />
            <div
                className="Separator"
                onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}
            />
            <AboutYou/>
            <UsersActivities />
        </>
    )
}

export default ClearProfile;