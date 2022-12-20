import React from 'react';
import PropTypes from "prop-types";

function Placeholder(props) {
    const {
        id
    } = props;

    return (
        <div className="lds-roller" id={id}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}

Placeholder.propTypes = {
    id: PropTypes.number
}

export default Placeholder;