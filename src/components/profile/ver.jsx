import s from "./style.module.css"
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
                <button className={"button"} onClick={() =>
                    Script.confirmPerson("Mconfirm", text.value, userInfo.email)}>Confirm account</button>
            </div>
            {userInfo.ver ? <AiOutlineSafetyCertificate className={s.CommonIcon + " " + s.Icon} /> :
                myId === userInfo.id ?
                    <AiOutlineSecurityScan className={s.CommonIcon + " " + s.Icon}
                        onClick={() => Script.openModal("Mconfirm")} />
                    :
                    <AiOutlineSecurityScan className={s.CommonIcon + " " + s.Icon} />
            }
        </div>
    )
}
export default Ver;