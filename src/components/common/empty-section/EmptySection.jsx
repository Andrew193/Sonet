import {TbMoodCry} from "react-icons/all";
import {Typography} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function EmptySection(props) {
    const {
        title,
        message
    } = props;

    return (
        <div className={"empty-table"}>
            <TbMoodCry/>
            <Typography
                variant={"p"}
                component={"p"}
            >{message}</Typography>
            <Typography
                variant={"h3"}
                component={"h3"}
            >{title}</Typography>
        </div>
    )
}

EmptySection.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
};

export default EmptySection;