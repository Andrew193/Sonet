import {useMemo, useState, useRef} from "react";
import FoldersActionsBar from "./FoldersActionsBar";
import s from "./gallery.module.css";
import {alpha, Backdrop, Box, CircularProgress, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import LazyImage from "../posts/LazyImage";
import {AiOutlineDelete, BsPen, RiUserShared2Line} from "react-icons/all";
import {AiOutlineEye} from "react-icons/ai";
import {useTranslation} from "react-i18next";
import userHelper from "../helpers/userHelper";
import {deleteImageFromFolder, deleteMyPhoto, updateFolderBack} from "./galleryHelper";

function Folders(props) {
    const {
        user,
        folderName,
        folders,
        setFolders,
        settings
    } = props;

    const history = useHistory();

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
        const uniqFolders = folders.filter(function (item, pos, self) {
            return self?.map((item) => item?.name).indexOf(item?.name) === pos;
        })

        return uniqFolders?.map((folder, index) => {
            let backImage;
            try {
                backImage = JSON.parse(folder?.folderBack)?.webContentLink
            } catch (err) {
                backImage = "";
            }

            return <p
                key={folder?.id + folder?.name + index}
                onClick={(e) => {
                    setOpenedFolder(folder)
                    handleClick(e);
                }}
            >
                {
                    !!backImage
                        ?
                        <>
                            <LazyImage
                                imageSrc={backImage}
                                onClick={() => {
                                }}
                            />
                            <span
                                style={{
                                    color: "white",
                                    position: 'absolute',
                                    top: '10px',
                                    left: '45%'
                                }}
                            >{folder?.name}</span>
                        </>
                        : <div>
                            <div className={"folderItem"}>
                                {folder?.name}
                            </div>
                        </div>
                }
            </p>
        })
    }, [folders])

    const selectedFolder = useMemo(() => {
        return folders?.filter((folder) => {
            return folder?.name === folderName
        })
    }, [folderName]);

    const configuredFolderImages = useMemo(() => {
        return selectedFolder?.map((image, index) => {
            return !!image?.src
                ? <p
                    key={JSON.parse(image?.src)?.webContentLink + index}
                    onClick={(e) => {
                        setOpenedFolderImage(image)
                        handleClick(e);
                    }}
                >
                    <LazyImage
                        imageSrc={JSON.parse(image?.src)?.webContentLink}
                        onClick={() => {
                        }}
                    />
                    {image?.shared && <RiUserShared2Line/>}
                </p>
                : null
        })
    }, [selectedFolder])

    const isFolderContent = useMemo(() => {
        return configuredFolderImages?.every((image) => image === null);
    }, [configuredFolderImages])

    function updateBackCover() {
        let formData = new FormData();
        let fileId;
        formData.append("file", image.files[0]);
        formData.append("name", openedFolder?.name);
        try {
            fileId = JSON.parse(openedFolder?.folderBack)?.fileId
        } catch (error) {
            fileId = null;
        }

        formData.append("fileId", fileId)
        updateFolderBack(formData)
            .then(async (response) => {
                const newBack = await response?.json();
                const newFolders = folders?.map((folder) => folder?.name === openedFolder?.name
                    ? {...folder, folderBack: JSON.stringify(newBack?.reason)}
                    : folder
                )

                setFolders(() => JSON.parse(JSON.stringify(newFolders)))
                setTimeout(() => {
                    setIsOpened(() => false)
                }, 1000)
            })
    }

    const {t} = useTranslation();
    let image = useRef();
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div
            className={s.FolderInnerContainer}
        >
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isOpened}
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
                        updateBackCover()
                    }}
                />
            </form>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={s.ImageMenu}
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
                    if (openedFolderImage) {
                        deleteImageFromFolder({userId: user?.id, src: openedFolderImage?.src})
                    } else {

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
            {
                !folderName && <FoldersActionsBar
                    userId={user.id}
                    setFolders={setFolders}
                />
            }
            <Box
                className={s.ImagesContainer}
            >
                {folderName && <Typography
                    variant={"p"}
                    component={"h4"}
                >{folderName} Folder</Typography>}

                {
                    (folderName && isFolderContent)
                        ? <p>
                            This folder is empty. You still can go
                            <span
                                id={"mainPostBtn"}
                                onClick={() => {
                                    history.push("/gallery")
                                }}
                            >back</span>
                        </p>
                        : (folderName && !isFolderContent)
                            ? <span
                                id={"mainPostBtn"}
                                onClick={() => {
                                    history.push("/gallery")
                                }}
                            >Back</span>
                            : null
                }

                <div
                    className={s.folderImagesContainer}
                >
                    {folderName ? configuredFolderImages : configuredFolders}
                </div>
            </Box>
        </div>
    )
}

export default Folders;