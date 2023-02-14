import {withRouter} from "react-router";
import CommentsStyles from "./comments.module.css"
import React, {useContext, useEffect, useState} from "react";
import PostsHelper from "../../posts/postsHelper"
import ComponentsHelper from "./ComponentsHelper"
import ClearComment from "./ClearComment";
import {Context} from "../../App";
import {useSettings} from "../../hooks";
import {getItemFromLocalStorage} from "../../localStorageService";
import {headerListLinks, USER_INFORMATION} from "../../vars";
import {getEmptyElementsThemeConfig} from "../../utils";
import TableLoader from "../table-loader/TableLoader";
import {useTranslation} from "react-i18next";
import MaintainedPageHeader from "../MaintainedPageHeader";
import PropTypes from "prop-types";

function Comments(props) {
    const {
        id,
        commentId
    } = props.location.state || props.match.params;

    const [post, setPost] = useState(false);
    const [comments, setComments] = useState(false);
    const {settings} = useSettings();
    const userId = getItemFromLocalStorage(USER_INFORMATION, "id");

    const {socket, notify} = useContext(Context);
    const {t} = useTranslation();

    socket.on("CommentAdd", (updatedComment) => setComments(updatedComment));
    socket.on("refreshPost", (e) => setPost({posts: [e]}));

    useEffect(() => {
        PostsHelper.getSelectedPost(id || 1, notify).then((response) => setPost(response))
        ComponentsHelper.getAllComments(id, notify).then((response) => setComments(response?.data?.posts))
    }, [id, notify])

    return (
        <div
            className={`${CommentsStyles.Container} commentsPage`}
            style={{
                ...getEmptyElementsThemeConfig(settings),
                justifyContent: post && comments ? "space-between" : "unset"
            }}
        >
            <MaintainedPageHeader path={headerListLinks.base} linkPath={headerListLinks.posts} linkTitle={t("Posts")}/>
            <style>
                {`
                     .highlight-tab:after {
                     height: 0.5px;
                     bottom: 4px;
                     }
                     .commentsPage {
                     border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     }
                     .commentsPage .onePostContainer {
                     overflow: unset;
                     }          
                     .itemsPostsPage {
                     background: ${settings?.configs?.background[settings?.background]};
                     cursor: pointer;
                     }
                     .basicPageHead {
                      background: ${settings?.configs?.background[settings?.background]};
                     }
                     .${CommentsStyles.Comments}{
                     background: ${settings?.configs?.background[settings?.background]};
                     }
                     .rowPostsContainer {
                     height:inherit;
                     }
                     .authorName {
                     color: ${settings?.configs?.color[settings?.color]} !important;
                     font-weight: bold;
                     }
                     .react-emoji-picker {
                     top: 0px!important;
                     width: 100%!important;
                     }
                `}
            </style>
            {
                (post && comments)
                    ? <ClearComment
                        settings={settings}
                        post={post}
                        userId={userId}
                        comments={comments}
                        notify={notify}
                        socket={socket}
                        commentId={commentId}
                        id={id}
                    />
                    : <TableLoader loaderLabel={t("We are loading this comment")}/>
            }
        </div>
    )
}

Comments.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

export default withRouter(Comments);