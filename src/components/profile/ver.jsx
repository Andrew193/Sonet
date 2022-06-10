import s from "./profile.module.css"
import s2 from "../common/navigationLine/style.module.css"
import Script from "./script.js"
import { useRef } from "react";
import { AiOutlineSafetyCertificate, AiOutlineSecurityScan } from "react-icons/ai";

function Ver(props) {
    let text = useRef();
    const { userInfo, myId } = props;

    return (
        <div className={s.Ver}>
            <div className={s.ConfirmLine + " " + "Hide Mconfirm"}>
                <input placeholder={"Input your email"} ref={(el) => text = el} />
                <span id="mainPostBtn" onClick={() =>
                    Script.confirmPerson("Mconfirm", text.value, userInfo.email)}>Confirm</span>
            </div>
            {userInfo.ver ? <AiOutlineSafetyCertificate className={s.CommonIcon + " " + s2.Icon} /> :
                myId === userInfo.id ?
                    <AiOutlineSecurityScan className={s.CommonIcon + " " + s2.Icon}
                        onClick={() => Script.openModal("Mconfirm")} />
                    :
                    <AiOutlineSecurityScan className={s.CommonIcon + " " + s2.Icon} />
            }
        </div>
    )
}
export default Ver;