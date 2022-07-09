import {Box, Typography} from "@mui/material";
import s from "./profile.module.css"
import {useTranslation} from "react-i18next";

function AboutYou(props) {
    const {
        description
    } = props;

    const {t} = useTranslation();

    return (
        <Box
            className={s.FlexColl}
        >
            <h3
                className={s.Black}
            >{t("About you")}</h3>
            <Typography
                className={s.AboutMe}
            >{t(description)}</Typography>
        </Box>
    )
}

export default AboutYou;