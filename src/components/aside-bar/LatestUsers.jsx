import {useEffect, useState} from "react";
import AsideBarStyles from "./aside-bar.module.css"
import Skeleton from 'react-loading-skeleton';
import React from "react";
import {alpha} from "@mui/material";
import {useTranslation} from "react-i18next";
import {headerListLinks} from "../../vars";
import {useHistory} from "react-router-dom";
import {useSettings} from "../../hooks";
import {getElementsThemeConfig, getPropertiesConfig} from "../../utils";
import HttpHelper from "../../helpers/httpHelper";
import UsersCreator from "./creators/UsersCreator";

function LatestUsers() {
    const [users, setUsers] = useState();
    const history = useHistory();
    const {t} = useTranslation();
    const {settings} = useSettings()

    useEffect(() => {
        HttpHelper.USERS.getAllUsers()
            .then((newState) => setUsers(newState.users.slice(newState.users?.length - 5, newState.users?.length)))
    }, [])

    return (
        <div
            className={!users ? `${AsideBarStyles.Tip} ${AsideBarStyles.Center}` : AsideBarStyles.Tip}
            style={{
                ...getElementsThemeConfig(settings, getPropertiesConfig(false, '', false, '',
                    null, alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)", 0.2)))
            }}
        >
            <h2>{t("Recent Users")}</h2>
            {users ?
                <>
                    <UsersCreator
                        settings={settings}
                        toCreate={users}
                    />
                    <div
                        className={AsideBarStyles.LastTipItem}
                        onClick={() => history.push(headerListLinks.users)}
                    >{t("Show More")}</div>
                </> : <Skeleton height={"50px"} count={5}/>}
        </div>
    )
}

export default LatestUsers;