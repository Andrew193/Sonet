import Spinner from "./Spinner.gif"
import React from "react";

function Loading() {
    return (<img style={{width: 50 + "px", marginRight: 5 + "%"}} src={Spinner} alt={"Spinner"}/>)
}

export default Loading;