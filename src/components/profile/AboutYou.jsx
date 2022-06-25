import {Box, Typography} from "@mui/material";
import s from "./profile.module.css"

function AboutYou(props) {
    const {
        description
    } = props;

    return (
        <Box
            className={s.FlexColl}
        >
            <h3
                className={s.Black}
            >About you</h3>
            <Typography
                className={s.AboutMe}
            >{description}</Typography>
        </Box>
    )
}

export default AboutYou;