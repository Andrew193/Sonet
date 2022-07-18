import s from "./gallery.module.css";
import {Box, Typography} from "@mui/material";
import FoldersActionsBar from "./FoldersActionsBar";
import {useHistory} from "react-router-dom";


function FoldersInnerContent(props) {
    const {
        folderName,
        isFolderContent,
        setOpenedFolderImage,
        configuredFolderImages,
        configuredFolders,
        setFolders
    } = props;

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const history = useHistory();

    return (
        <>
            {
                !folderName && <FoldersActionsBar
                    userId={user?.id}
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
                        </p>
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

                <div
                    className={s.folderImagesContainer}
                >
                    {folderName ? configuredFolderImages : configuredFolders}
                </div>
            </Box>
        </>
    )
}

export default FoldersInnerContent;