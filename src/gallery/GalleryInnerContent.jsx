import React from "react";
import withPageHeader from "../hoc/withPageHeader";
import {
    alpha,
    Backdrop,
    Box, CircularProgress,
    FormControl,
    InputLabel,
    ListItemIcon,
    Menu,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {useCallback, useEffect, useMemo, useState} from "react";
import {addPhotoToFolder, deleteMyPhoto, getMyFolders, getMyGallery} from "./galleryHelper";
import {notify} from "../App";
import LazyImage from "../posts/LazyImage";
import GalleryStyles from "./gallery.module.css";
import {AiOutlineDelete, RiUserShared2Line} from "react-icons/all";
import {downloadFileVersion2, getLazyImagesElementsThemeConfig} from "../utils";
import {AiOutlineDownload, AiOutlineEye} from "react-icons/ai";
import GalleryActions from "./GalleryActions";
import ImageViewer from "react-simple-image-viewer";
import GalleryMode from "./GalleryMode";
import {useTranslation} from "react-i18next";
import Folders from "./Folders";
import {withRouter} from "react-router-dom";
import {getItemFromLocalStorage} from "../localStorageService";
import {USER_INFORMATION} from "../vars";
import PropTypes from "prop-types";
import Separator from "../components/common/Separator/Separator";

export function getGalleryImageConfig() {
    return {
        wrapperStyle: {
            height: "200px",
            transition: "all ease 0.7s",
            ...getLazyImagesElementsThemeConfig()
        },
        imgClass: "gallery-lazy-img"
    }
}

function GalleryInnerContent(props) {
    const {
        settings
    } = props;

    const userInformation = getItemFromLocalStorage(USER_INFORMATION);

    const [images, setImages] = useState();

    useEffect(() => {
        async function getData() {
            getMyGallery(userInformation?.id, setImages, (error) => notify(error || "Something went wrong"))
        }

        if (userInformation?.id) {
            getData();
        }
    }, [userInformation?.id]);

    const configuredImages = useMemo(() => images?.clearData?.map((image, index) =>
        <p key={JSON.parse(image?.src)?.webContentLink + index}>
            <LazyImage
                imageSrc={JSON.parse(image?.src)?.webContentLink}
                onClick={(e) => {
                    setSelectedImage(index)
                    handleClick(e);
                }}
                {...getGalleryImageConfig()}
            />
            {image?.shared && <RiUserShared2Line/>}
        </p>
    ), [images])

    const [anchorEl, setAnchorEl] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const open = Boolean(anchorEl);

    const imagesForPreview = useMemo(() => images?.clearData ? images?.clearData?.map((image) => JSON.parse(image?.src)?.webContentLink) : [], [images?.clearData])

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

    const [selected, setSelected] = useState(0);
    const [folders, setFolders] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const folderName = props?.match?.params?.folderName;

    const parsedFolders = useMemo(() => {
        const uniqFolders = folders.filter(function (item, pos, self) {
            return self?.map((item) => item?.name).indexOf(item?.name) === pos;
        })

        return uniqFolders?.map((folder, index) =>
            <MenuItem key={folder?.name + index} value={folder?.name}>{folder?.name}</MenuItem>)
    }, [folders?.length])

    useEffect(() => {
        if (folders?.length === 0) {
            if (userInformation?.id) {
                getMyFolders(userInformation?.id, setFolders, (error) => console.error(error))
            }
        }
    }, [userInformation?.id, folders?.length]);

    return (
        <Box>
            <style>{`
            .folderItem, .lazyload-wrapper > div, .${GalleryStyles.FolderDescription} {
             box-shadow: 0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)};
            }
            
            .react-emoji-picker {
            top:0px!important;
            }
            `}</style>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isOpened || false}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
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
                className={GalleryStyles.ImageMenu}
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
                {parsedFolders?.length ?
                    <MenuItem onClick={() => handleClose()}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t("Add to a folder")}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label={t("Add to a folder")}
                                onChange={(e) => {
                                    setIsOpened(() => true)
                                    addPhotoToFolder({
                                        src: images?.clearData[selectedImage]?.src,
                                        userId: userInformation?.id,
                                        shared: false,
                                        sharedUser: images?.clearData[selectedImage]?.sharedUser,
                                        name: e.target.value,
                                        folderBack: ""
                                    }, setFolders)
                                        .then(() => {
                                            setTimeout(() => {
                                                notify(t("Added"))
                                                setIsOpened(() => false)
                                            }, 1000)
                                        })
                                }}
                            >{parsedFolders}</Select>
                        </FormControl>
                    </MenuItem>
                    : null}
                <MenuItem onClick={() => {
                    deleteMyPhoto({
                        userId: userInformation?.id,
                        src: `${images?.clearData[selectedImage]?.src}`
                    }, () => {
                        setImages((images) => {
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
            <Separator/>
            <GalleryMode selected={selected} setSelected={setSelected}/>
            {
                !selected
                    ? <Box className={GalleryStyles.ImagesContainer}>{configuredImages}</Box>
                    : <Box className={GalleryStyles.ImagesContainer}>
                        <Folders
                            settings={settings}
                            folderName={folderName}
                            folders={folders}
                            setFolders={setFolders}
                        />
                    </Box>
            }
        </Box>
    )
}

GalleryInnerContent.propTypes = {
    settings: PropTypes.object,
    match: PropTypes.object
}

export default withRouter(withPageHeader(GalleryInnerContent, {path: "/gallery", Title: <span>Gallery</span>}));