import {useEffect, useState} from "react";
import s from "./top-info.module.css"
import Skeleton from 'react-loading-skeleton';
import React from "react";
import {alpha} from "@mui/material";
import {useTranslation} from "react-i18next";
import {headerListLinks} from "../../vars";
import {useHistory} from "react-router-dom";
import {useSettings} from "../../hooks";
import {getElementsThemeConfig, getPropertiesConfig} from "../../utils";
import HttpHelper from "../../helpers/httpHelper";
import UsersCreator from "./creators/users";

function TopUsers() {
    const [state, setState] = useState(false);
    const history = useHistory();
    const {settings} = useSettings()

    useEffect(() => {
        HttpHelper.USERS.getAllUsers()
            .then((newState) => setState(newState.users.slice(newState.users?.length - 5, newState.users?.length)))
    }, [])

    const {t} = useTranslation();

    return (
        <div
            className={!state ? s.Tip + " " + s.Center : s.Tip}
            style={{
                ...getElementsThemeConfig(settings, getPropertiesConfig(false, '', false, '',
                    null, alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)", 0.2)))
            }}
        >
            <h2>{t("Recent Users")}</h2>
            {state ?
                <>
                    <UsersCreator
                        settings={settings}
                        toCreate={state}
                    />
                    <div
                        className={s.LastTipItem}
                        onClick={() => history.push(headerListLinks.users)}
                    >{t("Show More")}</div>
                </> : <Skeleton height={"50px"} count={5}/>}
        </div>
    )
}

export default TopUsers;