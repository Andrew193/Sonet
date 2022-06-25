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
import {getSettings, setupDb} from "./db";

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
        console.log("test")
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

    return (
        <Context.Provider value={{notify, socket}}>
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
            </div>
        </Context.Provider>
    );
}

export default App;
