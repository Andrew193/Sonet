import {Link} from "react-router-dom";
import CreatePost from "../create-post/CreatePostLine";
import ConfigLine from "./configLine";
import s from "./main-page.module.css"
import React from "react";
import {useTranslation} from "react-i18next";
import {useSettings} from "../hooks";
import {MainPageType} from "./MainPageContainer";

function ClearMainPage(props: MainPageType) {
    const {open} = props;
    const {t} = useTranslation();
    const {settings} = useSettings();

    return (
        <main
            className={s.Container}
            style={{
                fontSize: settings?.configs?.size[settings?.fontSize],
                color: settings?.configs?.color[settings?.color],
                background: settings?.configs?.background[settings?.background],
                borderRight: `1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"}`
            }}
        >
            <style>
                {`
                 html{
                     background: ${settings?.configs?.background[settings?.background]};
                 }
                `}
            </style>
            <div
                className={"basicPageHead"}
                style={{
                    borderBottom: `1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"}`,
                    color: settings?.configs?.color[settings?.color],
                }}
            >
                <Link
                    to={{pathname: "/"}}
                    style={{
                        fontSize: settings?.configs?.size[settings?.fontSize],
                        background: settings?.configs?.background[settings?.background],
                    }}
                >{t("Home")}</Link>
            </div>
            <CreatePost
                customStyle={{
                    fontSize: settings?.configs?.size[settings?.fontSize],
                    color: settings?.configs?.color[settings?.color],
                    background: settings?.configs?.background[settings?.background],
                }}
            />
            <div
                className={"Separator"}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    const nextElementSibling = (e.target as HTMLDivElement).nextElementSibling;
                    nextElementSibling!.classList.toggle("Hide")
                }}
            />
            <ConfigLine
                open={open}
                customStyle={{
                    fontSize: settings?.configs?.size[settings?.fontSize],
                    color: settings?.configs?.color[settings?.color],
                    background: settings?.configs?.background[settings?.background],
                }}
            />
        </main>
    )
}

export default ClearMainPage;