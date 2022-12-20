import CreatePost from "../create-post/CreatePostLine";
import ConfigLine from "./configLine";
import s from "./main-page.module.css"
import React from "react";
import {useTranslation} from "react-i18next";
import {useSettings} from "../hooks";
import {MainPageType} from "./MainPageContainer";
import {getEmptyElementsThemeConfig} from "../utils";
import MaintainedPageHeader from "../components/MaintainedPageHeader";

function ClearMainPage(props: MainPageType) {
    const {open} = props;
    const {t} = useTranslation();
    const {settings} = useSettings();

    return (
        <main
            className={s.Container}
            style={{...getEmptyElementsThemeConfig(settings)}}
        >
            <style>
                {`
                 html{
                     background: ${settings?.configs?.background[settings?.background]};
                 }
                `}
            </style>
            <MaintainedPageHeader path={"/"} linkPath={"/"} linkTitle={t("Home")}/>
            <CreatePost customStyle={{...getEmptyElementsThemeConfig(settings)}}/>
            <div
                className={"Separator"}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    const nextElementSibling = (e.target as HTMLDivElement).nextElementSibling;
                    if (nextElementSibling) {
                        nextElementSibling.classList.toggle("Hide")
                    }
                }}
            />
            <ConfigLine
                open={open}
                customStyle={{...getEmptyElementsThemeConfig(settings)}}
            />
        </main>
    )
}

export default ClearMainPage;