import GalleryStyles from "./gallery.module.css";
import {Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function GalleryMode(props) {
    const {
        selected,
        setSelected
    } = props;

    const {t} = useTranslation();

    return (
        <Typography className={GalleryStyles.Navigation}>
            <span
                id={"mainPostBtn"}
                style={{background: !selected ? "red" : ""}}
                onClick={() => setSelected(0)}
            >
                {t("All")}
            </span>
            <span
                id={"mainPostBtn"}
                style={{background: selected ? "red" : ""}}
                onClick={() => setSelected(1)}
            >
                {t("Folders")}
            </span>
        </Typography>
    )
}

GalleryMode.propTypes = {
    selected: PropTypes.number,
    setSelected: PropTypes.func
}

export default GalleryMode;