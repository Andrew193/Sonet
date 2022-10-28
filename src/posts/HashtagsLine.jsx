import {Box, Typography} from "@mui/material";
import {useMemo} from "react";
import {getHashtags} from "./postsHelper";
import s from "./posts.module.css"
import {useHistory} from "react-router-dom";

function HashtagsLine(props) {
    const {
        text
    } = props;

    const history = useHistory();
    const hashtags = useMemo(() => getHashtags(text), [text]);

    const hashtagsLines = useMemo(() => hashtags?.map((hashtag, index) => <span
        key={index}
        onClick={() => {
            history.replace({
                pathname: history?.location?.pathname,
                hash: history?.location?.hash?.includes(hashtag) ? history?.location?.hash : history?.location?.hash + hashtag
            })
        }}
    >{hashtag}</span>), [hashtags]);

    return (
        <>
            {hashtagsLines.length ?
                <Box>
                    <Typography variant={"h5"} component={"p"}
                                style={{borderBottom: "1px solid rgb(206, 204, 204)"}}>Hashtags</Typography>
                    <Box className={s.HashtagsContainer}>
                        {hashtagsLines}
                    </Box>
                </Box> : null}
        </>
    )
}

export default HashtagsLine;