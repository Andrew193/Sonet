import {Box} from "@mui/material";
import s from './settings.module.css';
import SettingsContent from "./SettingsContent";

function SettingsContainerPage() {


    return (
        <Box
            className={s.Container}
        >
            <SettingsContent/>
        </Box>
    )
}

export default SettingsContainerPage;