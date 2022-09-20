import {useEffect, useState} from "react";
import {getUserAvatar} from "./postsHelper";
import s from "../header/header.module.css";
import postS from "./posts.module.css";
import LazyImage from "./LazyImage";
import DataHelper from "../helpers/dateHelper";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";

function SharedPost(props) {
    const {
        shared
    } = props;

    const [userAvatar, setUserAvatar] = useState(null);
    const [parsedPost, setParsedPost] = useState(null);

    useEffect(() => {
        setParsedPost(() => JSON.parse(shared))
    }, [])

    useEffect(() => {
        if (!userAvatar && parsedPost?.userId) {
            getUserAvatar(userAvatar, setUserAvatar, parsedPost.userId)
        }
    }, [parsedPost])

    return (
        <>
            {
                shared === "{}"
                    ? null
                    :
                    <div
                        className={postS.SharedPostContainer}
                        style={{margin: "10px"}}
                    >
                        <LazyImage
                            imgClass={s.ShortUserAvatar}
                            imageSrc={userAvatar}
                            wrapperStyle={getElementsThemeConfig({}, getPropertiesConfig(true, "rgb(0,0,0)",
                                false, '', null, null))}
                        />
                        <div style={{marginLeft: "15px"}}>
                            <h3>
                                <a href={`/users/${parsedPost?.userId}`}
                                   className={"authorName"}>{parsedPost?.createdBy}</a>
                            </h3>
                            <p>{parsedPost?.text}</p>
                        </div>
                        <span className={postS.Time + " fromNow"}>{DataHelper.fromNow(parsedPost?.createdAt)}</span>
                    </div>
            }
        </>
    )
}

export default SharedPost;