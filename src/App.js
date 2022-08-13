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
import {useEffect, useRef, useState} from "react";
import {toast} from 'react-toastify';
import {io} from "socket.io-client";
import Context from "./helpers/contextHelper"
import {setupDb} from "./db";
import "./i18n";
import galleryStyles from "./gallery/gallery.module.css";
import settingsStyles from "./settings/settings.module.css";
import {headerListLinks} from "./vars";
import FastMessageContainer from "./fastMessage/FastMessageContainer";
import FastMusicContainer from "./fastMusic/FastMusicContainer";
import store from "./app/store";
import {Provider} from 'react-redux';
import React from "react";
import MusicContainerPage from "./music/MusicContainerPage";

const sessionHelper = require("./helpers/sessionHelper")
const socket = io();

export function notify(content) {
    toast(content);
}

export const MusicContext = React.createContext({});

function App() {
    let modal = useRef();

    const [flag, setFlag] = useState(false);
    const history = useHistory();
    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

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

    function height() {
        return (window.innerHeight) ?
            window.innerHeight :
            document.documentElement.clientHeight || document.body.clientHeight || 0;
    }

    const [musicContext, setMusicContext] = useState({});

    return (
        <MusicContext.Provider value={[musicContext, setMusicContext]}>
            <Provider store={store}>
                <Context.Provider value={{notify, socket}}>
                    <style>{`
            .App {
            min-height: ${height() - 1}px;
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
                                <Route exact path={headerListLinks.auth} render={() => <Components.ContainerAuth/>}/>
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
                        <Route exact path={headerListLinks.games + "/:gameType?"}
                               render={() => <Components.GamesContainer/>}/>
                        <Route exact path={headerListLinks.settings}
                               render={() => <Components.SettingsContainerPage/>}/>
                        <Route exact path={headerListLinks.chats} render={() => <Components.ChatContainer/>}/>
                        <Route exact path={headerListLinks.music} render={() => <Components.MusicContainerPage/>}/>
                        <Route exact path={headerListLinks.auth} render={() => <Components.ContainerAuth/>}/>
                        <Route exact path={headerListLinks.gallery + "/:folderName?"}
                               render={() => <Components.GalleryContainer/>}/>
                        <Route npath={headerListLinks.chats} render={() => <FastMessageContainer/>}/>
                    </div>
                </Context.Provider>
                <FastMusicContainer/>
            </Provider>
        </MusicContext.Provider>
    );
}

export default App;
