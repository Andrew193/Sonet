import {Box} from "@mui/material";
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
        <Box className={s.HashtagsContainer}>
            {hashtagsLines}
        </Box>
    )
}

export default HashtagsLine;