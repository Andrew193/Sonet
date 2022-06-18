import {Link, NavLink, useHistory} from "react-router-dom";
import s from "./header.module.css";
import Script from "./script";
import Logo from "./img/icon.ico";
import ProfileContainer from "../user/ProfileContainerForNavbar";
import {useEffect, useMemo, useState} from "react";
import Portal from "./UserPortal";
import {AiOutlineHighlight} from "react-icons/ai";
import {v4 as uuidv4} from "uuid";
import {
    AiOutlineUser, AiOutlineBank, AiOutlineComment,
    AiOutlineLogout, AiOutlineTeam, AiOutlineFile
} from "react-icons/ai";
import PostPortal from "./PostPortal";
import Script2 from "../components/profile/script";
import {headerListLinks} from "../vars";
import {CgGames, IoSettingsOutline} from "react-icons/all";
import {getSettings} from "../db";
import {alpha} from "@mui/material";

const headerLinksConfig = [
    {path: headerListLinks.base, img: <AiOutlineBank size={"24px"}/>, label: "Home"},
    {path: headerListLinks.profile, img: <AiOutlineUser size={"24px"}/>, label: "Profile"},
    {path: headerListLinks.chats, img: <AiOutlineComment size={"24px"}/>, label: "Chats"},
    {path: headerListLinks.users, img: <AiOutlineTeam size={"24px"}/>, label: "Users"},
    {path: headerListLinks.posts, img: <AiOutlineFile size={"24px"}/>, label: "Posts"},
    {path: headerListLinks.games, img: <CgGames size={"24px"}/>, label: "Games"},
    {path: headerListLinks?.settings, img: <IoSettingsOutline size={"24px"}/>, label: "Settings"}
];

function Header() {
    const [flag, setFlag] = useState(false);
    const [settings, setSettings] = useState({});
    const history = useHistory();

    const headerLinks = useMemo(() => headerLinksConfig?.map((linkConfig) => {

        return <p className={"wrap-link-line"}>
            <span className={"col-sm-2 col-xs-2"}/>
            <NavLink
                className={"col-sm-7 col-xs-7"}
                key={uuidv4()}
                exact to={{pathname: linkConfig?.path}}
                activeClassName={s.ActivePage}
                data-tooltip={linkConfig?.label}
                style={{
                    color: settings?.configs?.color[settings?.color],
                }}
            >
                {linkConfig?.img}
                <span
                    style={{
                        fontSize: settings?.configs?.size[settings?.fontSize],
                    }}
                >{linkConfig.label}</span>
            </NavLink>

            <span className={"col-sm-3 col-xs-3"}/>
        </p>
    }), [settings]);

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <nav
            className={s.NavBar}
            style={{
                background: settings?.configs?.background[settings?.background],
                fontSize: settings?.configs?.size[settings?.fontSize],
            }}
        >
            <div
                style={{
                    color: settings?.configs?.color[settings?.color],
                    boxShadow: `0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)}`,
                }}
            >
                <p className={"wrap-link-line logotype"}>
                    <span className={"col-sm-2"}/>
                    <Link to={{pathname: "/"}} className={"col-sm-7 logotype"}>
                        <img alt="Logotype" src={Logo}/>
                    </Link>
                    <span className={"col-sm-3"}/>
                </p>
                {headerLinks}

                <p className={"wrap-link-line"}>
                    <span className={"col-sm-2"}/>
                    <span
                        className={s.LeaveBtn + " col-sm-7"}
                        onClick={() => {
                            Script.leave(history)
                        }}
                        data-tooltip="Leave"
                    >
                        <AiOutlineLogout size={"24px"} style={{"marginRight": "10px"}}/>
                        <span
                            style={{
                                fontSize: settings?.configs?.size[settings?.fontSize],
                            }}
                        >Leave</span>
                    </span>
                    <span className={"col-sm-3"}/>
                </p>

                <p className={"wrap-link-line post-btn-nav "}>
                    <span className={"col-sm-2"}/>
                    <span
                        id={"mainPostBtn"}
                        className={"col-sm-7 " + s.PostBtn}
                        onClick={() => {
                            Script2.openModal("Mpost")
                        }}
                        style={{
                            fontSize: settings?.configs?.size[settings?.fontSize],
                            color: settings?.configs?.color[settings?.color],
                        }}
                    >Post
                    </span>
                    <span className={"col-sm-2"}/>
                </p>

                <span
                    data-tooltip="Post"
                >
                    <AiOutlineHighlight id={s.PostBtnS}/>
                </span>

            </div>

            <div
                className={s.userInfo}
                onClick={() => {
                    Script.ToggleStateValue(setFlag)
                }}
            >
                <ProfileContainer
                    customStyles={{
                        fontSize: settings?.configs?.size[settings?.fontSize],
                        color: settings?.configs?.color[settings?.color],
                        background: settings?.configs?.background[settings?.background],
                    }}
                />
            </div>

            {flag && <Portal
                s={s.userInfo}
                click={() => {
                    setFlag(!flag)
                }}
                customStyles={{
                    fontSize: settings?.configs?.size[settings?.fontSize],
                    color: settings?.configs?.color[settings?.color],
                    background: settings?.configs?.background[settings?.background],
                }}
            />}

            <PostPortal/>
        </nav>
    )
}

export default Header;