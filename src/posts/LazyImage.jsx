import LazyLoad from 'react-lazyload';
import {useState, useEffect} from "react";
import {alpha, Avatar, hexToRgb} from "@mui/material";
import Placeholder from "./Placeholder";
import s from "./posts.module.css";
import {getSettings} from "../db";

function LazyImage(props) {
    const {
        imageSrc,
        onClick,
        imgClass
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const PlaceholderCover = () => <div className={s.LazyBackground}><Placeholder/></div>;
    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <LazyLoad
            key={imageSrc}
            height={200}
            offset={[-50, 0]}
            placeholder={<PlaceholderCover/>}
        >
            <style>{`
            .${s.LazyBackground} {
            background: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "#e6ddf9"), 0.4)}!important;
            }
            `}</style>
            {
                <>
                    {!!isLoading && <PlaceholderCover/>}
                    {imageSrc && <Avatar
                        src={imageSrc}
                        alt={""}
                        key={imageSrc}
                        className={imgClass}
                        style={{display: !!isLoading ? "none" : "block"}}
                        onLoad={() => {
                           setIsLoading(false)
                        }}
                        onClick={(e) => {
                            onClick(e)
                        }}
                        onError={() => {
                            setIsLoading(false)
                        }}
                    />
                    }
                </>
            }
        </LazyLoad>
    )
}

export default LazyImage;