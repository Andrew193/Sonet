import React from "react";
import PropTypes from "prop-types";
import {LazyLoadImage} from 'react-lazy-load-image-component'
import st from "../res/img/Spinner-1s-200px.gif"

function LazyImage(props) {
    const {
        imageSrc,
        onClick,
        imgClass,
        wrapperStyle,
        wrapperClassName,
    } = props;

    return (
        <LazyLoadImage
            placeholderSrc={st}
            src={imageSrc}
            wrapperClassName={`lazyImg ${wrapperClassName}`}
            className={imgClass}
            style={{...wrapperStyle}}
            onClick={(e) => {
                if (onClick) {
                    onClick(e)
                }
            }}
        />
    )
}

LazyImage.propTypes = {
    imageSrc: PropTypes.string,
    onClick: PropTypes.func,
    imgClass: PropTypes.string,
    wrapperStyle: PropTypes.object,
    wrapperClassName: PropTypes.string
}

LazyImage.defaultsProps = {
    onClick: () => {
        //spare
    }
}

export default LazyImage;