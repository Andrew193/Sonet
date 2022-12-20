import React from "react";
import {Box} from "@mui/material";
import {useState} from "react";
import quizStyles from "./quiz.module.css";
import {MdOutlineQuiz} from "react-icons/all";
import {useSettings} from "../../hooks";
import QuizBody from "./QuizBody";

function AddQuizBar() {
    const [isBarOpened, setIsBarOpened] = useState(false);
    const {settings} = useSettings();

    return (
        <Box className={quizStyles.Container}>
            <div className={quizStyles.LabelContainer}
                 style={{color: settings?.configs?.color[settings?.color] || "rgb(0 33 208)"}}>
                <MdOutlineQuiz/>
                <span onClick={() => setIsBarOpened((state) => !state)}>Toggle a quiz</span>
            </div>
            {isBarOpened && <QuizBody/>}
        </Box>
    )
}

export default AddQuizBar;