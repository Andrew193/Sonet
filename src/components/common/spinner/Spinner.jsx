import Spin from "./Spinner.gif"
import React from "react";

function Loading() {
    return (
        <img style={{width: 50 + "px", marginRight: 5 + "%"}} src={Spin} alt={"Spinner"}/>
    )
}
export default Loading;