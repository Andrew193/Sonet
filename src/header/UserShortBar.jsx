import {alpha, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {getUserAvatar} from "../posts/postsHelper";
import LazyImage from "../posts/LazyImage";
import s from "./header.module.css"
import {useSettings} from "../hooks";
import {useHistory} from "react-router-dom";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";
import {getItemFromLocalStorage} from "../localStorageService";

function UserShortBar() {
    const [userAvatar, setUserAvatar] = useState();
    const history = useHistory();
    const {settings} = useSettings();
    const userInformation = getItemFromLocalStorage("userInfo");

    useEffect(() => {
        if (userInformation.id) {
            getUserAvatar(userAvatar, setUserAvatar, userInformation.id);
        }
    }, [userInformation.id])

    return (
        <aside style={getElementsThemeConfig(settings, getPropertiesConfig(true, null, false, '', null, null))} className={"userShortBar"}>
            <LazyImage imgClass={s.ShortUserAvatar} imageSrc={userAvatar}
                       wrapperStyle={getElementsThemeConfig({}, getPropertiesConfig(true, "rgb(0,0,0)",
                           false, '', null, null))}/>
            <p>
                <span onClick={() => history.push("/profile")} className={s.ShortName}>{userInformation.userName}</span>
                <span>{userInformation.email}</span>
            </p>
        </aside>
    )
}

export default UserShortBar;