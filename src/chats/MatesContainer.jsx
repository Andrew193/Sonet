import MatesConditions from "./MatesConditions";
import {useTranslation} from "react-i18next";
import {AiOutlineQuestionCircle} from "react-icons/all";
import {Box, Tooltip} from "@mui/material";
import {useState} from "react";
import {TooltipButtonCover} from "../components/tooltip-cover/TooltipButtonCover";
import textareaStyles from "../components/solid-textarea/solid-textarea.module.css";

function MatesContainer(props) {
    const {
        matesList,
        isLoading
    } = props;

    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Box className={"TipLine"}>
                <Tooltip title={t("How it works?")} arrow placement="top">
                    <TooltipButtonCover>
                        <AiOutlineQuestionCircle onClick={() => setIsOpen((flag) => !flag)}/>
                    </TooltipButtonCover>
                </Tooltip>
                {
                    isOpen && <p>
                        <span>Online</span>
                        <span>Offline</span>
                    </p>
                }
            </Box>
            <div className={textareaStyles.ThematicBreak}/>

            <h3>{t("Mates")}</h3>
            {matesList}
            <MatesConditions
                matesListLength={matesList?.length}
                isLoading={isLoading}
            />
        </>
    )
}

export default MatesContainer;