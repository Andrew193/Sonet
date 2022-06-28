import s from "./posts.module.css";
import {useEffect, useState} from "react";
import LazyImage from "./LazyImage";
import React from "react";

function PostItemsImages(props) {
    const {
        valueSavedImages,
        openImageViewer
    } = props;

    const [images, setImages] = useState(JSON.parse(valueSavedImages));

    useEffect(() => {
        setImages(JSON.parse(valueSavedImages)?.map((img, index) =>
            <LazyImage
                onClick={() => {
                    console.log(index)
                    openImageViewer(index)
                }}
                key={JSON.parse(img)?.webContentLink}
                imgClass={s.ImgPreview}
                imageSrc={JSON.parse(img)?.webContentLink}
            />
        ))
    }, [])

    return (
        <div className={s.ImagesContainer}>
            {images}
        </div>
    )
}

const MemoizedPostItemsImages = React.memo(PostItemsImages);

export default MemoizedPostItemsImages;