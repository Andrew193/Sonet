import React from "react";
import {useMemo, useState, useRef} from "react";
import GalleryStyles from "./gallery.module.css";
import {alpha, Backdrop, CircularProgress, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import LazyImage from "../posts/LazyImage";
import {AiOutlineDelete, BsPen, RiUserShared2Line} from "react-icons/all";
import {AiOutlineEye} from "react-icons/ai";
import {useTranslation} from "react-i18next";
import userHelper from "../helpers/userHelper";
import {deleteFolder, deleteImageFromFolder, updateBackCover} from "./galleryHelper";
import FoldersInnerContent from "./FoldersInnerContent";
import dateHelper from "../helpers/dateHelper";
import {getItemFromLocalStorage} from "../localStorageService";
import {USER_INFORMATION} from "../vars";
import PropTypes from "prop-types";
import {getGalleryImageConfig} from "./GalleryInnerContent";
import {getImageLinkFromStaticObject} from "../utils";

function Folders(props) {
    const {
        folderName,
        folders,
        setFolders,
        settings
    } = props;

    const history = useHistory();
    const user = getItemFromLocalStorage(USER_INFORMATION);

    function openFolder(name) {
        history.push(`/gallery/${name}`)
    }

    const [openedFolder, setOpenedFolder] = useState(null);
    const [openedFolderImage, setOpenedFolderImage] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const configuredFolders = useMemo(() => {
        const uniqFolders = folders.filter((item, pos, self) => self?.map((item) => item?.name).indexOf(item?.name) === pos)

        return uniqFolders?.map((folder) => {
            const backImage = getImageLinkFromStaticObject(folder?.folderBack, "")

            return <p
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse'
                }}
                key={folder?.id}
                onClick={(e) => {
                    setOpenedFolder(folder)
                    handleClick(e);
                }}
            >
                {
                    backImage ? <>
                            <LazyImage imageSrc={backImage}{...getGalleryImageConfig()}/>
                            <div className={GalleryStyles.FolderDescription}>
                                <span>Created date: <span>{dateHelper.fromNow(folder?.createdAt)}</span></span>
                                <span>Folder name: {folder?.name}</span>
                            </div>
                        </>
                        : <div>
                            <div className={"folderItem"}>{folder?.name}</div>
                        </div>
                }
            </p>
        })
    }, [folders])

    const selectedFolder = useMemo(() => folders?.filter((folder) => folder?.name === folderName), [folderName, folders]);

    const configuredFolderImages = useMemo(() =>
        selectedFolder?.map((image, index) =>
            image?.src
                ? <p
                    key={JSON.parse(image?.src)?.webContentLink + index}
                    onClick={(event) => {
                        setOpenedFolderImage(image)
                        handleClick(event);
                    }}
                >
                    <LazyImage imageSrc={JSON.parse(image?.src)?.webContentLink}   {...getGalleryImageConfig()}/>
                    {image?.shared && <RiUserShared2Line/>}
                </p>
                : null), [selectedFolder])

    const isFolderContent = useMemo(() => configuredFolderImages?.every((image) => image === null), [configuredFolderImages])

    const {t} = useTranslation();
    let image = useRef();
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={GalleryStyles.FolderInnerContainer}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isOpened || false}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <style>{`
            .folderItem, .lazyload-wrapper > div {
             box-shadow: 0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)};
            }
            `}</style>
            <form>
                <input
                    ref={(el) => image = el}
                    type="file"
                    style={{display: "none"}}
                    onChange={() => {
                        setIsOpened(() => true);
                        updateBackCover(image, openedFolder, setIsOpened, folders, setFolders)
                    }}
                />
            </form>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={GalleryStyles.ImageMenu}
            >
                {
                    !openedFolderImage
                    && <MenuItem onClick={() => {
                        openFolder(openedFolder?.name);
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <AiOutlineEye/>
                        </ListItemIcon>
                        <Typography>{t("Open this folder")}</Typography>
                    </MenuItem>
                }
                <MenuItem onClick={() => {
                    setIsOpened(() => true);
                    if (openedFolderImage) {
                        deleteImageFromFolder({
                            userId: user?.id,
                            src: openedFolderImage?.src,
                            id: openedFolderImage?.id
                        }).then(() => {
                            setFolders((state) => JSON.parse(JSON.stringify(state?.filter((folder) => folder?.id !== openedFolderImage?.id))))
                            setTimeout(() => setIsOpened(() => false), 1000)
                        })
                    } else {
                        deleteFolder({name: openedFolder?.name}).then(() => {
                            setFolders((state) => JSON.parse(JSON.stringify(state?.filter((folder) => folder?.name !== openedFolder?.name))))
                            setTimeout(() => setIsOpened(() => false), 1000)
                        })
                    }
                    handleClose();
                }}>
                    <ListItemIcon>
                        <AiOutlineDelete/>
                    </ListItemIcon>
                    <Typography>{openedFolderImage ? t("Delete") : t("Delete this folder ( with all images inside it )")}</Typography>
                </MenuItem>
                {
                    !openedFolderImage
                    && <MenuItem onClick={() => {
                        userHelper.CallImageInput(image)
                        handleClose()
                    }}>
                        <ListItemIcon>
                            <BsPen/>
                        </ListItemIcon>
                        <Typography>{t("Update background")}</Typography>
                    </MenuItem>
                }
            </Menu>
            <FoldersInnerContent
                folderName={folderName}
                isFolderContent={isFolderContent}
                setOpenedFolderImage={setOpenedFolderImage}
                configuredFolderImages={configuredFolderImages}
                configuredFolders={configuredFolders}
                setFolders={setFolders}
            />
        </div>
    )
}

Folders.propTypes = {
    folderName: PropTypes.string,
    folders: PropTypes.array,
    setFolders: PropTypes.func,
    settings: PropTypes.object
}

export default Folders;