import {Typography} from "@mui/material";
import React from "react";
import {useMemo, useState} from "react";
import withPageHeader from "../hoc/withPageHeader";
import Accordion from "./SettingsAccordion";
import AccordionDetails from "./AccordionDetails";
import AccordionSummary from "./AccordionSammary";
import DisplaySettings from "./components/DisplaySettings";
import s from './settings.module.css';
import AppearanceSettings from "./components/AppearanceSettings";
import {useTranslation} from "react-i18next";
import GeneralSettings from "./components/GeneralSettings";
import PropTypes from "prop-types";


const settingsList = [
    {panelName: "themes", label: "Display", innerContent: <DisplaySettings/>},
    {panelName: "appearance", label: "Appearance", innerContent: <AppearanceSettings/>},
    {panelName: "general", label: "General", innerContent: <GeneralSettings/>}
]

function SettingsContent(props) {
    const {
        settingsStyles
    } = props;

    const [expanded, setExpanded] = useState('panel1');
    const {t, i18n} = useTranslation();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const settings = useMemo(() => {
        return settingsList?.map((config) =>
            <Accordion
                key={config?.panelName}
                expanded={expanded === config?.panelName}
                onChange={handleChange(config?.panelName)}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className={s.Summary}
                    style={{
                        color: settingsStyles?.configs?.color[settingsStyles?.color],
                        fontSize: settingsStyles?.configs?.size[settingsStyles?.fontSize],
                    }}
                    iconstyle={{
                        color: settingsStyles?.configs?.color[settingsStyles?.color],
                        fontSize: settingsStyles?.configs?.size[settingsStyles?.fontSize]
                    }}
                >
                    <Typography
                        style={{
                            color: `${settingsStyles?.configs?.color[settingsStyles?.color]}!important`
                        }}
                        className={s.Label}
                    >{t("" + config?.label + "")}</Typography>
                </AccordionSummary>
                <AccordionDetails
                    style={{
                        color: settingsStyles?.configs?.color[settingsStyles?.color]
                    }}
                >{config?.innerContent}</AccordionDetails>
            </Accordion>)
    }, [expanded, i18n?.language])

    return (
        <>
            {settings}
            <div className={s.Divider}/>
        </>
    )
}

SettingsContent.propTypes = {
    settingsStyles: PropTypes.object
}

export default withPageHeader(SettingsContent, {path: "/settings", Title: <span>Settings</span>});