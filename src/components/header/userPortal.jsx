import { createPortal } from "react-dom";
import { useHistory } from "react-router";
import s from "./index.module.css"
import Script from "./script.js"
import Script2 from "../profile/script.js"
function Portal(props) {
    const history = useHistory(),
        { id, userName: name } = Script.GetInfo(),
        { click } = props;
    return createPortal(
        <div className={s.UserPortal} onClick={() => click()}>
            <h2 className={s.Controle} onClick={() => history.push("/profile")}>{name}</h2>
            <p>Your id {id}</p>
            <p className={s.Controle} onClick={() => Script2.openModal("Muser")}>Set up profile</p>
            <p className={s.Controle} onClick={() => Script.leave(history)}>Leave</p>
        </div>
        , document.body.querySelector(`.${props.s}`))
}
export default Portal;