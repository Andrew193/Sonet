import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {downloadFile} from "../../utils";
import spareBacImg from "./img/luxfon.com-4767.jpg";
import {AiOutlineDownload, AiOutlineEye} from "react-icons/ai";
import UserHelper from "../../helpers/userHelper";
import {BsPen} from "react-icons/all";
import {useCallback, useState} from "react";
import ImageViewer from 'react-simple-image-viewer';
import {useRef} from "react";

function BackImageMenu(props) {
    const {
        anchorEl,
        open,
        userInfoBack,
        handleClose,
        image,
        backStyle,
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

    let imageRef = useRef();

    return (
        <>
            <form>
                <input
                    ref={(el) => imageRef = el}
                    onChange={() => UserHelper.updateImage(imageRef, "setBack")}
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
                aria-haspopup="true"
            >
                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        downloadFile(JSON.parse(userInfoBack)?.webContentLink || spareBacImg)
                    }}
                >
                    <ListItemIcon>
                        <AiOutlineDownload/>
                    </ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        UserHelper.CallImageInput(imageRef)
                    }}
                >
                    <ListItemIcon>
                        <BsPen/>
                    </ListItemIcon>
                    <ListItemText>Update my Back</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={(e) => {
                        handleClose(e)
                        openImageViewer(0)
                    }}
                >
                    <ListItemIcon>
                        <AiOutlineEye/>
                    </ListItemIcon>
                    <ListItemText>Preview</ListItemText>
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

export default BackImageMenu;