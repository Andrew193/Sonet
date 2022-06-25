import {AiOutlineReload} from "react-icons/ai";
import {useHistory} from "react-router-dom";
import Script from "./postsHelper"
import s from "./posts.module.css";

function SortLine() {
    const hist = useHistory();
    const id = JSON.parse(localStorage.getItem("userInfo")).id;

    return (
        <div className={s.SortLine}>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.getMy(hist, id)
                }}
            >
                <AiOutlineReload/>
                 <span>My</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.getNotMy(hist, id)
                }}
            >
                <AiOutlineReload/>
                <span>Not my</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.def(hist)
                }}>
                <AiOutlineReload/>
                <span>All</span>
            </span>
        </div>
    )
}

export default SortLine;