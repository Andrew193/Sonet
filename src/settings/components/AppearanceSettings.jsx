import {Backdrop, Box, CircularProgress, Slider, Typography} from "@mui/material";
import s from '../settings.module.css'
import {useEffect, useMemo, useState} from "react";
import {FiSettings, GiCheckMark} from "react-icons/all";
import {getSettings, updateSettings} from "../../db";
import {buttonsConfig} from "../../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import {getElementsThemeConfig} from "../../utils";

const marks = [
    {
        value: 0,
        label: 'None',
    },
    {
        value: 5,
        label: 'Extra Small',
    },
    {
        value: 10,
        label: 'Small',
    },
    {
        value: 15,
        label: 'Medium',
    },
    {
        value: 20,
        label: 'Large',
    }
];

function AppearanceSettings() {
    const [settings, setSettings] = useState({})
    const [borderRadius, setBorderRadius] = useState(0);
    const [margin, setMargin] = useState(0);
    const [padding, setPadding] = useState(0);
    const [boxShadow, setBoxShadow] = useState(false);
    const [viewType, setViewType] = useState("plain");
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();

    const exampleStyles = useMemo(() => ({
        borderRadius: viewType === "fantastic" ? `${borderRadius}px ${borderRadius * 1.5}px 5px ${borderRadius + 20}px` :
            viewType === "italic" ? `${borderRadius}px ${borderRadius + 10}px` : `${borderRadius}px`,
        margin: `${margin}px`,
        padding: `${padding}px`,
        ...getElementsThemeConfig(settings, {isBoxShadow: !!boxShadow}),
    }), [borderRadius, viewType, margin, padding, boxShadow])

    function saveSettingsHandler() {
        settingsCover(() => updateSettings({
            ...settings,
            list: {
                viewType,
                borderRadius,
                listItemStyles: exampleStyles,
                margin,
                padding,
                boxShadow
            }
        }, 1))
    }

    function defaultSettingsHandler() {
        settingsCover(() => updateSettings({
            ...settings,
            list: {
                viewType: "plain",
                borderRadius: 0,
                listItemStyles: "",
                margin: 0,
                padding: 0,
                boxShadow: false
            }
        }, 1))
    }

    function settingsCover(callBack) {
        setOpen(() => true);

        callBack();

        setTimeout(() => {
            setOpen(() => false)
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        async function getSettingsConfig() {
            const response = await getSettings();

            setSettings(response[0]);
            setBorderRadius(response[0]?.list?.borderRadius);
            setViewType(response[0]?.list?.viewType);
            setMargin(response[0]?.list?.margin);
            setPadding(response[0]?.list?.padding);
            setBoxShadow(response[0]?.list?.boxShadow);
        }

        getSettingsConfig();
    }, [])

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Border radius")}</Typography>
                <div className={s.FontContainer}>
                    <Slider
                        defaultValue={borderRadius}
                        step={null}
                        marks={marks}
                        min={0}
                        max={20}
                        value={borderRadius}
                        onChange={(e, value) => setBorderRadius(value)}
                    />
                </div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Margin")}</Typography>
                <div className={s.FontContainer}>
                    <Slider
                        defaultValue={margin}
                        step={null}
                        marks={marks}
                        min={0}
                        max={20}
                        value={margin}
                        onChange={(e, value) => {
                            setMargin(value)
                        }}
                    />
                </div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Padding")}</Typography>
                <div className={s.FontContainer}>
                    <Slider
                        defaultValue={padding}
                        step={null}
                        marks={marks}
                        min={0}
                        max={20}
                        value={padding}
                        onChange={(e, value) => setPadding(value)}
                    />
                </div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("List item type")}</Typography>
                <div className={s.FontContainer + ' ' + s.ListStyleContainer}>
                    <div className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                         style={{color: `${viewType === "plain" ? "red" : ""}`}}
                         onClick={() => setViewType("plain")}
                    >
                        {t("Plain")}
                    </div>
                    <div className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                         style={{color: `${viewType === "italic" ? "red" : ""}`}}
                         onClick={() => setViewType("italic")}
                    >
                        {t("Italic")}
                    </div>
                    <div className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                         style={{color: `${viewType === "fantastic" ? "red" : ""}`}}
                         onClick={() => setViewType("fantastic")}
                    >
                        {t("Fantastic")}
                    </div>
                </div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Box shadow")}</Typography>
                <div className={s.FontContainer + ' ' + s.ListStyleContainer}>
                    <div className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                         style={{color: `${boxShadow ? "red" : ""}`}}
                         onClick={() => {
                             setBoxShadow(true)
                         }}
                    >
                        {t("Yes")}
                    </div>
                    <div className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                         style={{color: `${!boxShadow ? "red" : ""}`}}
                         onClick={() => {
                             setBoxShadow(false)
                         }}
                    >
                        {t("No")}
                    </div>
                </div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Example")}</Typography>
                <div className={s.ExampleBlock} style={exampleStyles}>
                    <div/>
                </div>
                <div className={s.ExampleBlock} style={exampleStyles}>
                    <div/>
                </div>
            </Box>

            <Box className={s.Actions}>
                <button
                    className={`button btn btn-default ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                    onClick={defaultSettingsHandler}
                >
                    <FiSettings/>
                    {t("Default settings")}
                </button>
                <button
                    className={`button btn btn-default  ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                    onClick={saveSettingsHandler}
                >
                    <GiCheckMark/>
                    {t("Save")}
                </button>
            </Box>
        </>
    )
}

export default AppearanceSettings;