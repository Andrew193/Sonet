import withPageHeader from "../hoc/withPageHeader"
import React from "react";
import ClearPost from "./PostsInnerContent"
import {useContext} from "react";
import {Context} from "../App";
import FiltersBar from "./FiltersBar";
import {useSettings} from "../hooks";
import PropTypes from "prop-types";

function ClearSpecialPost(props) {
    const {
        posts,
        id
    } = props;

    const {socket, notify} = useContext(Context);
    const {settings} = useSettings();

    return (
        <>
            <div className={"Separator"}/>
            <FiltersBar settings={settings}/>
            <ClearPost
                id={id}
                socket={socket}
                notify={notify}
                toMake={posts}
            />
        </>
    )
}

ClearSpecialPost.propTypes = {
    posts: PropTypes.object,
    id: PropTypes.number
}

export default withPageHeader(ClearSpecialPost, {path: "/posts", Title: "Posts"});