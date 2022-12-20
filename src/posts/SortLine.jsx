import {AiOutlineReload} from "react-icons/ai";
import {useHistory} from "react-router-dom";
import Script from "./postsHelper"
import React from "react";
import s from "./posts.module.css";
import {useTranslation} from "react-i18next";
import {USER_INFORMATION} from "../vars";
import {getItemFromLocalStorage} from "../localStorageService";

function SortLine() {
    const hist = useHistory();
    const id = getItemFromLocalStorage(USER_INFORMATION, "id");
    const {t} = useTranslation();

    return (
        <div className={s.SortLine}>
            <span
                id={"mainPostBtn"}
                onClick={() => Script.getMy(hist, id)}
            >
                <AiOutlineReload/>
                 <span>{t("My")}</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => Script.getNotMy(hist, id)}
            >
                <AiOutlineReload/>
                <span>{t("Not my")}</span>
            </span>
            <span
                id={"mainPostBtn"}
                onClick={() => Script.def(hist)}>
                <AiOutlineReload/>
                <span>{t("All")}</span>
            </span>
        </div>
    )
}

export default SortLine;