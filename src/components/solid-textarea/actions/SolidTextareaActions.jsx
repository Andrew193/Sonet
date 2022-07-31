import s from "../solid-textarea.module.css"
import {UploadMediaBar} from "./UploadMediaBar";
import {CharacterCounter} from "./CharacterCounter";
import {Submit} from "./Submit";

export function SolidTextareaActions(props) {
    const {
        customStyle,
        setIsOpened,
        images,
        setImages,
        maxChars,
        setMaxLength
    } = props;

    return (
        <div className={s.ActionBar}>
            <UploadMediaBar/>
            <div className={s.ActionBar__Submit}>
                <CharacterCounter maxChars={maxChars} />
                <span className={s.ThematicBreakVertical}/>
                <Submit
                    setMaxLength={setMaxLength}
                    customStyle={customStyle}
                    setIsOpened={setIsOpened}
                    images={images}
                    setImages={setImages}
                />
            </div>
        </div>
    )
}