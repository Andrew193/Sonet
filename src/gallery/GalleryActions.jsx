import {Box} from "@mui/material";
import {BsGear} from "react-icons/all";
import s from "./gallery.module.css";

function GalleryActions() {

    return (
        <Box
            className={s.GalleryActions}
        >
            <BsGear/>
        </Box>
    )
}

export default GalleryActions;