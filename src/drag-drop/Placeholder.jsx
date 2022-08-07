import React from 'react';

function Placeholder(props) {
    const {
        id
    } = props;

    return (
        <div className="lds-roller" id={id}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}

export default Placeholder;