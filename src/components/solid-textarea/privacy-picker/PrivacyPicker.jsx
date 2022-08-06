import React, { useState, useEffect, useRef } from "react";
import { Input, useSelector } from "usetheform";
import s from "./privacy-picker.module.css";

import WorlSVG from "./images/world.svg";
import PrivacySVG_0 from "./images/privacy-world.svg";
import PrivacySVG_1 from "./images/privacy-following.svg";
import PrivacySVG_2 from "./images/privacy-mentioned.svg";

const labels = {
    0: "Everyone",
    1: "People you follow",
    2: "Only people you mention"
};

export const PrivacyPicker = () => {
    const [visible, setVisibility] = useState(() => false);
    const [postPrivacy] = useSelector((state) => state.postPrivacy);

    const label = labels[postPrivacy] || labels[0];
    const bntLabel = `${label} can reply`;

    const refPicker = useClickOutPicker(() => {
        visible && setVisibility(false);
    });

    const toggle = (e) => {
        e.stopPropagation();
        setVisibility((prev) => !prev);
    };

    // for each value change it closes the Picker
    useEffect(() => {
        if (postPrivacy !== undefined) {
            setVisibility(false);
        }
    }, [postPrivacy]);

    return (
        <div className={s.PrivacyPicker}>
            <button type="button" className={s.PrivacyPicker_Btn} onClick={toggle}>
                <img alt={bntLabel} src={WorlSVG} />
                <span>{bntLabel}</span>
            </button>
            <div ref={refPicker} data-visible={visible} className={s.PrivacySelection}>
                <div className={s.PrivacySelection__Header}>Who can reply?</div>
                <div className={s.PrivacySelection__Hint}>
                    Choose who can reply to this Post. Anyone mentioned can always reply.
                </div>
                <div className={s.PrivacySelection__Radios}>
                    <RadioWithLabel img={PrivacySVG_0} id="everyone" value="0" checked>
                        {labels[0]}
                    </RadioWithLabel>
                    <RadioWithLabel img={PrivacySVG_1} id="onlyfollower" value="1">
                        {labels[1]}
                    </RadioWithLabel>
                    <RadioWithLabel img={PrivacySVG_2} id="onlymentioned" value="2">
                        {labels[2]}
                    </RadioWithLabel>
                </div>
            </div>
        </div>
    );
};

function RadioWithLabel({
                            id,
                            img,
                            name = "postPrivacy",
                            children,
                            value,
                            checked
                        }) {
    return (
        <div className={s.RadioWithLabel}>
            <Input type="radio" id={id} name={name} value={value} checked={checked} />
            <label className={s.RadioWithLabel__Label} htmlFor={id}>
                <img alt="privacy" src={img} />
                <span>{children}</span>
            </label>
        </div>
    );
}

const useClickOutPicker = (cb) => {
    const ref = useRef(null);
    useEffect(() => {
        const clickOut = (e) => {
            if (!ref.current.contains(e.target)) {
                cb(e);
            }
        };
        window.addEventListener("click", clickOut);
        return () => {
            window.removeEventListener("click", clickOut);
        };
    }, [cb]);
    return ref;
};
