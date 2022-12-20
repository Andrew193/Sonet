import React from "react";
import {WhatsHappeningBar} from "./WhatsHappeningBar";
import {Form} from "usetheform";
import s from "./solid-textarea.module.css"
import {PrivacyPicker} from "./privacy-picker/PrivacyPicker";
import {SolidTextareaActions} from "./actions/SolidTextareaActions";
import {useState} from "react";
import AddQuizBar from "../quizBar/AddQuizBar";
import PropTypes from "prop-types";

function MainCover(props) {
    const {
        customStyle,
        setIsOpened,
        images,
        setImages
    } = props;

    const [maxLength, setMaxLength] = useState(140)

    return (
        <>
            <Form onSubmit={()=>{
                //spare
            }}>
                <WhatsHappeningBar maxChars={maxLength} setMaxLength={setMaxLength}/>
                <PrivacyPicker>
                    <AddQuizBar/>
                </PrivacyPicker>
                <span className={s.ThematicBreak}/>
                <SolidTextareaActions
                    customStyle={customStyle}
                    setIsOpened={setIsOpened}
                    images={images}
                    maxChars={maxLength}
                    setMaxLength={setMaxLength}
                    setImages={setImages}
                />
            </Form>
        </>
    )
}

MainCover.propTypes = {
    customStyle: PropTypes.object,
    setIsOpened: PropTypes.func,
    images: PropTypes.array,
    setImages: PropTypes.func
}

export default MainCover;