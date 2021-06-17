import { Link, NavLink, useHistory } from "react-router-dom";
import s from "./index.module.css";
import Script from "./script"
import Logo from "./img/icon.ico";
import ProfileContainer from "../user";
import { useState } from "react";
import Portal from "./userPortal";
import {AiOutlineHighlight} from "react-icons/ai";
import {
    AiOutlineUser, AiOutlineBank, AiOutlineComment,
    AiOutlineLogout, AiOutlineTeam, AiOutlineFile
} from "react-icons/ai";
import PostPortal from "./postPortal";
import Script2 from "../profile/script"
function Header(props) {
    const [flag, setFlag] = useState(false);
    const history = useHistory();
    return (
        <nav className={s.NavBar}>
            <div>
                <Link  to={{ pathname: "/" }}><img alt="Logotype" src={Logo} /></Link>
                <NavLink exact to={{ pathname: "/" }} activeClassName={s.ActivePage} data-tooltip="Home">
                    <span >Home</span><AiOutlineBank size={"24px"} /></NavLink>
                <NavLink exact to={{ pathname: "/profile" }} activeClassName={s.ActivePage} data-tooltip="Profile">
                    <span >Profile</span><AiOutlineUser size={"24px"} /></NavLink>
                <NavLink exact to={{ pathname: "/chats" }} activeClassName={s.ActivePage} data-tooltip="Chats">
                    <span >Chats</span><AiOutlineComment size={"24px"} /></NavLink>
                <NavLink exact to={{ pathname: "/users" }} activeClassName={s.ActivePage} data-tooltip="Users">
                    <span >Users</span><AiOutlineTeam  size={"24px"} /></NavLink>
                <NavLink exact to={{ pathname: "/posts" }} activeClassName={s.ActivePage} data-tooltip="Posts">
                    <span>Posts</span><AiOutlineFile  size={"24px"}/>
                </NavLink>
                <button className={s.LeaveBtn} onClick={() => Script.leave(history)} data-tooltip="Leave">
                    <span >Leave</span><AiOutlineLogout size={"24px"} /></button>
                <button className={"button"+" "+s.PostBtn} onClick={() =>Script2.openModal("Mpost")}>Post</button>
                <span data-tooltip="Post"><AiOutlineHighlight id={s.PostBtnS}/></span>
            </div>
            <div className={s.userInfo} onClick={() => Script.realOpen(setFlag)}>
                <ProfileContainer />
            </div>
            {flag && <Portal s={s.userInfo} click={() => setFlag(!flag)} />}
            <PostPortal socket={props.socket} notify={props.notify} />
        </nav>
    )
}
export default Header;