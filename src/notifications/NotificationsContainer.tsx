import s from "../posts/posts.module.css";
import {getEmptyElementsThemeConfig} from "../utils";
import {Box, Typography} from "@mui/material";
import {useSettings} from "../hooks";
import MaintainedPageHeader from "../components/MaintainedPageHeader";
import React, {useEffect, useState} from "react";
import {headerListLinks} from "../vars";
import EmptySection from "../components/common/empty-section/EmptySection";
import {useSelector} from "react-redux";
import {useMemo} from "react";

function NotificationsContainer() {
    const {settings} = useSettings();

    const notifications = useSelector<{ notifications: { notifications: { key: string } } }>
    (store => store?.notifications?.notifications);

    const [notificationsToShow, setNotificationsToShow] = useState<{ [key: string]: string | number }[]>([]);

    // @ts-ignore
    useEffect(() => setNotificationsToShow(Array.from(new Set(notifications))), [notifications])

    const parsedNotifications = useMemo(() => {
        return notificationsToShow?.map((notification, index) => <Typography key={index}>
            <span>Chat notification</span>
            <p>{notification?.text}</p>
        </Typography>)
    }, [notificationsToShow])

    return (
        <Box className={s.Container} style={{...getEmptyElementsThemeConfig(settings)}}>
            <MaintainedPageHeader path={headerListLinks.base} linkPath={headerListLinks.notifications}
                                  linkTitle={"Notifications"}/>
            <div className={"Separator"}/>
            {notificationsToShow?.length === 0 ? <EmptySection
                    title={"Nothing to show here yet"}
                    message={"You do not have notifications. We will show them here if you have ones."}
                />
                : parsedNotifications}
        </Box>
    )
}

export default NotificationsContainer;