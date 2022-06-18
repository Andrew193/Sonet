import {useHistory} from "react-router-dom";
import dateHelper from "../../../helpers/dateHelper.js"
import script from "../script.js";
import {v4 as uuidv4} from 'uuid';
import {Typography} from "@mui/material";
import {useMemo} from "react";
import s from "../top-info.module.css"

function PostCreator(props) {
    const {
        settings
    } = props;

    const history = useHistory();

    const postsListToMap = useMemo(() => {
        return props.toCreate;
    }, [props?.toCreate]);

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
                        >Created by @{value.createdBy}</Typography>
                    </Typography>
                    <Typography
                        variant="p"
                        component="p"
                        className={s.PostLine}
                    >{value.text.slice(0, 75)}</Typography>
                    <p>Like:{value.likeCount} Dislike:{value.dislikeCount} Comments:{value.comCount}</p>
                </div>
            )}
        </>
    )
}

export default PostCreator;