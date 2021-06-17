import { Route, Switch, useHistory } from 'react-router';
import './App.css';
import Components from "./components"
import Script from "./components/header/script.js"
import Script2 from "./components/user/script.js"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import { io } from "socket.io-client";
const sessionHelper = require("./helpers/sessionHelper")
const socket = io();
function App() {
  let modal = useRef();
  const open = () => modal.current.classList.toggle("Open")
  const notify = (content) => toast(content);
  const [flag, setFlag] = useState(false);
  const history = useHistory()
  sessionHelper.default.isElive(history);
  Script.GetShortUserInfo(notify)?.then((newState) => {
    Script2.SaveInfo(newState.data)
    setFlag(true)
  })
  return (
    <div className="App">
      {flag && <>
        <Components.Header notify={notify} socket={socket} />
        <Switch>
          <Route exact path={"/"} render={() =>
            <div className={"genContainer"}>
              <Components.MainPage socket={socket} open={open} notify={notify} />
              <Components.TopInfo socket={socket} />
            </div>}>
          </Route>
          <Route exact path={"/auth"} render={() => <Components.ContainerAuth />}></Route>
          <Route exact path={"/users/:id?"} render={() =>
            <div className={"genContainer"}>
              <Components.UsersContainer notify={notify}/>
              <Components.TopInfo socket={socket} />
            </div>}></Route>
          <Route exact path={"/profile/:id?"} render={() =>
            <div className={"genContainer"}>
              <Components.Profile />
              <Components.TopInfo socket={socket} />
            </div>}></Route>
          <Route exact path={"/posts/:id?"} render={() =>
            <div className={"genContainer"}>
              <Components.PostsContainer notify={notify} socket={socket} />
              <Components.TopInfo socket={socket} />
            </div>}></Route>
          <Route exact path={"/post/notMy"} render={() =>
            <div className={"genContainer"}>
              <Components.NotMy notify={notify} socket={socket} />
            </div>}>
          </Route>
          <Route exact path={"/post/my"} render={() =>
            <div className={"genContainer"}>
              <Components.My notify={notify} socket={socket} />
            </div>}>
          </Route>
          <Route exact path={"/comment/:id?"} render={() =>
            <Components.Comment notify={notify} socket={socket} />
          }>
          </Route>
          <Route exact path={"/followers"} render={() =>
            <Components.Followers />
          }>
          </Route>
        </Switch>
        <Components.Footer />
        <ToastContainer toastStyle={{ background: "black", borderRadius: "15px" }} hideProgressBar={true} autoClose={2000}
          position="top-right" />
        <Components.ModalUser ref={modal} click={() => open()} />
      </>}
      <Route exact path={"/auth"} render={() => <Components.ContainerAuth />}></Route>
    </div>
  );
}

export default App;
