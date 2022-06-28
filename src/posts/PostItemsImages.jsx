import s from "./posts.module.css";
import {useEffect, useState} from "react";
import LazyImage from "./LazyImage";
import React from "react";
import {ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {AiOutlineDownload, AiOutlineEye} from "react-icons/ai";
import {GrGallery} from "react-icons/all";
import {downloadFileVersion2} from "../utils";

function PostItemsImages(props) {
    const {
        valueSavedImages,
        openImageViewer
    } = props;

    const [images, setImages] = useState(JSON.parse(valueSavedImages));

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setImages(JSON.parse(valueSavedImages)?.map((img, index) =>
            <LazyImage
                onClick={(e) => {
                    setSelectedImage(index)
                    handleClick(e);
                }}
                key={JSON.parse(img)?.webContentLink}
                imgClass={s.ImgPreview}
                imageSrc={JSON.parse(img)?.webContentLink}
            />
        ))
    }, [])

    return (
        <div
            className={s.ImagesContainer}
            style={{
                position: "relative"
            }}
        >
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={s.ImageMenu}
            >
                <MenuItem onClick={() => {
                    downloadFileVersion2(JSON.parse(JSON.parse(valueSavedImages)[selectedImage])?.webContentLink)
                    handleClose();
                }}>
                    <ListItemIcon>
                        <AiOutlineDownload/>
                    </ListItemIcon>
                    <Typography>Download</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    openImageViewer(selectedImage)
                    handleClose()
                }}>
                    <ListItemIcon>
                        <AiOutlineEye/>
                    </ListItemIcon>
                    <Typography>Preview</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <GrGallery/>
                    </ListItemIcon>
                    <Typography>Add to my Gallery ( Testing )</Typography>
                </MenuItem>
            </Menu>
            {images}
        </div>
    )
}

const MemoizedPostItemsImages = React.memo(PostItemsImages);

export default MemoizedPostItemsImages;