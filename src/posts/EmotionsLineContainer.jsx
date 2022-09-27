import s from "./posts.module.css";
import postsHelper, {setEmotion} from "./postsHelper";
import {AiOutlineComment, AiOutlineDislike, AiOutlineFire, AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import CountUp from "react-countup";
import {useHistory} from "react-router-dom";
import {useContext, useMemo} from "react";
import {Context, notify} from "../App";
import {AiOutlineStar, BiAngry, CgSmile, CgSmileSad, GiBoombox} from "react-icons/all";

const emotionsConfig = [
    {
        img: <AiOutlineLike size={"24px"}/>, eventHandler: (value, socket, notify, id) => postsHelper.like({
            ...value,
            id: String(value?.id),
            userId: String(value?.userId)
        }, String(id), notify, socket),
        class: s.like, label: "likeCount", showLabel: "Like"
    },
    {
        img: <AiOutlineDislike size={"24px"}/>, eventHandler: (value, socket, notify, id) => postsHelper.dislike({
            ...value,
            id: String(value?.id),
            userId: String(value?.userId)
        }, String(id), notify, socket),
        class: s.dislike, label: "dislikeCount", showLabel: "Dislike"
    },
    {
        img: <AiOutlineComment size={"24px"}/>, class: s.com, label: "comCount", showLabel: "Comment on",
        eventHandler: (value, socket, notify, id, history) => postsHelper.getComment(history, value.id)
    }
]

const complexEmotions = [
    {
        img: <GiBoombox size={"24px"}/>,
        eventHandler: (value, socket, notify, id) => setEmotion(id, value, "boombox", value.boombox, socket),
        label: "boombox"
    },
    {
        img: <BiAngry size={"24px"}/>,
        eventHandler: (value, socket, notify, id) => setEmotion(id, value, "angry", value.angry, socket),
        label: "angry"
    },
    {
        img: <AiOutlineHeart size={"24px"}/>,
        eventHandler: (value, socket, notify, id) => setEmotion(id, value, "heart", value.heart, socket),
        label: "heart"
    },
    {
        img: <AiOutlineFire size={"24px"}/>,
        eventHandler: (value, socket, notify, id) => setEmotion(id, value, "fire", value.fire, socket),
        label: "fire"
    },
    {
        img: <AiOutlineStar size={"24px"}/>,
        eventHandler: (value, socket, notify, id) => setEmotion(id, value, "star", value.star, socket),
        label: "star"
    },
    {
        img: <CgSmile size={"24px"}/>,
        eventHandler: (value, socket, notify, id) => setEmotion(id, value, "smile", value.smile, socket),
        label: "smile"
    },
    {
        img: <CgSmileSad size={"24px"}/>,
        eventHandler: (value, socket, notify, id) => setEmotion(id, value, "smile2", value.smile2, socket),
        label: "smile2"
    }
]

function getParsedConfig(config, value, socket, id, history) {
    return config?.map((emotion, i) => <p className={s.EmotionLine} key={emotion?.showLabel + "r" + i}>
                <span onClick={() => emotion.eventHandler(value, socket, notify, id, history)}
                      className={emotion.class || s.complicatedEmotion}>{emotion.img}{emotion?.showLabel}</span>
        <CountUp delay={1} end={value[emotion.label]}/>
    </p>)
}

function EmotionsLineContainer(props) {
    const {
        value,
        id,
        containerClass
    } = props;

    const history = useHistory();
    const {socket} = useContext(Context)
    const emotionsParsedConfig = useMemo(() => getParsedConfig(emotionsConfig, value, socket, id, history), [])
    const complexEmotionsParsedConfig = useMemo(() => getParsedConfig(complexEmotions, value, socket, id, history), [])

    return (
        <>
            <p className={containerClass}>
                {emotionsParsedConfig}
            </p>
            <p className={containerClass}>
                {complexEmotionsParsedConfig}
            </p>
        </>
    )
}

export default EmotionsLineContainer;