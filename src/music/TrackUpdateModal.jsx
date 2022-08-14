import headerStyle from "../header/header.module.css";
import s from "./music.module.css";
import {buttonsConfig} from "../createPost/CreatePostLine";


function TrackUpdateModal(props) {
    const {
        editConfig,
        wrapperRef,
        setNewName,
        updateTrackDescription,
        settings,
        setAllFiles,
        setEditConfig,
        newName,
        setTrackCategory,
        trackCategory,
    } = props;

    return(
        <>
            {
                editConfig?.isOpened &&
                <div
                    className={headerStyle.PostModal}
                >
                    <div
                        ref={wrapperRef}
                        className={s.TrackUpdateContainer}
                    >
                        <textarea
                            placeholder={"New track name"}
                            className={s.TrackTextarea}
                            onInput={(e) => {
                                setNewName(e.target.value)
                            }}
                        />
                        <textarea
                            placeholder={"Track category"}
                            className={s.TrackTextarea}
                            onInput={(e) => {
                                setTrackCategory(e.target.value)
                            }}
                        />
                        <button
                            onClick={() => {
                                updateTrackDescription(settings, editConfig?.index, (newFiles) => {
                                    setAllFiles(() => {
                                        return [...newFiles]
                                    });
                                    setNewName(null);
                                    setEditConfig({isOpened: false});
                                    setTrackCategory(null)
                                }, newName, trackCategory)
                            }}
                            className={`button btn btn-default ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                        >
                            Update track name
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default TrackUpdateModal;