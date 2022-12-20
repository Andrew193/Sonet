import {Avatar, Badge, Box, Typography} from "@mui/material";
import style from "./above.module.css";
import React from "react";
import {IoMdNotificationsOutline, MdOutlineNightlight} from "react-icons/all";
import {CreatePost} from "../../header/HeaderContainerPage";
import {getTabElementsThemeConfig} from "../../utils";
import {getItemFromLocalStorage} from "../../localStorageService";
import {headerListLinks, USER_INFORMATION} from "../../vars";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

function AboveHeader() {
    const {avatar} = getItemFromLocalStorage(USER_INFORMATION);
    const notifications = useSelector(store => store?.notifications?.notifications)
    const [userAvatar, setUsersAvatar] = useState();
    const [notificationsToShow, setNotificationsToShow] = useState([]);
    const history = useHistory();

    useEffect(() => {
        try {
            setUsersAvatar(JSON.parse(avatar)?.webContentLink)
        } catch (error) {
            setUsersAvatar(avatar)
        }
    }, [avatar]);

    useEffect(() => {
        setNotificationsToShow(new Set(notifications))
    }, [notifications])

    return (
        <Box className={style.Container}>
            <Typography>Sonet34</Typography>
            <div>
                <span className={style.NightMode}><MdOutlineNightlight/></span>
                <Badge badgeContent={notificationsToShow?.size}
                       color="primary"
                       onClick={() => history.push(headerListLinks.notifications)}
                >
                    <span className={style.NightMode + " " + style.Badge}>
                        <IoMdNotificationsOutline/>
                    </span>
                </Badge>
                <CreatePost/>
                <Avatar
                    onClick={() => history.push(headerListLinks.profile)}
                    src={userAvatar}
                    style={{
                        ...getTabElementsThemeConfig(),
                        height: "40px",
                        width: "40px",
                        marginLeft: "20px",
                        boxShadow: "rgb(0 0 0 / 80%) 0px 0px 8px 0px"
                    }}
                    className={"conversationImg"}
                />
            </div>
        </Box>
    )
}

export default AboveHeader;