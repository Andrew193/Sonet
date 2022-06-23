import {Box, Typography} from "@mui/material";
import s from "./profile.module.css"

function AboutYou() {

    return (
        <Box
            className={s.FlexColl}
        >
            <h3
                className={s.Black}
            >About you</h3>
            <Typography
            className={s.AboutMe}
            >Nothing</Typography>
        </Box>
    )
}

export default AboutYou;