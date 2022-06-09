import {Link, NavLink, useHistory} from "react-router-dom";
import s from "./header.module.css";
import Script from "./script";
import Logo from "./img/icon.ico";
import ProfileContainer from "../components/user";
import {useMemo, useState} from "react";
import Portal from "./userPortal";
import {AiOutlineHighlight} from "react-icons/ai";
import {v4 as uuidv4} from "uuid";
import {
    AiOutlineUser, AiOutlineBank, AiOutlineComment,
    AiOutlineLogout, AiOutlineTeam, AiOutlineFile
} from "react-icons/ai";
import PostPortal from "./postPortal";
import Script2 from "../components/profile/script";
import {headerListLinks} from "../vars";

const headerLinksConfig = [
    {path: headerListLinks.base, img: <AiOutlineBank size={"24px"}/>, label: "Home"},
    {path: headerListLinks.profile, img: <AiOutlineUser size={"24px"}/>, label: "Profile"},
    {path: headerListLinks.chats, img: <AiOutlineComment size={"24px"}/>, label: "Chats"},
    {path: headerListLinks.users, img: <AiOutlineTeam size={"24px"}/>, label: "Users"},
    {path: headerListLinks.posts, img: <AiOutlineFile size={"24px"}/>, label: "Posts"},
];

function Header() {
    const [flag, setFlag] = useState(false);
    const history = useHistory();

    const headerLinks = useMemo(() => headerLinksConfig?.map((linkConfig) =>
        <p className={"wrap-link-line"}>
            <span className={"col-sm-2 col-xs-2"}/>
            <NavLink
                className={"col-sm-7 col-xs-7"}
                key={uuidv4()}
                exact to={{pathname: linkConfig?.path}}
                activeClassName={s.ActivePage}
                data-tooltip={linkConfig?.label}
            >
                {linkConfig?.img}
                <span>{linkConfig.label}</span>
            </NavLink>

            <span className={"col-sm-3 col-xs-3"}/>
        </p>
    ), []);

    return (
        <nav className={s.NavBar}>
            <div>
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
                        <AiOutlineLogout size={"24px"} style={{"margin-right": "10px"}}/>
                        <span>Leave</span>
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
                    Script.realOpen(setFlag)
                }}
            >
                <ProfileContainer/>
            </div>

            {flag && <Portal
                s={s.userInfo}
                click={() => {
                    setFlag(!flag)
                }}
            />}

            <PostPortal/>
        </nav>
    )
}

export default Header;