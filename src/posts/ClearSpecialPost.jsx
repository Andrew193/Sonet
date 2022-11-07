import withPageHeader from "../hoc/withPageHeader"
import SortLine from "./SortLine.jsx";
import ClearPost from "./PostsInnerContent"
import {useContext} from "react";
import {Context} from "../App";
import FiltersBar from "./FiltersBar";
import {useSettings} from "../hooks";

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

export default withPageHeader(ClearSpecialPost, {path: "/posts", Title: "Posts"});