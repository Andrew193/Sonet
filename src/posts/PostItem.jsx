import {v4 as uuidv4} from "uuid";
import s from "./posts.module.css";
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import EmotionsLineContainer from "./EmotionsLineContainer";
import profileHelper from "../components/profile/profileHelper";
import DataHelper from "../helpers/dateHelper";
import {useEffect, useState} from "react";


function PostItem(props) {
    const {
        value,
        id
    } = props;

    const [userAvatar, setUserAvatar] = useState();

    useEffect(() => {
        async function getUserAvatar() {
            if (value?.userId && !userAvatar) {
                const response = await profileHelper.getUser(value?.userId);

                try {
                    setUserAvatar(JSON.parse(response?.data?.user?.avatar)?.webContentLink)
                } catch (error) {
                    setUserAvatar(response?.data?.user?.avatar)
                }
            }
        }

        getUserAvatar();
    }, [])

    return (
        <>
            <div
                key={uuidv4()}
                className={s.Item + " itemsPostsPage"}
                data-id={value.id}
            >
                <Avatar
                    src={userAvatar}
                    style={{
                        height: '75px',
                        width: '75px',
                        marginRight: '15px',
                        borderRadius: '5px'
                    }}
                />
                <div
                    style={{
                        flex: '10 0',
                    }}
                >
                    <h3>
                        <Link
                            to={{pathname: `/users/${+value.userId}`}}
                            className={"authorName"}
                        >{value.createdBy}</Link>
                    </h3>
                    <p>{value.text}</p>
                    <EmotionsLineContainer
                        value={value}
                        id={id}
                    />
                </div>
                <span className={s.Time}>{DataHelper.fromNow(value.createdAt)}</span>
            </div>
        </>
    )
}

export default PostItem;