import React from "react";
import s from "./gallery.module.css";
import {Box, Typography} from "@mui/material";
import FoldersActionsBar from "./FoldersActionsBar";
import {useHistory} from "react-router-dom";
import {getItemFromLocalStorage} from "../localStorageService";
import {USER_INFORMATION} from "../vars";
import EmptySection from "../components/common/empty-section/EmptySection";
import SolidTextareaStyle from "../components/solid-textarea/solid-textarea.module.css";
import PropTypes from "prop-types";

function FoldersInnerContent(props) {
    const {
        folderName,
        isFolderContent,
        setOpenedFolderImage,
        configuredFolderImages,
        configuredFolders,
        setFolders
    } = props;

    const user = getItemFromLocalStorage(USER_INFORMATION);
    const history = useHistory();

    return (
        <>
            {
                !folderName && <FoldersActionsBar
                    userId={user?.id}
                    setFolders={setFolders}
                />
            }
            <Box className={s.ImagesContainer}>
                {folderName &&
                    <>
                        <Typography
                            variant={"p"}
                            component={"h4"}
                        >{folderName} Folder</Typography>
                        <div className={SolidTextareaStyle.ThematicBreak}/>
                    </>}

                {
                    (folderName && isFolderContent)
                        ?
                        <EmptySection
                            title={"This folder is empty"}
                            message={<p>You still can go
                                <span
                                    style={{
                                        padding: '5px 10px',
                                        margin: '5px'
                                    }}
                                    id={"mainPostBtn"}
                                    onClick={() => {
                                        setOpenedFolderImage(null)
                                        history.push("/gallery")
                                    }}
                                >back</span>
                            </p>}
                        />
                        : (folderName && !isFolderContent)
                            ? <span
                                id={"mainPostBtn"}
                                onClick={() => {
                                    setOpenedFolderImage(null)
                                    history.push("/gallery")
                                }}
                            >Back</span>
                            : null
                }

                <div className={s.folderImagesContainer}>
                    {folderName ? configuredFolderImages : configuredFolders}
                </div>
            </Box>
        </>
    )
}

FoldersInnerContent.propTypes = {
    folderName: PropTypes.string,
    isFolderContent: PropTypes.bool,
    setOpenedFolderImage: PropTypes.func,
    configuredFolderImages: PropTypes.array,
    configuredFolders: PropTypes.array,
    setFolders: PropTypes.func
}

export default FoldersInnerContent;