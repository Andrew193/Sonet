import React from "react";

function ProgressBar(props) {
    const {
        percent,
        label,
        height = '25px',
        width,
        radius = '5px',
        borderColor = '#eee',
        fillColor = 'rgb(150 150 238)',
        colorShift = true
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
                    [colorShift ? 'filter' : null]: `hue-rotate(-${percent}deg)`,
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

export default ProgressBar;