import ClearMainPage from "./ClearMainPage";
import React from "react";

export type MainPageType = {
    open?: () => void
}

function MainPage(props: MainPageType) {
    const {open} = props;

    return (<ClearMainPage open={open}/>)
}

export default MainPage;