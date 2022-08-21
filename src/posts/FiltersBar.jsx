import {Box, Typography} from "@mui/material";
import s from "./posts.module.css"
import {useHistory, useLocation} from "react-router-dom";
import {useMemo} from "react";

function FiltersBar(props) {
    const {
        settings
    } = props;

    const history = useHistory();

    const styledHashtags = useMemo(() => history?.location?.hash?.split("#")?.filter((element) => !!element)
            ?.map((hashtag, index) => <span
                key={index}
                onClick={() => {
                    history.replace({
                        pathname: history?.location?.pathname,
                        hash: history?.location?.hash?.replace(`#${hashtag}`, "")
                    })
                }}
            >#{hashtag}</span>)
        , [history?.location?.hash])

    return (
        <>
            <Box
                className={s.FiltersBar}
            >
                <Typography
                    variant={"h4"}
                    component={"h4"}
                >
                    Used filters
                </Typography>

                <>
                    {!!styledHashtags?.length
                        ? <div
                            style={{width: "100%"}}
                        >
                            <Typography
                                variant={"h5"}
                                component={"h5"}
                                style={{
                                    padding: "10px 10px 0px 10px",
                                    width: "fit-content",
                                    color: `${settings?.configs?.color[settings?.color]}`
                                }}
                            >Used hashtags:</Typography>
                            <div
                                className={s.HashtagsContainer}
                                style={{width: "fit-content"}}
                            >{styledHashtags}</div>
                        </div>
                        : null
                    }
                </>
            </Box>
            <div
                className={"Separator"}
                onClick={(e) => {
                    e?.target?.nextElementSibling?.classList.toggle("Hide")
                }}
            />
        </>
    )
}

export default FiltersBar;