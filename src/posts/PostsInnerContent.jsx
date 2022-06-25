import {Link} from "react-router-dom";
import DataHelper from "../helpers/dateHelper.js"
import s from "./posts.module.css"
import {v4 as uuidv4} from 'uuid';
import EmotionsLineContainer from "./EmotionsLineContainer";
import {Avatar} from "@mui/material";
import PostItem from "./PostItem";

function ClearPosts(props) {
    const {
        toMake,
        id
    } = props;

    return (
        <div className={s.PostsCont + " onePostContainer"}>
            {toMake.posts.map((value) => <PostItem value={value} id={id}/>)}
        </div>
    )
}

export default ClearPosts;