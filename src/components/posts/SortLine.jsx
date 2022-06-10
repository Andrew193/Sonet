import {AiOutlineReload} from "react-icons/ai";
import {useHistory} from "react-router-dom";
import Script from "./script.js"
import s from "./posts.module.css";

function SortLine() {
    const hist = useHistory();
    const id = JSON.parse(localStorage.getItem("userInfo")).id
    return (
        <div className={s.SortLine}>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.getMy(hist, id)
                }}
            >
                <AiOutlineReload/>
                <span>Get my posts</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.getNotMy(hist, id)
                }}
            >
                <AiOutlineReload/>
                <span>Get not my posts</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.def(hist)
                }}>
                <AiOutlineReload/>
                <span>Get all posts</span>
            </span>
        </div>
    )
}

export default SortLine;