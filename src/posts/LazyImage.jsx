import LazyLoad from 'react-lazyload';
import {useState} from "react";
import {Avatar} from "@mui/material";
import Placeholder from "./Placeholder";

function LazyImage(props) {
    const {
        imageSrc,
        onClick,
        imgClass
    } = props;

    const [isLoading, setIsLoading] = useState(true);

    return (
        <LazyLoad
            height={200}
            offset={[-50, 0]}
            placeholder={<Placeholder/>}
        >
            {
                <>
                    {!!isLoading && <Placeholder/>}
                    {imageSrc && <Avatar
                        src={imageSrc}
                        alt={""}
                        className={imgClass}
                        style={{display: !!isLoading ? "none" : "block"}}
                        onLoad={() => {
                            setIsLoading(false)
                        }}
                        onClick={() => {
                            onClick()
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