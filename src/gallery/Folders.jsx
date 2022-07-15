import {useEffect, useState, useMemo} from "react";
import {getMyFolders} from "./galleryHelper";
import FoldersActionsBar from "./FoldersActionsBar";
import s from "./gallery.module.css";
import {Box, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import LazyImage from "../posts/LazyImage";
import {RiUserShared2Line} from "react-icons/all";

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

    const configuredFolders = useMemo(() => {
        const uniqFolders = folders.filter(function (item, pos, self) {
            return self?.map((item) => item?.name).indexOf(item?.name) === pos;
        })

        return uniqFolders?.map((folder, index) =>
            <p
                key={folder?.id + folder?.name + index}
                onClick={() => {
                    openFolder(folder?.name);
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

    console.log(isFolderContent)
    return (
        <div
            className={s.FolderInnerContainer}
        >
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