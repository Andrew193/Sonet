import {Link, useHistory} from "react-router-dom";
import s from "./header.module.css";
import Script from "./script";
import Logo from "./img/icon.ico";
import ProfileContainer from "../user/ProfileContainerForNavbar";
import {useMemo, useState} from "react";
import Portal from "./UserPortal";
import {AiOutlineHighlight} from "react-icons/ai";
import {AiOutlineLogout} from "react-icons/ai";
import PostPortal from "./PostPortal";
import Script2 from "../components/profile/profileHelper";
import {headerListLinks} from "../vars";
import {useTranslation} from "react-i18next";
import HeaderLink from "./HeaderLink";
import {useSettings} from "../hooks";
import UserShortBar from "./UserShortBar";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";
import {height} from "../App";

export function CreatePost() {
    const {settings} = useSettings();
    const {t} = useTranslation();
    return (
        <p className={"wrap-link-line post-btn-nav "}>
                    <span
                        id={"mainPostBtn"}
                        className={"col-sm-12 " + s.PostBtn}
                        onClick={() => {
                            window?.document?.body?.querySelector(".App")?.classList?.add("Open")
                            Script2.openModal("Mpost")
                        }}
                        style={{
                            fontSize: settings?.configs?.size[settings?.fontSize],
                            color: settings?.configs?.color[settings?.color],
                        }}
                    >{t("Post")}</span>
        </p>
    )
}

export const headerLinksConfig = [
    {path: headerListLinks.base, label: "Home"},
    {path: headerListLinks.profile, label: "Profile"},
    {path: headerListLinks.chats, label: "Chats"},
    {path: headerListLinks.users, label: "Users"},
    {path: headerListLinks.posts, label: "Posts"},
    {path: headerListLinks.gallery, label: "Gallery"},
    {path: headerListLinks.bookmarks, label: "Bookmarks"},
    {path: headerListLinks.notifications, label: "Notifications"},
    {path: headerListLinks.games, label: "Games"},
    {path: headerListLinks.music, label: "Music"},
    {path: headerListLinks?.settings, label: "Settings"}
];

function Header() {
    const [portalConfig, setPortalConfig] = useState({isOpened: false, e: null});

    const {settings} = useSettings();
    const history = useHistory();
    const {t, i18n} = useTranslation();

    const headerLinks = useMemo(() => settings?.headerConfig?.map((linkConfig) => <HeaderLink
        linkConfig={linkConfig}
        t={t}
        settings={settings}
        key={linkConfig.label}
    />), [settings, i18n?.language]);

    return (
        <nav
            className={s.NavBar}
            style={{
                background: settings?.configs?.background[settings?.background],
                fontSize: settings?.configs?.size[settings?.fontSize],
                maxHeight: `${height() - 52}px`
            }}
        >
            <style>{`
            .${s.NavBar} p:hover a {
            border-color: ${settings?.headerColor};
            color: rgb(73, 73, 248);
            }
            `}</style>
            <UserShortBar/>
            <div
                style={{
                    color: settings?.configs?.color[settings?.color],
                    ...getElementsThemeConfig(settings, getPropertiesConfig(true, null, false, '', null, null))
                }}
                className={s.HeadersLinksPaper}
            >
                <p className={"wrap-link-line logotype"}>
                    <Link to={{pathname: "/"}} className={"col-sm-12 logotype"}>
                        <img alt="Logotype" src={Logo}/>
                    </Link>
                </p>
                {headerLinks}
                <p className={"wrap-link-line " + s.ExitLink} data-tooltip={t("Leave")}>
                    <span className={"col-sm-5"}/>
                    <span
                        className={s.LeaveBtn + " col-sm-7"}
                        onClick={() => Script.leave(history)}
                        data-tooltip={t("Leave")}
                    >
                        <AiOutlineLogout size={"24px"} style={{"marginRight": "10px"}}/>
                        <span data-tooltip={t("Leave")}
                              style={{fontSize: settings?.configs?.size[settings?.fontSize],}}
                        >{t("Leave")}</span>
                    </span>
                </p>

                <CreatePost/>

                <span
                    onClick={() => {
                        window?.document?.body?.querySelector(".App")?.classList?.add("Open")
                        Script2.openModal("Mpost")
                    }}
                    data-tooltip={t("Post")}
                >
                    <AiOutlineHighlight id={s.PostBtnS}/>
                </span>

            </div>

            <div
                className={s.userInfo}
                onClick={(e) => setPortalConfig((t) => ({
                        isOpened: !t.isOpened,
                        e: e
                    })
                )}
            >
                <ProfileContainer
                    customStyles={{
                        fontSize: settings?.configs?.size[settings?.fontSize],
                        color: settings?.configs?.color[settings?.color],
                        background: settings?.configs?.background[settings?.background],
                    }}
                />
            </div>

            {portalConfig.isOpened && <Portal
                s={s.userInfo}
                click={() => setPortalConfig((t) => ({
                        isOpened: !t.isOpened,
                        e: null
                    })
                )}
                parentConfig={portalConfig.e}
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