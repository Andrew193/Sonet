import React from "react";
import {useContext, useState} from "react";
import CommentsStyles from "./comments.module.css"
import ComponentsHelper from "./ComponentsHelper"
import {buttonsConfig} from "../../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import {Backdrop, CircularProgress} from "@mui/material";
import InputEmoji from 'react-input-emoji';
import {Context} from "../../App";
import {getItemFromLocalStorage} from "../../localStorageService";
import {USER_INFORMATION} from "../../vars";
import PropTypes from "prop-types";
import {AiOutlineHighlight} from "react-icons/ai";

function CommentsLine(props) {
    const {
        id,
        comCount,
        settings
    } = props;

    const {socket, notify} = useContext(Context);
    const [text, setText] = useState('')
    const [isOpened, setIsOpened] = useState(false);
    const userInfo = getItemFromLocalStorage(USER_INFORMATION);
    const {t} = useTranslation();

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isOpened || false}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <style>{`
            .${CommentsStyles.CommentLine} .react-emoji {
            width: 100%;
            }
            .${CommentsStyles.CommentLine} .react-emoji-picker--container {
            width: 1px;
            }
            .${CommentsStyles.CommentLine} .react-emoji button {
            flex: unset !important;
            }
            `}</style>
            <div className={CommentsStyles.CommentLine}>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    placeholder={t("What do you think about it?")}
                />
                <AiOutlineHighlight
                    className={`${CommentsStyles.noBefore} ${CommentsStyles.CommentSendButton}`}
                    onClick={() => {
                        setIsOpened(true);
                        ComponentsHelper.createComment(text, userInfo, id, comCount, notify, socket)
                            .then(() => {
                                setText("")
                                setIsOpened(false);
                            })
                    }}
                />
            </div>
        </>
    )
}

CommentsLine.propTypes = {
    id: PropTypes.number,
    comCount: PropTypes.number,
    settings: PropTypes.object
};

export default CommentsLine;