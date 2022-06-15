import {Box, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import withPageHeader from "../hoc/withPageHeader";
import Accordion from "./SettingsAccordion";
import AccordionDetails from "./AccordionDetails";
import AccordionSummary from "./AccordionSammary";
import DisplaySettings from "./components/DisplaySettings";
import s from './settings.module.css';

const settingsList = [
    {panelName: "themes", label: "Display", innerContent: <DisplaySettings/>}
]

function SettingsContent() {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const settings = useMemo(() => {
        return settingsList?.map((config) =>
            <Accordion
                expanded={expanded === config?.panelName}
                onChange={handleChange(config?.panelName)}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className={s.Summary}
                >
                    <Typography
                        className={s.Label}
                    >{config?.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>{config?.innerContent}</AccordionDetails>
            </Accordion>)
    }, [expanded])

    return (
        <>
            {settings}
            <div
                className={s.Divider}
            />
        </>
    )
}

export default withPageHeader(SettingsContent, {path: "/settings", Title: "Settings"});