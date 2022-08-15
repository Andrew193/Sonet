import s from "./posts.module.css";
import postsHelper from "./postsHelper";
import {AiOutlineComment, AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import CountUp from "react-countup";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../App";

function EmotionsLineContainer(props) {
    const {
        value,
        id,
        containerClass
    } = props;

    const history = useHistory();
    const {socket, notify} = useContext(Context)

    return (
        <p
            className={containerClass}
        >
            <p
                className={s.EmotionLine}
            >
                <span
                    onClick={() => {
                        postsHelper.like({
                            ...value,
                            id: String(value?.id),
                            userId: String(value?.userId)
                        }, String(id), notify, socket)
                    }}
                    className={s.like}
                >
                    <AiOutlineLike size={"24px"}/>
                </span>
                <CountUp delay={1} end={value.likeCount}/>
            </p>
            <p
                className={s.EmotionLine}
            >
                <span
                    onClick={() => {
                        postsHelper.dislike({
                            ...value,
                            id: String(value?.id),
                            userId: String(value?.userId)
                        }, String(id), notify, socket)
                    }}
                    className={s.dislike}
                >
                    <AiOutlineDislike size={"24px"}/>
                </span>
                <CountUp delay={1} end={value.dislikeCount}/>
            </p>
            <p
                className={s.EmotionLine}
            >
                <span
                    className={s.com}
                    onClick={() => {
                        postsHelper.getComment(history, value.id)
                    }}
                >
                    <AiOutlineComment size={"24px"}/>
                </span>
                <CountUp delay={1} end={value.comCount}/>
            </p>
        </p>
    )
}

export default EmotionsLineContainer;