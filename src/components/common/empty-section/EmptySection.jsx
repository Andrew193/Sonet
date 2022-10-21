import {TbMoodCry} from "react-icons/all";
import {Typography} from "@mui/material";


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

export default EmptySection;