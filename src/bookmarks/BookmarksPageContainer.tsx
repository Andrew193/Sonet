import MaintainedPageHeader from "../components/MaintainedPageHeader";
import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import s from "../posts/posts.module.css";
import bookmarksStyles from "./bookmarks.module.css";
import {getEmptyElementsThemeConfig} from "../utils";
import {useSettings} from "../hooks";
import HttpHelper from "../helpers/httpHelper";
import {getItemFromLocalStorage} from "../localStorageService";
import {headerListLinks, USER_INFORMATION} from "../vars";
import PostItem from "../posts/PostItem";
import EmptySection from "../components/common/empty-section/EmptySection";

function Bookmarks() {
    const {t} = useTranslation();
    const {settings} = useSettings();
    const [bookmarks, setBookmarks] = useState<null | { markText: string, id: number }[]>(null);
    const id = useMemo(() => getItemFromLocalStorage(USER_INFORMATION, "id")
        , [JSON.stringify(getItemFromLocalStorage(USER_INFORMATION))]);

    useEffect(() => {
        function getData() {
            HttpHelper.BOOKMARKS.getMyBookmarks(id, setBookmarks, (error: any) => console.error(error));
        }

        getData();
    }, [])

    const parsedBookmarks = useMemo(() => {
        return bookmarks ? bookmarks!.map((bookmark, index) => <PostItem
                key={index}
                value={JSON.parse(bookmark.markText)}
                id={id}
                settings={settings}
                setPost={() => {
                }}
                index={index}
                setParentPosts={() => {
                }}
                ignoreAppOpen
                bookmark={bookmark.id}
            />
        ) : null
    }, [bookmarks])

    return (
        <div className={s.Container} style={{...getEmptyElementsThemeConfig(settings)}}>
            <MaintainedPageHeader path={headerListLinks.base} linkPath={headerListLinks.bookmarks} linkTitle={t("Bookmarks")}/>
            <div className={"Separator"}/>
            <main className={s.PostsCont + " onePostContainer " + bookmarksStyles.BookmarksContainer}>
                {parsedBookmarks?.length ? parsedBookmarks : <EmptySection
                    title={"Nothing to show here yet"}
                    message={"You haven't created any Songs yet. When you do, they'll show up here."}
                />}
            </main>
        </div>
    )
}

export default Bookmarks;