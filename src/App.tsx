import {Route, Switch, useHistory} from 'react-router';
import './App.css';
import Components from "./components"
import Script from "../src/header/script.js"
import Script2 from "./user/script.js";
import 'react-toastify/dist/ReactToastify.css';
import './res/bootstrap/bootstrap.min.css';
import './res/grid/styles.scss';
import './res/grid/drag-drop.scss';
import {ToastContainer} from 'react-toastify';
import {SetStateAction, useEffect, useRef, useState} from "react";
import {toast} from 'react-toastify';
import {io} from "socket.io-client";
import {setupDb} from "./db";
import "./i18n";
import galleryStyles from "./gallery/gallery.module.css";
import settingsStyles from "./settings/settings.module.css";
import {headerListLinks, USER_INFORMATION} from "./vars";
import store from "./app/store";
import {Provider, useDispatch} from 'react-redux';
import React from "react";
import fastActions from "./fast-actions/fast-actions.module.css";
import fastMessages from "./fast-message/fast-message.module.css";
import fastMusic from "./fast-music/fast-music.module.css";
import bookmarksStyle from "./bookmarks/bookmarks.module.css";
import {getFastDisplay} from "./fast-actions/FastActionsContainer";
import {useLocation} from "react-router-dom";
import {useSettings} from "./hooks";
import {getItemFromLocalStorage} from "./localStorageService";
import {setNotifications} from "./app/notificationReducer";
import AboveHeader from "./components/above-header/AboveHeader";

const sessionHelper = require("./helpers/sessionHelper")
const socket = io();

export function notify(content: string | React.ReactNode) {
    toast(content);
}

type MusicContextType = {
    [key: string]: any
}

export const MusicContext = React.createContext<[MusicContextType, React.Dispatch<SetStateAction<{}>>]>([{}, () => {
}]);

export function height() {
    return (window.innerHeight) ?
        window.innerHeight :
        document.documentElement.clientHeight || document.body.clientHeight || 0;
}

export const Context = React.createContext<{ notify: typeof notify, socket: typeof socket }>({socket, notify});

function Test() {
    return (<Components.FastActionsContainer/>)
}

function AppCover() {
    const [musicContext, setMusicContext] = useState({});

    return (
        <MusicContext.Provider value={[musicContext, setMusicContext]}>
            <Context.Provider value={{notify, socket}}>
                <Provider store={store}>
                    <AboveHeader/>
                    <Test/>

                    <App/>
                </Provider>
            </Context.Provider>
        </MusicContext.Provider>
    )
}

function App() {
    let modal = useRef<HTMLDivElement>(null);
    const [flag, setFlag] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const {settings} = useSettings();
    const userInformation = getItemFromLocalStorage(USER_INFORMATION);

    function open() {
        window?.document?.body?.querySelector(".App")?.classList?.remove("Open")
        modal?.current?.classList?.toggle("Open");
    }

    useEffect(() => {
        sessionHelper?.default?.isElive(history);
        Script.GetShortUserInfo(notify)?.then((newState) => {
            Script2.SaveInfo(newState?.data);
            setFlag(true);
        });

        setupDb(async () => {
        });
    }, []);

    useEffect(() => {
        if (userInformation?.id) {
            socket.emit("addUserToChat", userInformation?.id);
        }
    }, [userInformation?.id])

    const location = useLocation();

    const [containerDisplay, setContainerDisplay] = useState<"flex" | "none">("flex");

    useEffect(() => {
        setContainerDisplay(() => getFastDisplay(history))
        socket.on("getMessageInChat", (data) => {
            console.log(data, location?.pathname)
            dispatch(setNotifications(data))
        });
    }, [location?.pathname])

    return (
        <>
            <style>{`
            .${fastActions.Container}, .${fastMessages.Container}, .${fastMusic.Container} {
            display: ${containerDisplay};
            }
            .App {
            height: ${height() - 2}px;
            overflow: auto;
            background: ${settings?.configs?.background[settings?.background]};
            } 
            .${bookmarksStyle.BookmarksContainer} {
             min-height: ${height() - 84}px;
             }
            .${bookmarksStyle.BookmarksContainer} .empty-table {
            color:${settings?.configs?.color[settings?.color]};
            }
            .App.Open {
            height: ${height() - 1}px!important;
            }
            .genContainer {
            min-height: ${height() - 1}px;
            }
             .genContainer div.onePostContainer{
            min-height: ${height() - 1}px;
            }
            .genContainer main {
            min-height: ${height() - 1}px;
            } 
            .genContainer > div {
            min-height: ${height() - 1}px;
            height: fit-content;
            } 
            .${galleryStyles.Container} {
            min-height: ${height() - 1}px;
            }
             .${settingsStyles.Container} {
            min-height: ${height() - 1}px;
            }
            .mainFollowContainer {
            min-height: ${height() - 1}px;
            }
            `}</style>
            <div className="App">
                {flag && <>
                    <Components.Header/>
                    <Switch>
                        <Route exact path={headerListLinks.base} render={() =>
                            <div className={"genContainer"}>
                                <Components.MainPage open={open}/>
                                <Components.TopInfo/>
                            </div>}>
                        </Route>
                        <Route exact path={headerListLinks.users + "/:id?"} render={() =>
                            <div className={"genContainer"}>
                                <Components.UsersContainer/>
                                <Components.TopInfo/>
                            </div>}/>
                        <Route exact path={headerListLinks.profile + "/:id?"} render={() =>
                            <div className={"genContainer"}>
                                <Components.Profile/>
                                <Components.TopInfo/>
                            </div>}/>
                        <Route exact path={headerListLinks.posts + "/:id?"} render={() =>
                            <div className={"genContainer"}>
                                <Components.PostsContainer/>
                                <Components.TopInfo/>
                            </div>}/>
                        <Route exact path={headerListLinks.post + "/:type"}
                               render={() => <Components.SpecialPosts/>}/>
                        <Route exact path={headerListLinks.comment + "/:id?"}
                               render={() => <Components.Comment/>}/>
                        <Route exact path={headerListLinks.followers + "/Followings"}
                               render={() => <Components.Followings/>}/>
                        <Route exact path={headerListLinks.followers + "/Followers"}
                               render={() => <Components.Followers/>}/>
                    </Switch>
                    <Components.Footer/>
                    <ToastContainer
                        toastStyle={{background: "black", borderRadius: "15px"}}
                        hideProgressBar={true}
                        autoClose={2000}
                        position="top-right"
                    />
                    <Components.ModalUser ref={modal} click={open}/>
                </>}
                <Route path={headerListLinks.games + "/:gameType?"}
                       render={() => <Components.GamesContainer/>}/>
                <Route path={headerListLinks.bookmarks}
                       render={() => <Components.Bookmarks/>}/>
                <Route exact path={headerListLinks.settings}
                       render={() => <Components.SettingsContainerPage/>}/>
                <Route exact path={headerListLinks.chats} render={() => <Components.ChatContainer/>}/>
                <Route exact path={headerListLinks.music} render={() => <Components.MusicContainerPage/>}/>
                <Route exact path={headerListLinks.auth} render={() => <Components.ContainerAuth/>}/>
                <Route exact path={headerListLinks.gallery + "/:folderName?"}
                       render={() => <Components.GalleryContainer/>}/>
            </div>
        </>
    );
}

export default AppCover;
