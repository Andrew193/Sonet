import React from "react";
import PropTypes from "prop-types";

type ProgressBar = {
    percent: number,
    label: string,
    height: string,
    width: string,
    radius: string,
    borderColor: string,
    fillColor: string,
    colorShift: boolean
}

function ProgressBar(props: ProgressBar) {
    const {
        percent,
        label,
        height,
        width,
        radius,
        borderColor,
        fillColor,
        colorShift
    } = props;

    return (
        <div
            style={{
                height,
                position: "relative",
                width,
                borderRadius: radius,
                border: `2px solid ${borderColor}`
            }}>
            <div
                style={{
                    width: `${percent}%`,
                    height: '100%',
                    borderRadius: 'inherit',
                    backgroundColor: fillColor,
                    transition: 'all .2s ease',
                    [colorShift ? 'filter' : '']: `hue-rotate(-${percent}deg)`,
                    textAlign: "center",
                    padding: percent ? '1.5px' : 'none'
                }}
            >{label}</div>
            <span
                style={{
                    fontSize: '9px',
                    position: 'absolute',
                    top: '1px',
                    right: '1px',
                    padding: 'unset',
                    fontWeight: '600'
                }}
            >{percent.toFixed(0)}%</span>
        </div>
    );
}

ProgressBar.propTypes = {
    percent: PropTypes.number,
    label: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    radius: PropTypes.string,
    borderColor: PropTypes.string,
    fillColor: PropTypes.string,
    colorShift: PropTypes.bool
};

ProgressBar.defaultProps = {
    height: '25px',
    radius: '5px',
    borderColor: '#eee',
    fillColor: 'rgb(150 150 238)',
    colorShift: true
}

export default ProgressBar;