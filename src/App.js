import {Route, Switch, useHistory} from 'react-router';
import './App.css';
import Components from "./components"
import Script from "../src/header/script.js"
import Script2 from "./user/script.js";
import 'react-toastify/dist/ReactToastify.css';
import './res/bootstrap/bootstrap.min.css';
import './res/grid/styles.scss';
import {ToastContainer} from 'react-toastify';
import {useEffect, useRef, useState} from "react";
import {toast} from 'react-toastify';
import {io} from "socket.io-client";
import Context from "./helpers/contextHelper"
import {setupDb} from "./db";
import "./i18n";
import galleryStyles from "./gallery/gallery.module.css";
import settingsStyles from "./settings/settings.module.css";

const sessionHelper = require("./helpers/sessionHelper")
const socket = io();

export function notify(content) {
    toast(content);
}

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

    return (
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
                        <Route exact path={"/"} render={() =>
                            <div className={"genContainer"}>
                                <Components.MainPage open={open}/>
                                <Components.TopInfo/>
                            </div>}>
                        </Route>
                        <Route exact path={"/auth"} render={() => <Components.ContainerAuth/>}/>
                        <Route exact path={"/users/:id?"} render={() =>
                            <div className={"genContainer"}>
                                <Components.UsersContainer/>
                                <Components.TopInfo/>
                            </div>}/>
                        <Route exact path={"/profile/:id?"} render={() =>
                            <div className={"genContainer"}>
                                <Components.Profile/>
                                <Components.TopInfo/>
                            </div>}/>
                        <Route exact path={"/posts/:id?"} render={() =>
                            <div className={"genContainer"}>
                                <Components.PostsContainer/>
                                <Components.TopInfo/>
                            </div>}/>
                        <Route exact path={"/post/:type"} render={() => <Components.SpecialPosts/>}/>
                        <Route exact path={"/comment/:id?"} render={() => <Components.Comment/>}/>
                        <Route exact path={"/followers/Followings"} render={() => <Components.Followings/>}/>
                        <Route exact path={"/followers/Followers"} render={() => <Components.Followers/>}/>
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
                <Route exact path={'/games/:gameType?'} render={() => <Components.GamesContainer/>}/>
                <Route exact path={"/settings"} render={() => <Components.SettingsContainerPage/>}/>
                <Route exact path={"/chats"} render={() => <Components.ChatContainer/>}/>
                <Route exact path={"/auth"} render={() => <Components.ContainerAuth/>}/>
                <Route exact path={"/gallery/:folderName?"} render={() => <Components.GalleryContainer/>}/>
            </div>
        </Context.Provider>
    );
}

export default App;
