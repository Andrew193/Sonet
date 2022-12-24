import React, {useMemo} from "react";

type SeparatorType = {
    onClickHandler?: any
}

function basicSeparatorOnClick(e: any) {
    e.target.nextElementSibling.classList.toggle("Hide")
}

function Separator(props: SeparatorType) {
    const {
        onClickHandler
    } = props;

    const separatorOnClick = useMemo(() => onClickHandler || basicSeparatorOnClick, [onClickHandler]);

    return (<div className={"Separator"} onClick={(e: any) => separatorOnClick(e)}/>)
}

export default Separator;