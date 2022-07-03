import {Box, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {AiOutlineDelete, AiOutlineMedium, BsGear, TbLetterB} from "react-icons/all";
import s from "./gallery.module.css";
import {useMemo, useState} from "react";
import {downloadFileVersion2} from "../utils";
import {AiOutlineDownload} from "react-icons/ai";

function GalleryActions() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [size, setSize] = useState({min: 190, max: 135})
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const cssStyleString = useMemo(() => {
        return `
                .${s.ImagesContainer} > p > div > div {
                min-height: ${size.min}px;
                min-width: ${size.max}px;
                }
                `
    }, [size])

    return (
        <Box
            className={s.GalleryActions}
        >
            <style>{cssStyleString}</style>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={s.ImageMenu}
            >
                <MenuItem onClick={() => {

                }}>
                    <ListItemIcon>
                        <AiOutlineDelete/>
                    </ListItemIcon>
                    <Typography>Clear my gallery</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    setSize({min: 435, max: 320})
                    handleClose();
                }}>
                    <ListItemIcon>
                        <AiOutlineMedium/>
                    </ListItemIcon>
                    <Typography>Large images size</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    setSize({min: 350, max: 215})
                    handleClose();
                }}>
                    <ListItemIcon>
                        <AiOutlineMedium/>
                    </ListItemIcon>
                    <Typography>Medium images size</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    setSize({min: 190, max: 135})
                    handleClose();
                }}>
                    <ListItemIcon>
                        <TbLetterB/>
                    </ListItemIcon>
                    <Typography>Basic images size</Typography>
                </MenuItem>
            </Menu>

            <BsGear
                onClick={(e) => {
                    handleClick(e)
                }}
            />
        </Box>
    )
}

export default GalleryActions;