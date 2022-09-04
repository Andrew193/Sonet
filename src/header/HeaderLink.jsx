import {NavLink} from "react-router-dom";
import s from "./header.module.css";
import {AiOutlineBank, AiOutlineComment, AiOutlineFile, AiOutlineTeam, AiOutlineUser} from "react-icons/ai";
import {CgGames, IoSettingsOutline, MdQueueMusic, RiGalleryLine} from "react-icons/all";

const linksImages = {
    Home: <AiOutlineBank size={"24px"}/>,
    Profile: <AiOutlineUser size={"24px"}/>,
    Chats: <AiOutlineComment size={"24px"}/>,
    Users: <AiOutlineTeam size={"24px"}/>,
    Posts: <AiOutlineFile size={"24px"}/>,
    Gallery: <RiGalleryLine size={"24px"}/>,
    Games: <CgGames size={"24px"}/>,
    Settings: <IoSettingsOutline size={"24px"}/>,
    Music: <MdQueueMusic size={"24px"}/>
}

function HeaderLink(props) {
    const {
        linkConfig,
        t,
        settings
    } = props;

    return (
        <p className={"wrap-link-line"}>
            <span className={"col-sm-2 col-xs-2"}/>
            <NavLink
                className={"col-sm-7 col-xs-7"}
                exact={linkConfig?.path === "/"}
                to={{pathname: linkConfig?.path}}
                activeClassName={s.ActivePage}
                data-tooltip={t("" + linkConfig?.label + "")}
                style={{
                    color: settings?.configs?.color[settings?.color],
                }}
            >
                {linksImages[linkConfig?.label]}
                <span
                    style={{
                        fontSize: settings?.configs?.size[settings?.fontSize],
                    }}
                >{t("" + linkConfig.label + "")}</span>
            </NavLink>

            <span className={"col-sm-3 col-xs-3"}/>
        </p>
    )
}

export default HeaderLink;