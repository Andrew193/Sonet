import React, {useMemo} from "react";

type SeparatorType = {
    onClickHandler?: any
}

function basicSeparatorOnClick(event: any) {
    event.target.nextElementSibling.classList.toggle("Hide")
}

function Separator(props: SeparatorType) {
    const {
        onClickHandler
    } = props;

    const separatorOnClick = useMemo(() => onClickHandler || basicSeparatorOnClick, [onClickHandler]);

    return (<div className={"Separator"} onClick={(event: any) => separatorOnClick(event)}/>)
}

export default Separator;