import quizStyle from "../components/quizBar/quiz.module.css";
import {useContext, useMemo} from "react";
import React from "react";
import HttpHelper from "../helpers/httpHelper";
import {refreshWithUpdate} from "./postsHelper";
import {Context} from "../App";
import ProgressBar from "../components/common/progress-bar/ProgressBar";
import PropTypes from "prop-types";

function setMyQuizAnswer(answer, postId, parsedQuiz, id, selectedQuizAnswerCount, socket, notify) {
    HttpHelper.QUIZ.setQuiz(postId, answer, parsedQuiz, id, selectedQuizAnswerCount)
        .then(() => refreshWithUpdate(`Your answer: ${answer}`, socket, id, notify))
}

function QuizBar(props) {
    const {
        quiz,
        createdBy,
        postId,
        id,
        bookmark
    } = props;

    const parsedQuiz = useMemo(() => JSON.parse(quiz), [quiz]);
    const realFullAnswersCount = useMemo(() => parsedQuiz?.options?.reduce((prev, curr) => {
        prev += +curr.optionVotes
        return prev;
    }, 0), [parsedQuiz]);

    const {socket, notify} = useContext(Context);

    return (
        <>
            {parsedQuiz.question ?
                <div className={quizStyle.ParsedQuizContainer}>
                    <span>{createdBy} asks:</span>
                    <h4>{parsedQuiz.question}</h4>
                    <ul className={`${bookmark && "disabled"}`}>
                        {parsedQuiz?.options?.sort((a, b) => b?.optionVotes - a?.optionVotes)?.map((option, index) =>
                            <li
                                key={index}
                                onClick={() => setMyQuizAnswer(option?.optionName, postId, parsedQuiz, id, option?.optionVotes, socket, notify)}
                            ><ProgressBar percent={(+option?.optionVotes * 100) / realFullAnswersCount}
                                          label={option?.optionName}/></li>
                        )}
                    </ul>
                </div>
                : null}
        </>
    )
}

QuizBar.propTypes = {
    quiz: PropTypes.string,
    createdBy: PropTypes.string,
    postId: PropTypes.number,
    id: PropTypes.number,
    bookmark: PropTypes.bool
}

export default QuizBar;