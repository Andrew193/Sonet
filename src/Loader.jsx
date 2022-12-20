import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function Loader(props) {
    const {
        open
    } = props;

    return (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open || false}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}

Loader.propTypes = {
    open: PropTypes.number,
};

export default Loader;