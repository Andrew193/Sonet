import {NavLink, useHistory, withRouter} from "react-router-dom";
import s from "./header.module.css";
import {AiOutlineBank, AiOutlineComment, AiOutlineFile, AiOutlineTeam, AiOutlineUser} from "react-icons/ai";
import {
    BsBookmarkCheck,
    CgGames,
    IoMdNotificationsOutline,
    IoSettingsOutline,
    MdQueueMusic,
    RiGalleryLine
} from "react-icons/all";

const linksImages = {
    Home: <AiOutlineBank size={"24px"}/>,
    Profile: <AiOutlineUser size={"24px"}/>,
    Chats: <AiOutlineComment size={"24px"}/>,
    Users: <AiOutlineTeam size={"24px"}/>,
    Posts: <AiOutlineFile size={"24px"}/>,
    Gallery: <RiGalleryLine size={"24px"}/>,
    Games: <CgGames size={"24px"}/>,
    Settings: <IoSettingsOutline size={"24px"}/>,
    Music: <MdQueueMusic size={"24px"}/>,
    Bookmarks: <BsBookmarkCheck size={"24px"}/>,
    Notifications: <IoMdNotificationsOutline size={"24px"}/>,
}

function getNavLinkClass(path, isExact, pathname) {
    return isExact ? pathname === path ? s.LineLinkActive : "" : pathname.slice(1).includes(path.slice(1)) ? s.LineLinkActive : "";
}

function HeaderLink(props) {
    const {
        linkConfig,
        t,
        settings
    } = props;
    const history = useHistory();

    return (
        <p
            data-tooltip={t("" + linkConfig?.label + "")}
            onClick={() => history.push(linkConfig?.path)}
            className={"wrap-link-line " + getNavLinkClass(linkConfig?.path, linkConfig?.path === "/", props.location.pathname)}
        >
            <span className={"col-sm-3 col-xs-3"}/>
            <NavLink
                data-tooltip={t("" + linkConfig?.label + "")}
                className={"col-sm-8 col-xs-8"}
                exact={linkConfig?.path === "/"}
                to={{pathname: linkConfig?.path}}
                activeClassName={s.ActivePage}
                style={{color: settings?.configs?.color[settings?.color],}}
            >
                {linksImages[linkConfig?.label]}
                <span
                    style={{fontSize: settings?.configs?.size[settings?.fontSize],}}
                    data-tooltip={t("" + linkConfig?.label + "")}
                >{t("" + linkConfig.label + "")}</span>
            </NavLink>
        </p>
    )
}

export default withRouter(HeaderLink);