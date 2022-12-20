import Spinner from "../res/img/Spinner-1s-200px.gif";
import React from "react";
import PropTypes from "prop-types";

function Placeholder(props) {
    const {
        id
    } = props;

    return (
        <div id={id}>
            <img src={Spinner} width={"60px"} alt={"Spinner"}/>
        </div>
    );
}

Placeholder.propTypes = {
    id: PropTypes.number
}

export default Placeholder;