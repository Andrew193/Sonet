import { AiOutlineReload } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Script from "./script.js"
import s from "./posts.module.css";
function SortLine() {
    const hist=useHistory();
    const id=JSON.parse(localStorage.getItem("userInfo")).id
    return (
        <div className={s.SortLine}>
            <button className={"button"} onClick={()=>Script.getMy(hist,id)}>
                <AiOutlineReload /><span>Get my</span>
            </button>
            <button className={"button"} onClick={() => Script.getNotMy(hist,id)}>
                <AiOutlineReload /><span>Get not my</span>
            </button>
            <button className={"button"} onClick={()=>Script.def(hist)}>
                <AiOutlineReload /><span>Get all</span>
            </button>
        </div>
    )
}

export default SortLine;