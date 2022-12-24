import CreatePost from "../create-post/CreatePostLine";
import ConfigLine from "./configLine";
import mainPageStyle from "./main-page.module.css"
import React from "react";
import {useTranslation} from "react-i18next";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";
import MaintainedPageHeader from "../components/MaintainedPageHeader";
import {headerListLinks} from "../vars";
import Separator from "../components/common/Separator/Separator";

export type MainPageType = {
    open?: () => void
}

function ClearMainPage(props: MainPageType) {
    const {open} = props;
    const {t} = useTranslation();
    const {settings} = useSettings();

    return (
        <main
            className={mainPageStyle.Container}
            style={{...getEmptyElementsThemeConfig(settings)}}
        >
            <style>
                {`
                 html{
                     background: ${settings?.configs?.background[settings?.background]};
                 }
                `}
            </style>
            <MaintainedPageHeader path={headerListLinks.base} linkPath={headerListLinks.base} linkTitle={t("Home")}/>
            <CreatePost customStyle={{...getEmptyElementsThemeConfig(settings)}}/>
            <Separator
                onClickHandler={(e: React.MouseEvent<HTMLDivElement>) => {
                    const nextElementSibling = (e.target as HTMLDivElement).nextElementSibling;
                    if (nextElementSibling) {
                        nextElementSibling.classList.toggle("Hide")
                    }
                }}
            />
            <ConfigLine open={open} customStyle={{...getEmptyElementsThemeConfig(settings)}}/>
        </main>
    )
}

export default ClearMainPage;