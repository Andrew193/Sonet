import {useMemo, useState, useRef} from "react";
import FoldersActionsBar from "./FoldersActionsBar";
import s from "./gallery.module.css";
import {Box, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import LazyImage from "../posts/LazyImage";
import {AiOutlineDelete, BsPen, RiUserShared2Line} from "react-icons/all";
import {AiOutlineEye} from "react-icons/ai";
import {useTranslation} from "react-i18next";
import Script from "../createPost/script";
import userHelper from "../helpers/userHelper";
import {updateFolderBack} from "./galleryHelper";

function Folders(props) {
    const {
        user,
        folderName,
        folders,
        setFolders
    } = props;

    const history = useHistory();

    function openFolder(name) {
        history.push(`/gallery/${name}`)
    }

    const [openedFolder, setOpenedFolder] = useState(null);
    const [images, setImages] = useState([]);
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

        return uniqFolders?.map((folder, index) =>
            <p
                key={folder?.id + folder?.name + index}
                onClick={(e) => {
                    setOpenedFolder(folder)
                    handleClick(e);
                }}

            >
                <div>
                    <div className={"folderItem"}>
                        {folder?.name}
                    </div>
                </div>
            </p>
        )
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
                >
                    <LazyImage
                        imageSrc={JSON.parse(image?.src)?.webContentLink}
                    />
                    {image?.shared && <RiUserShared2Line/>}
                </p>
                : null
        })
    }, [selectedFolder])

    const isFolderContent = useMemo(() => {
        return configuredFolderImages?.every((image) => image === null);
    }, [configuredFolderImages])

    const {t} = useTranslation();
    let image = useRef();

    return (
        <div
            className={s.FolderInnerContainer}
        >
            <form>
                <input
                    ref={(el) => image = el}
                    type="file"
                    style={{display: "none"}}
                    onChange={() => {
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
                        updateFolderBack(formData, () => {
                        }, () => {
                        })
                    }}
                />
            </form>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={s.ImageMenu}
            >
                <MenuItem onClick={() => {
                    openFolder(openedFolder?.name);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <AiOutlineEye/>
                    </ListItemIcon>
                    <Typography>{t("Open this folder")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {

                    handleClose();
                }}>
                    <ListItemIcon>
                        <AiOutlineDelete/>
                    </ListItemIcon>
                    <Typography>{t("Delete this folder ( with all images inside it )")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    userHelper.CallImageInput(image)
                    handleClose()
                }}>
                    <ListItemIcon>
                        <BsPen/>
                    </ListItemIcon>
                    <Typography>{t("Update background")}</Typography>
                </MenuItem>
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