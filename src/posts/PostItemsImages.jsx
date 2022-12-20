import s from "./posts.module.css";
import {useEffect, useState} from "react";
import LazyImage from "./LazyImage";
import React from "react";
import {ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {AiOutlineDownload, AiOutlineEye} from "react-icons/ai";
import {GrGallery} from "react-icons/all";
import {downloadFileVersion2} from "../utils";
import {addPhotoToMyGallery} from "./postsHelper";
import {notify} from "../App";
import {useTranslation} from "react-i18next";
import {USER_INFORMATION} from "../vars";
import {getItemFromLocalStorage} from "../localStorageService";
import {v4 as uuidv4} from 'uuid';
import PropTypes from "prop-types";

function PostItemsImages(props) {
    const {
        valueSavedImages,
        openImageViewer,
        valueUserId
    } = props;

    const [images, setImages] = useState(JSON.parse(valueSavedImages));
    const id = getItemFromLocalStorage(USER_INFORMATION, "id");

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
                wrapperClassName={"post-images-lazy-cover"}
                wrapperStyle={{
                    height: "250px",
                }}
                key={uuidv4()}
                imgClass={s.ImgPreview}
                imageSrc={JSON.parse(img)?.webContentLink}
            />
        ))
    }, [])

    const {t} = useTranslation();

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
                    <Typography>{t("Download")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    openImageViewer(selectedImage)
                    handleClose()
                }}>
                    <ListItemIcon>
                        <AiOutlineEye/>
                    </ListItemIcon>
                    <Typography>{t("Preview")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    addPhotoToMyGallery({
                        src: JSON.parse(valueSavedImages)[selectedImage],
                        userId: id,
                        shared: true,
                        sharedUser: valueUserId
                    }, () => {
                        notify("Added")
                    }, (errorMessage) => {
                        notify(errorMessage || "Error");
                    })
                    handleClose()
                }}>
                    <ListItemIcon>
                        <GrGallery/>
                    </ListItemIcon>
                    <Typography>{t("Add to my Gallery")}</Typography>
                </MenuItem>
            </Menu>
            {images}
        </div>
    )
}

PostItemsImages.propTypes = {
    valueSavedImages: PropTypes.string,
    openImageViewer: PropTypes.func,
    valueUserId: PropTypes.number
}

const MemoizedPostItemsImages = React.memo(PostItemsImages);

export default MemoizedPostItemsImages;