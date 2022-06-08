import {Route, Switch, useHistory} from 'react-router';
import './App.css';
import Components from "./components"
import Script from "./components/header/script.js"
import Script2 from "./components/user/script.js";
import 'react-toastify/dist/ReactToastify.css';
import './res/grid/styles.scss';
import {ToastContainer} from 'react-toastify';
import {useEffect, useRef, useState} from "react";
import {toast} from 'react-toastify';
import {io} from "socket.io-client";
import Context from "./helpers/contextHelper"

const sessionHelper = require("./helpers/sessionHelper")
const socket = io();

function notify(content) {
    toast(content);
}

function App() {
    let modal = useRef();

    const [flag, setFlag] = useState(false);
    const history = useHistory();

    function open() {
        modal?.current?.classList?.toggle("Open");
    }

    useEffect(() => {
        sessionHelper?.default?.isElive(history);

        Script.GetShortUserInfo(notify)?.then((newState) => {
            debugger
            Script2.SaveInfo(newState?.data);
            setFlag(true);
        });
    }, []);

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
                        <Route exact path={"/followers"} render={() => <Components.Followers/>}/>
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
                <Route exact path={"/auth"} render={() => <Components.ContainerAuth/>}/>
            </div>
        </Context.Provider>
    );
}

export default App;
