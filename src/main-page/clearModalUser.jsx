import {alpha, CardActions, Typography} from "@mui/material";
import {buttonsConfig} from "../createPost/CreatePostLine";
import {useEffect, useState} from "react";
import {getSettings} from "../db";
import {useTranslation} from "react-i18next";
import InputEmoji from 'react-input-emoji';

function ClearModalUser(props) {
    const {
        setName,
        setEmail,
        setPassword,
        nm,
        em,
        pas,
        Script,
        click,
        userId
    } = props;

    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    const [text, setText] = useState('')
    const {t} = useTranslation();

    return (
        <div
            style={{
                color: settings?.configs?.color[settings?.color],
            }}
        >
            <style>
                {`
                  .Muser {
                   background:${alpha(settings?.configs?.color[settings?.color] || "rgb(177 175 175)", 0.3)}
                  }
                `}
            </style>
            <Typography
                gutterBottom
                component={'div'}
            >
                <label htmlFor="name">Your name</label>
                <input
                    name="name"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    placeholder={nm}
                />
            </Typography>
            <Typography
                gutterBottom
                component={'div'}
            >
                <label htmlFor="email">Your email</label>
                <input
                    name="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    placeholder={em}
                />
            </Typography>
            <Typography
                gutterBottom
                component={'div'}
            >
                <label htmlFor="pass">Your password</label>
                <input
                    name="pass"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    placeholder={pas}
                />
            </Typography>
            <Typography
                gutterBottom
                component={'div'}
            >
                <label htmlFor="pass">About you</label>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    placeholder={t("So... What is it?")}
                />
            </Typography>
            <CardActions>
                <button
                    className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                    onClick={() => {
                        Script.UpdateInfo({
                            userName: nm,
                            email: em,
                            password: pas,
                            id: userId,
                            description: text
                        }, click)
                    }}
                >
                    Submit
                </button>
            </CardActions>
        </div>
    )
}

export default ClearModalUser;