import React, {useState, useEffect, useRef, useMemo} from "react";
import {Input, useSelector} from "usetheform";
import PrivacyPickerStyles from "./privacy-picker.module.css";
import WorlSVG from "./images/world.svg";
import PrivacySVG_0 from "./images/privacy-world.svg";
import PrivacySVG_1 from "./images/privacy-following.svg";
import PrivacySVG_2 from "./images/privacy-mentioned.svg";
import {setPostInformation} from "../../../app/postReducer";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

const labels = {
    0: "Everyone",
    1: "People you follow",
    2: "Only people you mention"
};

export const PrivacyPicker = ({children}) => {
    const dispatch = useDispatch();
    const [visible, setVisibility] = useState(() => false);
    const [postPrivacy] = useSelector((state) => state.postPrivacy);
    const bntLabel = useMemo(() => `${labels[postPrivacy] || labels[0]} can reply`, [labels, postPrivacy])

    const refPicker = useClickOutPicker(() => {
        visible && setVisibility(false);
    });

    const toggle = (event) => {
        event.stopPropagation();
        setVisibility((prev) => !prev);
    };

    useEffect(() => {
        if (postPrivacy !== undefined) {
            dispatch(setPostInformation({sharedInfo: +postPrivacy === 0 ? "all" : +postPrivacy === 1 ? "follow" : "mentions"}));
            setVisibility(false);
        }
    }, [postPrivacy]);

    return (
        <div className={PrivacyPickerStyles.PrivacyPicker}>
            <button type="button" className={PrivacyPickerStyles.PrivacyPicker_Btn} onClick={toggle}>
                <img alt={bntLabel} src={WorlSVG}/>
                <span>{bntLabel}</span>
            </button>
            {children}
            <div ref={refPicker} data-visible={visible} className={PrivacyPickerStyles.PrivacySelection}>
                <div className={PrivacyPickerStyles.PrivacySelection__Header}>Who can reply?</div>
                <div className={PrivacyPickerStyles.PrivacySelection__Hint}>
                    Choose who can reply to this Post. Anyone mentioned can always reply.
                </div>
                <div className={PrivacyPickerStyles.PrivacySelection__Radios}>
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

PrivacyPicker.propTypes = {
    children: PropTypes.node
}

function RadioWithLabel({
                            id,
                            img,
                            name = "postPrivacy",
                            children,
                            value,
                            checked
                        }) {
    return (
        <div className={PrivacyPickerStyles.RadioWithLabel}>
            <Input type="radio" id={id} name={name} value={value} checked={checked}/>
            <label className={PrivacyPickerStyles.RadioWithLabel__Label} htmlFor={id}>
                <img alt="privacy" src={img}/>
                <span>{children}</span>
            </label>
        </div>
    );
}

RadioWithLabel.propTypes = {
    id: PropTypes.string,
    img: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string
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
