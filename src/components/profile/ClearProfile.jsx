import React from "react";
import {Link} from "react-router-dom";
import VerificationLine from "./VerificationLine";
import AvatarLine from "./AvatarLine";
import DateHelper from "../../helpers/dateHelper.js";
import FlexColl from "./FlexColl.jsx";
import ProfileHelper from "./profileHelper"
import postServ from "../../posts/postsHelper"
import {useEffect, useMemo, useState} from "react";
import PageHeader from "../common/navigationLine/NavigationLine.jsx";
import {alpha, Box, hexToRgb, Typography} from "@mui/material";
import UsersActivities from "./UsersActivities";
import ProfileStyle from "./profile.module.css";
import BackImageMenu from "./BackImageMenu";
import {useTranslation} from "react-i18next";
import {getItemFromLocalStorage} from "../../localStorageService";
import {headerListLinks, USER_INFORMATION} from "../../vars";
import PropTypes from "prop-types";
import Separator from "../common/Separator/Separator";

function ClearProfile(props) {
    const {
        styles,
        history,
        userInfo,
        settings
    } = props;

    const myId = getItemFromLocalStorage(USER_INFORMATION, "id");
    const {t} = useTranslation();
    const [count, setCount] = useState(0);

    const createdAt = DateHelper.fromNow(userInfo.createdAt);
    const updatedAt = DateHelper.fromNow(userInfo.updatedAt);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    useEffect(() => {
        ProfileHelper.getPCount(userInfo.id, setCount);
    }, [userInfo.id]);

    const backId = useMemo(() => {
        try {
            return JSON.parse(userInfo.back).fileId;
        } catch (error) {
            return "null";
        }
    }, [userInfo?.back])

    return (<>
            <style>
                {`
                ::-webkit-scrollbar-thumb {
                background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)"), 0.6)};
                }
                .SmallUserAvatar {
                padding: 5px;
                }
                ::-webkit-scrollbar-track {
                background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)"), 0.2)};
                }
                .profilePostBorder{
                 border-bottom: 1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"};
                }
                .${ProfileStyle.UsersPost}:hover {
                background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
                }
                .react-simple-image-viewer__close {
                color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 1)} !important;
                opacity: 1;
                }
                #ReactSimpleImageViewer img {
                max-height: unset!important;
                min-height: unset!important;
                }
                .react-simple-image-viewer__slide img{
                min-width: 350px;
                min-height: 350px;
                }
                .basicPageHead {
                position: fixed;
                z-index: 10000;
                width: 85%;
                background: ${alpha(settings?.configs?.background[settings?.background] || "rgb(255, 255, 255)", 0.95)};
                border-right: 1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"};
                }
                .fromNow:before {
                top: 5px;
                }
                @media (max-width: 2000px) {
                .basicPageHead {
                width: 57%!important;
                }}
                @media (max-width: 1024px) {
                .basicPageHead {
                width: 80%!important;
                }}
                @media (max-width: 768px) {
                .basicPageHead {
                width: 100%!important;
                }}
                `}
            </style>
            <BackImageMenu
                image={JSON.parse(userInfo.back)?.webContentLink}
                anchorEl={anchorEl}
                backStyle={`${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.2)}`}
                open={open}
                userInfoBack={userInfo?.back}
                handleClose={handleClose}
                backId={backId}
            />
            <PageHeader historyPath={headerListLinks.base}>
                <>
                    <div>
                        <Link to={{pathname: headerListLinks.profile}}>{userInfo.userName}</Link>
                        <br/>
                        <span
                            className={styles.PostCount}
                            onClick={() => postServ.getMy(history, userInfo.id)}
                        >{0 || count} {t("Posts")}
                        </span>
                    </div>
                    <VerificationLine
                        userInfo={userInfo}
                        myId={myId}
                        settings={settings}
                    />
                </>
            </PageHeader>
            <div
                className={styles.Back}
                onClick={(e) => (myId === userInfo.id) && handleClick(e)}
                style={userInfo.back && {backgroundImage: `url(${JSON.parse(userInfo.back)?.webContentLink})`}}
            />
            <AvatarLine
                imgUrl={userInfo.avatar}
                myId={myId}
                id={userInfo.id}
                settings={settings}
            />
            <Separator/>
            <FlexColl
                settings={settings}
                myId={myId}
                up={updatedAt}
                cr={createdAt}
                userInfo={userInfo}
            />
            <Separator/>
            <Box className={ProfileStyle.FlexColl}>
                <h3 className={ProfileStyle.Black}>{t("About you")}</h3>
                <Typography className={ProfileStyle.AboutMe}>{t(userInfo?.description)}</Typography>
            </Box>
            <Separator/>
            <UsersActivities userInfo={userInfo}/>
        </>
    )
}

ClearProfile.propTypes = {
    styles: PropTypes.object,
    history: PropTypes.object,
    userInfo: PropTypes.object,
    settings: PropTypes.object
};

export default ClearProfile;