import withPageHeader from "../hoc/withPageHeader"
import SortLine from "./SortLine.jsx";
import ClearPost from "./PostsInnerContent"
import {useContext, useEffect, useState} from "react";
import Context from "../helpers/contextHelper";
import {getSettings} from "../db";

function ClearSpecialPost(props) {
    const {socket, notify} = useContext(Context);

    const {
        posts,
        id
    } = props;

    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <>
            <div className={"Separator"}/>
            <ClearPost
                id={id}
                socket={socket}
                notify={notify}
                toMake={posts}
                settings={settings}
            />
            <SortLine/>
        </>
    )
}

export default withPageHeader(ClearSpecialPost, {path: "/posts", Title: "Posts"});