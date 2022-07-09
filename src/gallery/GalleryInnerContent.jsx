import withPageHeader from "../hoc/withPageHeader";
import {alpha, Box, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {useCallback, useEffect, useMemo, useState} from "react";
import {deleteMyPhoto, getMyGallery} from "./galleryHelper";
import {notify} from "../App";
import LazyImage from "../posts/LazyImage";
import s from "./gallery.module.css";
import {AiOutlineDelete, RiUserShared2Line} from "react-icons/all";
import {downloadFileVersion2} from "../utils";
import {AiOutlineDownload, AiOutlineEye} from "react-icons/ai";
import GalleryActions from "./GalleryActions";
import ImageViewer from "react-simple-image-viewer";
import GalleryMode from "./GalleryMode";
import {useTranslation} from "react-i18next";

function GalleryInnerContent(props) {
    const {
        settings
    } = props;

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    const [images, setImages] = useState();

    useEffect(() => {
        async function getData() {
            getMyGallery(userInformation?.id, setImages, (error) => {
                notify(error || "Something went wrong")
            })
        }

        if (userInformation?.id) {
            getData();
        }
    }, [userInformation?.id]);

    const configuredImages = useMemo(() => {
        return images?.clearData?.map((image, index) =>
            <p>
                <LazyImage
                    imageSrc={JSON.parse(image?.src)?.webContentLink}
                    onClick={(e) => {
                        setSelectedImage(index)
                        handleClick(e);
                    }}
                />
                {image?.shared && <RiUserShared2Line/>}
            </p>
        )
    }, [images])

    console.log(images)

    const [anchorEl, setAnchorEl] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const open = Boolean(anchorEl);

    const imagesForPreview = useMemo(() => {
        if (images?.clearData) {
            return images?.clearData?.map((image) => JSON.parse(image?.src)?.webContentLink)
        }
        return [];
    }, [images?.clearData])

    const closeImageViewer = () => {
        setSelectedImage(0);
        setIsViewerOpen(false);
    };

    const openImageViewer = useCallback((index) => {
        setSelectedImage(index);
        setIsViewerOpen(true);
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {t} = useTranslation();

    return (
        <Box>
            {
                isViewerOpen && (
                    <ImageViewer
                        backgroundStyle={{
                            background: `${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.2)}`,
                            zIndex: 10
                        }}
                        key={selectedImage}
                        src={imagesForPreview}
                        currentIndex={selectedImage}
                        disableScroll
                        closeOnClickOutside
                        onClose={closeImageViewer}
                    />
                )
            }

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={s.ImageMenu}
            >
                <MenuItem onClick={() => {
                    downloadFileVersion2(JSON.parse(images?.clearData[selectedImage]?.src)?.webContentLink)
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
                    <Typography>{t("Expand")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    deleteMyPhoto({
                        userId: userInformation?.id,
                        src: `${images?.clearData[selectedImage]?.src}`
                    }, () => {
                        setImages((images) => {
                            debugger
                            images?.clearData?.splice(selectedImage, 1);
                            return JSON.parse(JSON.stringify(images));
                        })
                        notify("Deleted")
                    }, (error) => notify(error || "Something went wrong"))
                    handleClose()
                }}>
                    <ListItemIcon>
                        <AiOutlineDelete/>
                    </ListItemIcon>
                    <Typography>{t("Delete")}</Typography>
                </MenuItem>
            </Menu>

            <GalleryActions/>
            <div
                className={"Separator"}
                onClick={(e) => {
                    e.target.nextElementSibling.classList.toggle("Hide")
                }}
            />
            <GalleryMode />
            <Box
                className={s.ImagesContainer}
            >
                {configuredImages}
            </Box>
        </Box>
    )
}

export default withPageHeader(GalleryInnerContent, {path: "/gallery", Title: <span>Gallery</span>});