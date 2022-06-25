import {Link} from "react-router-dom";
import CreatePost from "../createPost/CreatePostLine";
import ConfigLine from "./configLine";
import s from "./main-page.module.css"
import {useEffect, useState} from "react";
import {getSettings} from "../db";

function ClearMainPage(props) {
    const {
        open
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
        <main
            className={s.Container}
            style={{
                fontSize: settings?.configs?.size[settings?.fontSize],
                color: settings?.configs?.color[settings?.color],
                background: settings?.configs?.background[settings?.background],
                borderLeft: `1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"}`,
                borderRight: `1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"}`
            }}
        >
            <style>
                {`
                 html{
                     background: ${settings?.configs?.background[settings?.background]};
                 }
                `}
            </style>
            <div
                className={"basicPageHead"}
                style={{
                    borderBottom: `1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"}`,
                    color: settings?.configs?.color[settings?.color],
                }}
            >
                <Link
                    to={{pathname: "/"}}
                    style={{
                        fontSize: settings?.configs?.size[settings?.fontSize],
                        background: settings?.configs?.background[settings?.background],
                    }}
                >Home</Link>
            </div>
            <CreatePost
                customStyle={{
                    fontSize: settings?.configs?.size[settings?.fontSize],
                    color: settings?.configs?.color[settings?.color],
                    background: settings?.configs?.background[settings?.background],
                }}
            />
            <div
                className={"Separator"}
                onClick={(e) => {
                    e.target.nextElementSibling.classList.toggle("Hide")
                }}
            />
            <ConfigLine
                open={open}
                customStyle={{
                    fontSize: settings?.configs?.size[settings?.fontSize],
                    color: settings?.configs?.color[settings?.color],
                    background: settings?.configs?.background[settings?.background],
                }}
            />
        </main>
    )
}

export default ClearMainPage;