import {Link} from "react-router-dom";
import CreatePost from "../create-post/CreatePostLine";
import ConfigLine from "./configLine";
import s from "./main-page.module.css"
import React from "react";
import {useTranslation} from "react-i18next";
import {useSettings} from "../hooks";
import {MainPageType} from "./MainPageContainer";
import PageHeader from "../components/common/navigationLine/NavigationLine";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";

function ClearMainPage(props: MainPageType) {
    const {open} = props;
    const {t} = useTranslation();
    const {settings} = useSettings();

    return (
        <main
            className={s.Container}
            style={{...getElementsThemeConfig(settings, getPropertiesConfig(false, '', true, '',
                    null, null))}}
        >
            <style>
                {`
                 html{
                     background: ${settings?.configs?.background[settings?.background]};
                 }
                `}
            </style>
            <PageHeader> <Link
                to={{pathname: "/"}}
                style={{...getElementsThemeConfig(settings, getPropertiesConfig(false, '', false, '',
                        "rgb(0, 0, 0)"))}}
            >{t("Home")}</Link></PageHeader>
            <CreatePost customStyle={{...getElementsThemeConfig(settings, getPropertiesConfig(false, '',
                    false, '', null, null))}}/>
            <div
                className={"Separator"}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    const nextElementSibling = (e.target as HTMLDivElement).nextElementSibling;
                    nextElementSibling!.classList.toggle("Hide")
                }}
            />
            <ConfigLine
                open={open}
                customStyle={{...getElementsThemeConfig(settings, getPropertiesConfig(false, '',
                        false, '', null, null))}}
            />
        </main>
    )
}

export default ClearMainPage;