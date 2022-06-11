import {createPortal} from "react-dom";
import {useHistory} from "react-router";
import CommonHelper from "../helpers/common"
import s from "./header.module.css"
import Script from "./script.js"
import Script2 from "../components/profile/script.js";
import {useOutsideClick} from "../hooks";
import {useRef} from "react";
import {Divider} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {BsThreeDots} from "react-icons/all";
import {AiOutlineSecurityScan} from "react-icons/ai";

function Portal(props) {
    const {
        click
    } = props;

    const {
        id,
        userName: name
    } = Script.GetInfo();

    const history = useHistory();
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        click(false);
    })

    return createPortal(
        <div
            className={s.UserPortal}
            onClick={click}
            ref={wrapperRef}
        >
            <div>
                <Avatar>{name[0]}</Avatar>
                <div
                    onClick={() => {
                        CommonHelper.redirect(history, null, "/profile")
                    }}
                    style={{alignItems: 'flex-start'}}
                >
                    <span className={"fs_font-bold"}>{name}</span>
                    <span>#{id}</span>
                </div>
                <div>
                    <AiOutlineSecurityScan/>
                </div>
            </div>

            <Divider
                className={"divider_default"}
                light
            />

            <p
                id={s.Controle}
                onClick={() => {
                    Script2.openModal("Muser")
                }}
            >Set up profile</p>
            <p
                id={s.Controle}
                onClick={() => {
                    Script.leave(history)
                }}
            >Log out @{name}</p>
        </div>
        , document.body.querySelector(`.${props.s}`))
}

export default Portal;