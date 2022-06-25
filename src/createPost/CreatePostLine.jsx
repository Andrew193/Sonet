import s from "./create-post.module.css"
import Script from "./script"
import {useContext, useRef} from "react";
import Context from "../helpers/contextHelper"
import {BiImageAdd, BsPencil} from "react-icons/all";

export const buttonsConfig = {
    "#FF0000": s.RedButton,
    "#FFA500": s.YellowButton,
    "#008000": s.GreenButton,
    "#0a00ce": s.BlueButton,
    "#FF7F50": s.CoralButton,
    "#bd9d33": s.GoldButton,
    "#2177e8": s.SkyButton,
    "#b32dd2": s.PurpleButton
}

function CreatePost(props) {
    const {
        customStyle
    } = props;

    let text = useRef();
    let image = useRef();

    const {socket, notify} = useContext(Context);

    return (
        <div className={s.Container}>
            <form>
                <input
                    ref={(el) => image = el}
                    type="file"
                    style={{display: "none"}}
                />
            </form>
            <textarea
                ref={(el) => text = el}
                className={s.InputPostText}
                placeholder={"Input your post text"}
                style={{
                    fontSize: customStyle?.fontSize
                }}
            />
            <p>
                <button
                    className={`button btn btn-default ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => Script.AddImage(image)}
                >
                    <BiImageAdd />
                    Attach image
                </button>
                <button
                    className={`button btn btn-default ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => {
                        window?.document?.body?.querySelector(".App")?.classList?.remove("Open")
                        Script.CreatePost(text.value, notify, text, socket, image)
                    }}
                >
                    <BsPencil />
                    Create Post
                </button>
            </p>
        </div>
    )
}

export default CreatePost;