import {WhatsHappeningBar} from "./WhatsHappeningBar";
import { Form } from "usetheform";
import s from "./solid-textarea.module.css"
import {PrivacyPicker} from "./privacy-picker/PrivacyPicker";
import {SolidTextareaActions} from "./actions/SolidTextareaActions";
import {useState} from "react";

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
            <Form onSubmit={onSubmit}>
                <WhatsHappeningBar maxChars={maxLength} setMaxLength={setMaxLength}/>
                <PrivacyPicker />
                <span className={s.ThematicBreak} />
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

async function onSubmit(state) {
    // make an API call
    // await submitForm(state)
    const {
        editor: {plainText},
        ...resState
    } = state;
    return true;
}


export default MainCover;