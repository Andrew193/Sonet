import React from "react";
import {useContext, useState} from "react";
import s from "./comments.module.css"
import Script from "./Script.js"
import {buttonsConfig} from "../../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import {Backdrop, CircularProgress} from "@mui/material";
import InputEmoji from 'react-input-emoji';
import {Context} from "../../App";
import {getItemFromLocalStorage} from "../../localStorageService";
import {USER_INFORMATION} from "../../vars";
import PropTypes from "prop-types";

function CommentLine(props) {
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
            .${s.CommentLine} .react-emoji {
            width: 77%;
            }
            .${s.CommentLine} .react-emoji button {
            flex: unset !important;
            }
            `}</style>
            <div className={s.CommentLine}>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    placeholder={t("What do you think about it?")}
                />
                <span
                    className={`button ${s.noBefore} ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                    onClick={() => {
                        setIsOpened(true);
                        Script.createComment(text, userInfo, id, comCount, notify, socket)
                            .then(() => {
                                setText("")
                                setIsOpened(false);
                            })
                    }}
                >{t("Comment")}</span>
            </div>
        </>
    )
}

CommentLine.propTypes = {
    id: PropTypes.number,
    comCount: PropTypes.number,
    settings: PropTypes.object
};

export default CommentLine;