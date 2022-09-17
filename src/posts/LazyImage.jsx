import LazyLoad from 'react-lazyload';
import {useState} from "react";
import {alpha, Avatar, hexToRgb} from "@mui/material";
import Placeholder from "./Placeholder";
import s from "./posts.module.css";
import {useSettings} from "../hooks";

function LazyImage(props) {
    const {
        imageSrc,
        onClick = () => {
        },
        imgClass,
        wrapperStyle
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const PlaceholderCover = () => <div className={s.LazyBackground}><Placeholder/></div>;
    const {settings} = useSettings();

    return (
        <LazyLoad
            key={imageSrc}
            height={200}
            offset={[-50, 0]}
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
                        style={{display: !!isLoading ? "none" : "block", ...wrapperStyle}}
                        onLoad={() => setIsLoading(false)}
                        onClick={(e) => onClick(e)}
                        onError={() => setIsLoading(false)}
                    />
                    }
                </>
            }
        </LazyLoad>
    )
}

export default LazyImage;