import React from "react";
import {useHistory} from "react-router-dom";
import DateHelper from "../../../helpers/dateHelper.js"
import AsideBarHelper from "../AsideBarHelper";
import {v4 as uuidv4} from 'uuid';
import {Typography} from "@mui/material";
import {useMemo} from "react";
import AsideBarStyles from "../aside-bar.module.css"
import {AiOutlineComment, AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function PostCreator(props) {
    const {
        settings,
        toCreate
    } = props;

    const history = useHistory();
    const {t} = useTranslation();
    const postsListToMap = useMemo(() => toCreate, [toCreate]);

    return (
        <>
            {postsListToMap.map((value) =>
                <div
                    key={uuidv4()}
                    onClick={() => AsideBarHelper.openFull(history, value.id)}
                    data-id={value.id}
                    style={{
                        color: settings?.configs?.color[settings?.color]
                    }}
                >
                    <Typography
                        variant="p"
                        component="div"
                        className={AsideBarStyles.latestPostFirstLine}
                    >
                        <li>{DateHelper.fromNow(value.createdAt)}</li>
                        <Typography
                            variant="h5"
                            component="h4"
                            style={{
                                fontWeight: "bold",
                                fontSize: '13px'
                            }}
                        >{t("Created by")} @{value.createdBy}</Typography>
                    </Typography>
                    <Typography
                        variant="p"
                        component="p"
                        className={AsideBarStyles.PostLine}
                    >{value.text.slice(0, 75)}</Typography>
                    <p className={AsideBarStyles.ActionsLine}>
                        <span>
                            <AiOutlineLike size={"14px"}/>
                             <CountUp delay={1} end={value.likeCount}/>
                        </span>
                        <span>
                            <AiOutlineDislike size={"14px"}/>
                             <CountUp delay={1} end={value.dislikeCount}/>
                        </span>
                        <span>
                            <AiOutlineComment size={"14px"}/>
                               <CountUp delay={1} end={value.comCount}/>
                        </span>
                    </p>
                </div>
            )}
        </>
    )
}

PostCreator.propTypes = {
    settings: PropTypes.object,
    toCreate: PropTypes.array
};

export default PostCreator;