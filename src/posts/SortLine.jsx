import {AiOutlineReload} from "react-icons/ai";
import {useHistory} from "react-router-dom";
import Script from "./postsHelper"
import s from "./posts.module.css";
import {useTranslation} from "react-i18next";

function SortLine() {
    const hist = useHistory();
    const id = JSON.parse(localStorage.getItem("userInfo")).id;

    const {t} = useTranslation();

    return (
        <div className={s.SortLine}>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.getMy(hist, id)
                }}
            >
                <AiOutlineReload/>
                 <span>{t("My")}</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.getNotMy(hist, id)
                }}
            >
                <AiOutlineReload/>
                <span>{t("Not my")}</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => {
                    Script.def(hist)
                }}>
                <AiOutlineReload/>
                <span>{t("All")}</span>
            </span>
        </div>
    )
}

export default SortLine;