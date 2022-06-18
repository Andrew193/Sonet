import {Backdrop, Box, CircularProgress, Slider, Typography} from "@mui/material";
import s from '../settings.module.css'
import {useEffect, useMemo, useState} from "react";
import {AiOutlineCheck} from "react-icons/all";
import {getSettings, updateSettings} from "../../db";
import {buttonsConfig} from "../../createPost/CreatePostLine";

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

function DisplaySettings() {
    const [settings, setSettings] = useState({})
    const [selectedColor, setSelectedColor] = useState(-1);
    const [selectedBack, setSelectedBack] = useState(-1);
    const [fontSize, setFontSize] = useState(16);
    const [open, setOpen] = useState(false);

    const colors = useMemo(() => colorsConfig?.map(config =>
        <div
            className={config?.class + " " + s.Badge + ` ${selectedColor === config?.id ? s.SelectedBadge : ""}`}
            id={config?.id}
            onClick={() => {
                setSelectedColor(config?.id)
            }}
        >
            <AiOutlineCheck/>
        </div>), [selectedColor])

    const backs = useMemo(() => backgroundConfig?.map(config =>
        <div
            className={config?.class + " " + s.Badge + " " + s.BackBadge + ` ${selectedBack === config?.id ? s.SelectedBadge : ""}`}
            id={config?.id}
            onClick={() => {
                setSelectedBack(config?.id)
            }}
        >
            <span>{config?.label}</span><AiOutlineCheck/>
        </div>
    ), [selectedBack])

    function saveSettingsHandler() {
        settingsCover(() => updateSettings({
            color: selectedColor,
            background: selectedBack,
            fontSize: fontSize === 16 ? -1 : fontSize,
            configs: settings?.configs
        }, 1))
    }

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

    useEffect(() => {
        async function getSettingsConfig() {
            const response = await getSettings();

            setSettings(response[0])
            setSelectedBack(response[0]?.background);
            setSelectedColor(response[0]?.color);
            setFontSize(response[0]?.fontSize);
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

            <Box
                className={s.FontMainContainer}
            >
                <Typography
                    className={s.FontLabel}
                >Font Size</Typography>
                <div
                    className={s.FontContainer}
                >
                    <Slider
                        defaultValue={fontSize === -1 ? 16 : fontSize}
                        step={null}
                        marks={marks}
                        min={10}
                        max={23}
                        value={fontSize === -1 ? 16 : fontSize}
                        onChange={(e, value) => {
                            setFontSize(value)
                        }}
                    />
                </div>
            </Box>

            <Box
                className={s.FontMainContainer}
            >
                <Typography
                    className={s.FontLabel}
                >Color</Typography>
                <div
                    className={s.FontContainer + " " + s.ColorsLine}
                >
                    {colors}
                </div>
            </Box>

            <Box
                className={s.FontMainContainer}
            >
                <Typography
                    className={s.FontLabel}
                >Background</Typography>
                <div
                    className={s.FontContainer + " " + s.ColorsLine}
                >
                    {backs}
                </div>
            </Box>

            <Box
                className={s.Actions}
            >
                <button
                    className={`button btn btn-default ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                    onClick={defaultSettingsHandler}
                >Default settings
                </button>
                <button
                    className={`button btn btn-default  ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                    onClick={saveSettingsHandler}
                >Save
                </button>
            </Box>
        </>
    )
}

export default DisplaySettings;