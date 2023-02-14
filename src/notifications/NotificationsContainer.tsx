import PostStyles from "../posts/posts.module.css";
import NotificationStyles from "./notifications.module.css";
import {getEmptyElementsThemeConfig} from "../utils";
import {Box, Typography} from "@mui/material";
import {useSettings} from "../hooks";
import MaintainedPageHeader from "../components/MaintainedPageHeader";
import React, {useEffect, useState} from "react";
import {headerListLinks} from "../vars";
import EmptySection from "../components/common/empty-section/EmptySection";
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import {IoMdNotificationsOutline} from "react-icons/all";
import {setNotificationsToShow} from "../app/notificationReducer";
import {useHistory} from "react-router-dom";
import Separator from "../components/common/Separator/Separator";
import {withAsideBar} from "../hoc/withAsideBar";

function NotificationsContainer() {
    const {settings} = useSettings();
    const dispatch = useDispatch();
    const notifications = useSelector<{ notifications: { notifications: { key: string } } }>
    (store => store?.notifications?.notifications);
    const history = useHistory();
    const [notificationsToShow, setNotificationsToShowOnUI] = useState<{ [key: string]: string | number }[]>([]);

    // @ts-ignore
    useEffect(() => setNotificationsToShowOnUI(Array.from(new Set(notifications))), [notifications])

    const parsedNotifications = useMemo(() => {
        return notificationsToShow?.map((notification, index) =>
            <Typography key={index} className={NotificationStyles.Notification}
                        style={{
                            ...settings?.list?.listItemStyles
                        }}
            >
                <IoMdNotificationsOutline/>
                <div>
                    <h4>Chat notification</h4>
                    <p>{notification?.text}</p>
                </div>
            </Typography>)
    }, [notificationsToShow])

    useEffect(() => {
        if (history?.location?.pathname === headerListLinks?.notifications) {
            dispatch(setNotificationsToShow([]))
        }
    }, [history?.location?.pathname])

    return (
        <Box className={PostStyles.Container} style={{...getEmptyElementsThemeConfig(settings)}}>
            <MaintainedPageHeader path={headerListLinks.base} linkPath={headerListLinks.notifications}
                                  linkTitle={"Notifications"}/>
            <Separator />
            {notificationsToShow?.length === 0 ? <EmptySection
                    title={"Nothing to show here yet"}
                    message={"You do not have notifications. We will show them here if you have ones."}
                />
                : parsedNotifications}
        </Box>
    )
}

export default withAsideBar(NotificationsContainer);