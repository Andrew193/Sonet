import { forwardRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router";
import ClearModalUser from "./clearModalUser";
import s from "./index.module.css"
import Script from "./script.js"
const ModalUser = forwardRef((props, ref) => {
    const { userName, email, id } = JSON.parse(localStorage.getItem("userInfo"));
    const [nm, setName] = useState(userName);
    const [em, setEmail] = useState(email)
    const history = useHistory();
    const [pas, setPassword] = useState("Your password")
    const { click } = props
    return createPortal(
        <div className={s.UpdateModal + " " + "Hide Muser"} ref={ref} onDoubleClick={() => click()}>
            <ClearModalUser setName={setName} setEmail={setEmail} setPassword={setPassword} 
            nm={nm} em={em} pas={pas} Script={Script} history={history} click={click} userId={id} />
        </div>,document.body
    )
})

export default ModalUser;