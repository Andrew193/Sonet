import {Backdrop, Box, CircularProgress, Slider, Typography} from "@mui/material";
import s from '../settings.module.css'
import React from "react";
import {useEffect, useMemo, useState} from "react";
import {AiOutlineCheck, FiSettings, GiCheckMark} from "react-icons/all";
import {updateSettings} from "../../db";
import {buttonsConfig} from "../../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import {useDragAndDrop} from "../../drag-drop/useDragAndDrop";
import OuterDragAndDropContainer from "../../drag-drop/OuterDragAndDropContainer";
import HeaderLink from "../../header/HeaderLink";
import {useSettings} from "../../hooks";
import PropTypes from "prop-types";

const marks = [
    {
        value: 16,
        label: 'Default',
    },
    {
        value: 10,
        label: 'Extra Small',
    },
    {
        value: 13,
        label: 'Small',
    },
    {
        value: 20,
        label: 'Large',
    },
    {
        value: 23,
        label: 'Extra Large'
    }
];

const colorsConfig = [
    {class: s.Default2, id: -1},
    {class: s.Red, id: 0},
    {class: s.Orange, id: 1},
    {class: s.Green, id: 2},
    {class: s.Default, id: 3},
    {class: s.Coral, id: 4},
    {class: s.Special_1, id: 5},
    {class: s.Special_2, id: 6},
    {class: s.Special_3, id: 7}
]

const backgroundConfig = [
    {class: s.Default2, id: -1, label: "Default"},
    {class: s.White, id: 0, label: "White"},
    {class: s.Black, id: 1, label: "Black"},
    {class: s.Blue, id: 2, label: "Blue"},
]

function HeaderListPageRow(props) {
    const {item} = props;

    const {t} = useTranslation();
    return (<HeaderLink
        linkConfig={item}
        t={t}
        settings={{}}
        key={item?.label}
    />)
}

HeaderListPageRow.propTypes = {
    item: PropTypes.object
}

function DisplaySettings() {
    const {settings} = useSettings();
    const [selectedColor, setSelectedColor] = useState(-1);
    const [selectedBack, setSelectedBack] = useState(-1);
    const [fontSize, setFontSize] = useState(16);
    const [selectHeaderColor, setSelectedHeaderColor] = useState("#ffffff00");
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();

    const colors = useMemo(() => colorsConfig?.map(config =>
        <div
            key={config?.id}
            className={config?.class + " " + s.Badge + ` ${selectedColor === config?.id ? s.SelectedBadge : ""}`}
            id={config?.id}
            onClick={() => setSelectedColor(config?.id)}
        >
            <AiOutlineCheck/>
        </div>), [selectedColor])

    const backs = useMemo(() => backgroundConfig?.map(config =>
        <div
            key={config?.id}
            className={config?.class + " " + s.Badge + " " + s.BackBadge + ` ${selectedBack === config?.id ? s.SelectedBadge : ""}`}
            id={config?.id}
            onClick={() => setSelectedBack(config?.id)}
        >
            <span>{t("" + config?.label + "")}</span><AiOutlineCheck/>
        </div>), [selectedBack])

    function defaultSettingsHandler() {
        settingsCover(() => updateSettings({
            color: -1,
            background: -1,
            fontSize: -1,
            configs: settings?.configs
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

    const [headerFields, setHeaderFields] = useState([]);
    const DragAndDropConfig = useDragAndDrop(setHeaderFields, headerFields, {
        isOrderChangeMode: true,
        formId: 0,
        buttons: []
    }, HeaderListPageRow);

    function saveSettingsHandler() {
        settingsCover(() => updateSettings({
            color: selectedColor,
            background: selectedBack,
            fontSize: fontSize === 16 ? -1 : fontSize,
            configs: settings?.configs,
            headerColor: selectHeaderColor,
            headerConfig: headerFields
        }, 1))
    }

    useEffect(() => {
        if (settings?.headerConfig) {
            setHeaderFields(() => settings?.headerConfig)
        }
    }, [settings?.headerConfig]);

    useEffect(() => {
        if (settings) {
            setSelectedBack(settings?.background);
            setSelectedColor(settings?.color);
            setFontSize(settings?.fontSize);
            setSelectedHeaderColor(settings?.headerColor)
        }
    }, [settings]);

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open || false}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Font Size")}</Typography>
                <div className={s.FontContainer}>
                    <Slider
                        defaultValue={fontSize === -1 ? 16 : fontSize}
                        step={null}
                        marks={marks}
                        min={10}
                        max={23}
                        value={fontSize === -1 ? 16 : fontSize}
                        onChange={(e, value) => setFontSize(value)}
                    />
                </div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Color")}</Typography>
                <div className={s.FontContainer + " " + s.ColorsLine}>{colors}</div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Background")}</Typography>
                <div className={s.FontContainer + " " + s.ColorsLine}>{backs}</div>
            </Box>

            <Box className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Header link hover color")}</Typography>
                <div className={s.FontContainer + " " + s.ColorsLine}>
                    <div className={s.ColorPickerContainer}>
                        <label htmlFor={"color"}>Color picker:</label>
                        <input type={"color"} name={"color"} id={"color"}
                               onBlur={(e) => setSelectedHeaderColor(e.target.value)}
                        />
                    </div>
                    <div className={s.ColorPickerContainer}>
                        <label>Selected color:</label>
                        <span style={{color: `${selectHeaderColor}`, margin: "10px"}}>{selectHeaderColor}</span>
                    </div>
                </div>
            </Box>

            <table className={s.FontMainContainer}>
                <Typography className={s.FontLabel}>{t("Header order")}</Typography>
                <OuterDragAndDropContainer
                    isOrderChangeMode={true}
                    DragAndDropConfig={DragAndDropConfig}
                />
            </table>

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

export default DisplaySettings;