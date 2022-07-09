import {useHistory} from "react-router-dom";
import dateHelper from "../../../helpers/dateHelper.js"
import script from "../script.js";
import {v4 as uuidv4} from 'uuid';
import {Typography} from "@mui/material";
import {useMemo} from "react";
import s from "../top-info.module.css"
import {AiOutlineComment, AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";

function PostCreator(props) {
    const {
        settings
    } = props;

    const history = useHistory();
    const {t} = useTranslation();
    const postsListToMap = useMemo(() => props.toCreate, [props?.toCreate]);

    return (
        <>
            {postsListToMap.map((value) =>
                <div
                    key={uuidv4()}
                    onClick={() => {
                        script.openFull(history, value.id)
                    }}
                    data-id={value.id}
                    style={{
                        color: settings?.configs?.color[settings?.color]
                    }}
                >
                    <Typography
                        variant="p"
                        component="div"
                        className={s.latestPostFirstLine}
                    >
                        <span>{dateHelper.fromNow(value.createdAt)}</span>
                        <Typography
                            variant="h5"
                            component="h4"
                            style={{
                                fontWeight: "bold"
                            }}
                        >{t("Created by")} @{value.createdBy}</Typography>
                    </Typography>
                    <Typography
                        variant="p"
                        component="p"
                        className={s.PostLine}
                    >{value.text.slice(0, 75)}</Typography>
                    <p
                        className={s.ActionsLine}
                    >
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

export default PostCreator;