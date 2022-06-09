import { createPortal } from "react-dom";
import { useHistory } from "react-router";
import CommonHelper from "../helpers/common"
import s from "./header.module.css"
import Script from "./script.js"
import Script2 from "../components/profile/script.js";

function Portal(props) {
    const history = useHistory(),
        { id, userName: name } = Script.GetInfo(),
        { click } = props;
    return createPortal(
        <div className={s.UserPortal} onClick={() => click()}>
            <h2 className={s.Controle} onClick={() => CommonHelper.redirect(history, null, "/profile")}>{name}</h2>
            <p>Your id {id}</p>
            <p className={s.Controle} onClick={() => Script2.openModal("Muser")}>Set up profile</p>
            <p className={s.Controle} onClick={() => Script.leave(history)}>Leave</p>
        </div>
        , document.body.querySelector(`.${props.s}`))
}
export default Portal;