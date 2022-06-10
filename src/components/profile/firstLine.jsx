import s from "./profile.module.css"
import Script from "./script.js"
import {AiOutlineHighlight} from "react-icons/ai";
import UserHelper from "../../helpers/userHelper"
import {useRef} from "react";

function FirstLine(props) {
    const {
        imgUrl,
        myId,
        id
    } = props;

    let image = useRef();

    return (
        <>
            <form>
                <input
                    ref={(el) => image = el}
                    onChange={() => UserHelper.updateImage(image, "setAvatar")}
                    type="file"
                    style={{display: "none"}}
                />
            </form>
            <div className={s.FirstLine}>
                <img
                    alt={"Avatar"}
                    src={JSON.parse(imgUrl)?.webContentLink}
                    onClick={() => (myId === id) && UserHelper.CallImageInput(image)}
                />
                {myId === id && <button onClick={() => Script.openModal("Muser")}>
                    <AiOutlineHighlight className={s.CommonIcon}/>Set up profile
                </button>}
            </div>
        </>)
}

export default FirstLine;