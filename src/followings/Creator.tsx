import React from "react";
import {AiOutlineMail, AiOutlineNumber} from "react-icons/ai";
import {useHistory} from "react-router";
import Script from "../users/usersHelper";
import {useEffect, useMemo, useState} from "react";
import {FollowersUsers} from "../followers/FollowersPageContainer";
import LazyImage from "../posts/LazyImage";
import s from "../header/header.module.css";
import followersS from "../followings/followers.module.css";
import {getLazyImagesElementsThemeConfig} from "../utils";
import {getUserAvatar} from "../posts/postsHelper";
import {useSettings} from "../hooks";

type FollowersCreatorType = {
    usersList: FollowersUsers
}

type ItemPropsType = {
    index: number,
    value: { [key: string]: any }
}

function Item(props: ItemPropsType) {
    const {
        index,
        value
    } = props;
    const history = useHistory();
    const [userAvatar, setUserAvatar] = useState();
    const {settings} = useSettings();

    useEffect(() => {
        if (value?.id) {
            getUserAvatar(userAvatar, setUserAvatar, value?.id)
        }
    }, [value?.id])

    return (
        <div
            key={index}
            style={settings.list.listItemStyles}
            className={"followerOrFollowingContainer"}
            onClick={() => Script.openUserProfile(+value.id, history)}
        >
            <h3 className={"authorName " + followersS.authorName}>
                <LazyImage imgClass={s.ShortUserAvatar} imageSrc={userAvatar}
                           wrapperStyle={getLazyImagesElementsThemeConfig()}/>
            </h3>

            <p>
                <span className={followersS.UserName}>{value.userName}</span>
                <span>
                    <AiOutlineMail/>
                    <a href={`mailto:${value.email}`} onClick={(e)=>{
                        e.stopPropagation();
                    }}>{value.email}</a>
                </span>
            </p>
            <span className={followersS.UserId}>
                    <AiOutlineNumber/>{value.id}
            </span>
        </div>
    )
}

function FollowersCreator(props: FollowersCreatorType) {
    const {
        usersList
    } = props;

    const mappedUsersList = useMemo(() => usersList.map((value: FollowersUsers[number], index: number) => <Item
        index={index} value={value} key={index}/>), [usersList]);

    return (<>{mappedUsersList}</>)
}

export default FollowersCreator;