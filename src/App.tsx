import {Route, Switch, useHistory} from 'react-router';
import './App.css';
import Components from "./components"
import HeaderHelper from "../src/header/script.js"
import UserHelper from "./user/UserHelper";
import 'react-toastify/dist/ReactToastify.css';
import './res/bootstrap/bootstrap.min.css';
import './res/grid/styles.scss';
import './res/grid/drag-drop.scss';
import {ToastContainer} from 'react-toastify';
import {SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {toast} from 'react-toastify';
import {io} from "socket.io-client";
import {setupDb} from "./db";
import "./i18n";
import GalleryStyles from "./gallery/gallery.module.css";
import SettingsStyles from "./settings/settings.module.css";
import {headerListLinks, USER_INFORMATION} from "./vars";
import store from "./app/store";
import {Provider, useDispatch} from 'react-redux';
import React from "react";
import FastActions from "./fast-actions/fast-actions.module.css";
import FastMessages from "./fast-message/fast-message.module.css";
import FastMusic from "./fast-music/fast-music.module.css";
import BookmarksStyle from "./bookmarks/bookmarks.module.css";
import {getFastDisplay} from "./fast-actions/FastActionsContainer";
import {useLocation} from "react-router-dom";
import {useSettings} from "./hooks";
import {getItemFromLocalStorage} from "./localStorageService";
import {setNotifications} from "./app/notificationReducer";
import AboveHeader from "./components/above-header/AboveHeader";
import SessionHelper from "./helpers/sessionHelper"

const socket = io();

export function notify(content: string | React.ReactNode) {
    toast(content);
}

type MusicContextType = {
    [key: string]: any
}

export const MusicContext = React.createContext<[MusicContextType, React.Dispatch<SetStateAction<Record<string, unknown>>>]>([{}, () => {
//spare
}]);

export function height() {
    return (window.innerHeight) ?
        window.innerHeight :
        document.documentElement.clientHeight || document.body.clientHeight || 0;
}

export const Context = React.createContext<{ notify: typeof notify, socket: typeof socket }>({socket, notify});

function MaintainedComponents() {
    return (<Components.FastActionsContainer/>)
}

function AppCover() {
    const [musicContext, setMusicContext] = useState({});

    return (
        <MusicContext.Provider value={[musicContext, setMusicContext]}>
            <Context.Provider value={{notify, socket}}>
                <Provider store={store}>
                    <AboveHeader/>
                    <MaintainedComponents/>
                    <App/>
                </Provider>
            </Context.Provider>
        </MusicContext.Provider>
    )
}

function App() {
    const modal = useRef<HTMLDivElement>(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const {settings} = useSettings();
    const userInformation = getItemFromLocalStorage(USER_INFORMATION);

    function open() {
        window.document.body.querySelector(".App")?.classList.remove("Open");
        modal?.current?.classList?.toggle("Open");
    }

    useEffect(() => {
        SessionHelper?.default?.isTokenAlive(history);
        HeaderHelper.GetShortUserInfo(notify)?.then((newState: { data: any; }) => UserHelper.SaveInfo(newState?.data));
        setupDb();
    }, []);

    useEffect(() => {
        if (userInformation?.id) {
            socket.emit("addUserToChat", userInformation?.id);
        }
    }, [userInformation?.id])

    const location = useLocation();
    const screenHeight = useMemo(() => height(), []);

    const [containerDisplay, setContainerDisplay] = useState<"flex" | "none">("flex");

    useEffect(() => {
        setContainerDisplay(() => getFastDisplay(history))
        socket.on("getMessageInChat", (data) => {
            dispatch(setNotifications(data))
        });
    }, [location?.pathname])

    return (
        <>
            <style>{`
            .${FastActions.Container}, .${FastMessages.Container}, .${FastMusic.Container} {
            display: ${containerDisplay};
            }
            @keyframes pulse {
            0% {
            -moz-box-shadow: 0 0 0 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
            box-shadow: 0 0 5px 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
            }
            70% {
            -moz-box-shadow: 0 0 0 5px ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
            box-shadow: 0 0 5px 5px ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
            }
            100% {
            -moz-box-shadow: 0 0 0 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
            box-shadow: 0 0 5px 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
            }
            }
            .App {
            height: 700px;
            overflow: auto;
            background: ${settings?.configs?.background[settings?.background]};
            } 
            .${BookmarksStyle.BookmarksContainer} {
             min-height: ${screenHeight - 84}px;
             }
            .${BookmarksStyle.BookmarksContainer} .empty-table {
            color:${settings?.configs?.color[settings?.color]};
            }
            .App.Open {
            height: ${screenHeight - 1}px!important;
            }
            .aside-container {
            min-height: ${screenHeight - 1}px;
            }
             .aside-container div.onePostContainer{
            min-height: ${screenHeight - 1}px;
            }
            .aside-container main {
            min-height: ${screenHeight - 1}px;
            } 
            .aside-container > div {
            min-height: ${screenHeight - 1}px;
            height: fit-content;
            } 
            .${GalleryStyles.Container} {
            min-height: ${screenHeight - 1}px;
            }
             .${SettingsStyles.Container} {
            min-height: ${screenHeight - 1}px;
            }
            .mainFollowContainer {
            min-height: ${screenHeight - 1}px;
            }
            `}</style>
            <div className="App">
                <Components.Header/>
                <Switch>
                    <Route exact path={headerListLinks.base} render={() => <Components.MainPage open={open}/>}/>
                    <Route exact path={headerListLinks.users + "/:id?"} render={() => <Components.UsersContainer/>}/>
                    <Route exact path={headerListLinks.profile + "/:id?"} render={() => <Components.Profile/>}/>
                    <Route exact path={headerListLinks.posts + "/:id?"} render={() => <Components.PostsContainer/>}/>
                    <Route exact path={headerListLinks.post + "/:type"} render={() => <Components.SpecialPosts/>}/>
                    <Route exact path={headerListLinks.comment + "/:id?"} render={() => <Components.Comment/>}/>
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
                <Route path={headerListLinks.games + "/:gameType?"}
                       render={() => <Components.GamesContainer/>}/>
                <Route path={headerListLinks.bookmarks}
                       render={() => <Components.Bookmarks/>}/>
                <Route exact path={headerListLinks.settings}
                       render={() => <Components.SettingsContainerPage/>}/>
                <Route exact path={headerListLinks.chats} render={() => <Components.ChatContainer/>}/>
                <Route exact path={headerListLinks.notifications} render={() => <Components.NotificationsContainer/>}/>
                <Route exact path={headerListLinks.music} render={() => <Components.MusicContainerPage/>}/>
                <Route exact path={headerListLinks.auth} render={() => <Components.ContainerAuth/>}/>
                <Route exact path={headerListLinks.gallery + "/:folderName?"}
                       render={() => <Components.GalleryContainer/>}/>
            </div>
        </>
    )
}

export default AppCover;
