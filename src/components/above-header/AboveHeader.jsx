import {Avatar, Badge, Box, Typography} from "@mui/material";
import AboveHeaderStyles from "./above.module.css";
import React from "react";
import {IoMdNotificationsOutline, MdOutlineNightlight} from "react-icons/all";
import {CreatePost} from "../../header/HeaderContainerPage";
import {getImageLinkFromStaticObject, getTabElementsThemeConfig} from "../../utils";
import {getItemFromLocalStorage} from "../../localStorageService";
import {headerListLinks, USER_INFORMATION} from "../../vars";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setNotificationsToShow} from "../../app/notificationReducer";

function AboveHeader() {
    const {avatar} = getItemFromLocalStorage(USER_INFORMATION);
    const notificationsState = useSelector(store => store?.notifications)
    const [userAvatar, setUsersAvatar] = useState();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setUsersAvatar(getImageLinkFromStaticObject(avatar))
    }, [avatar]);

    useEffect(() => {
        if (history?.location?.pathname !== headerListLinks.chats) {
            dispatch(setNotificationsToShow(new Set(notificationsState?.notifications)))
        }
    }, [notificationsState?.notifications, history?.location?.pathname])

    return (
        <Box className={AboveHeaderStyles.Container}>
            <Typography>Sonet34</Typography>
            <div>
                <span className={AboveHeaderStyles.NightMode}><MdOutlineNightlight/></span>
                <Badge badgeContent={notificationsState?.notificationsToShow?.size}
                       color="primary"
                       onClick={() => history.push(headerListLinks.notifications)}
                >
                    <span className={`${AboveHeaderStyles.NightMode} ${AboveHeaderStyles.Badge}`}>
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