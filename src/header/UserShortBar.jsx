import {alpha, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {getUserAvatar} from "../posts/postsHelper";
import LazyImage from "../posts/LazyImage";
import s from "./header.module.css"
import {useSettings} from "../hooks";
import {useHistory} from "react-router-dom";

function UserShortBar() {
    const [userAvatar, setUserAvatar] = useState();
    const history = useHistory();
    const {settings} = useSettings();
    const userInformation = JSON.parse(localStorage.getItem("userInfo") || "{}");

    useEffect(() => {
        if (userInformation.id) {
            getUserAvatar(userAvatar, setUserAvatar, userInformation.id);
        }
    }, [userInformation.id])

    return (
        <aside
            style={{
                boxShadow: `0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)}`,
            }}
        >
            <LazyImage imgClass={s.ShortUserAvatar} imageSrc={userAvatar}/>
            <p>
                <span onClick={() => history.push("/profile")} className={s.ShortName}>{userInformation.userName}</span>
                <span>{userInformation.email}</span>
            </p>
        </aside>
    )
}

export default UserShortBar;