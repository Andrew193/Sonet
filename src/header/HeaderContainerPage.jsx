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
        <NavLink
            key={uuidv4()}
            exact to={{pathname: linkConfig?.path}}
            activeClassName={s.ActivePage}
            data-tooltip={linkConfig?.label}
        >
            <span>{linkConfig.label}</span>
            {linkConfig?.img}
        </NavLink>
    ), []);

    return (
        <nav className={s.NavBar}>
            <div>
                <Link to={{pathname: "/"}}>
                    <img alt="Logotype" src={Logo}/>
                </Link>

                {headerLinks}

                <span
                    className={s.LeaveBtn}
                    onClick={() => {
                        Script.leave(history)
                    }}
                    data-tooltip="Leave"
                >
                    <span>Leave</span>
                    <AiOutlineLogout size={"24px"} style={{"margin-left":"10px"}}/>
                </span>

                <button
                    className={"button " + s.PostBtn}
                    onClick={() => {
                        Script2.openModal("Mpost")
                    }}
                >Post
                </button>

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