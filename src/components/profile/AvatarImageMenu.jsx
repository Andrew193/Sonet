import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {downloadFile} from "../../utils";
import {AiOutlineDownload, AiOutlineEye} from "react-icons/ai";
import UserHelper from "../../helpers/userHelper";
import {BsPen} from "react-icons/all";
import ImageViewer from "react-simple-image-viewer";
import {useCallback, useState} from "react";
import {useRef} from "react";
import {useTranslation} from "react-i18next";
import React from "react";
import PropTypes from "prop-types";

function AvatarImageMenu(props) {
    const {
        anchorEl,
        open,
        handleClose,
        image,
        backStyle,
        avatarUrl,
        avatarId
    } = props;

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [image];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    let imageAvatar = useRef();
    const {t} = useTranslation();

    return (
        <>
            <form>
                <input
                    ref={(el) => imageAvatar = el}
                    onChange={() => UserHelper.updateImage(imageAvatar, "setAvatar", avatarId)}
                    type="file"
                    style={{display: "none"}}
                />
            </form>

            <Menu
                className={"menuUserModal"}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        downloadFile(avatarUrl)
                    }}
                >
                    <ListItemIcon>
                        <AiOutlineDownload/>
                    </ListItemIcon>
                    <ListItemText>{t("Download")}</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={(event) => {
                        handleClose(event)
                        UserHelper.CallImageInput(imageAvatar)
                    }}
                >
                    <ListItemIcon>
                        <BsPen/>
                    </ListItemIcon>
                    <ListItemText>{t("Update my Avatar")}</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={(event) => {
                        handleClose(event)
                        openImageViewer(0)
                    }}
                >
                    <ListItemIcon>
                        <AiOutlineEye/>
                    </ListItemIcon>
                    <ListItemText>{t("Preview")}</ListItemText>
                </MenuItem>
            </Menu>

            {isViewerOpen && (
                <ImageViewer
                    backgroundStyle={{
                        background: backStyle,
                        zIndex: 10
                    }}
                    src={images}
                    currentIndex={currentImage}
                    disableScroll
                    closeOnClickOutside
                    onClose={closeImageViewer}
                />
            )}
        </>
    )
}

AvatarImageMenu.propTypes = {
    anchorEl: PropTypes.object,
    open: PropTypes.any,
    handleClose: PropTypes.func,
    image: PropTypes.any,
    backStyle: PropTypes.string,
    avatarUrl: PropTypes.any,
    avatarId: PropTypes.string
};

export default AvatarImageMenu;