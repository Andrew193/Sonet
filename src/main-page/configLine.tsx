import {useHistory} from "react-router";
import s from "./main-page.module.css"
import {buttonsConfig} from "../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import React from "react";

export type CustomStyleType = {
    fontSize: string,
    color: string,
    background: string
}
type ConfigLineType = {
    customStyle: CustomStyleType,
    open?: () => void
}

function ConfigLine(props: ConfigLineType) {
    const {
        customStyle,
        open
    } = props;

    const {t} = useTranslation();
    const history = useHistory();

    return (
        <div
            className={s.ConfigLine}
        >
            <h3
                style={{
                    fontWeight: "bold"
                }}
            >{t("Welcome to Sonet!")}</h3>
            <p
                style={{
                    fontSize: customStyle?.fontSize,
                    background: customStyle?.background,
                }}
            >
                {t("This is the best place to see what is happening in the world. Find some people and topics to follow now or change your information.")}
            </p>
            <p>
                <button
                    className={`button ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => {
                        if (open) {
                            open()
                        }
                        window?.document?.body?.querySelector(".App")?.classList?.add("Open")
                    }}
                >

                    {t("Update your information")}
                </button>
                <button
                    className={`button ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => history.push("/users")}
                >
                    {t("Follow others")}
                </button>
            </p>
        </div>
    )
}

export default ConfigLine;
