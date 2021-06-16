
function ClearModalUser(props) {
    const { setName, setEmail, setPassword, nm, em, pas, Script, history, click, userId} = props;
    return (
        <div>
            <div>
                <label htmlFor="name">Your name</label>
                <input name="name" onChange={(e) => setName(e.target.value)} defaultValue={nm} />
            </div>
            <div>
                <label htmlFor="email">Your email</label>
                <input name="email" onChange={(e) => setEmail(e.target.value)} defaultValue={em} />
            </div>
            <div>
                <label htmlFor="pass">Your password</label>
                <input name="pass" onChange={(e) => setPassword(e.target.value)} defaultValue={pas} />
            </div>
            <button className={"button"} onClick={() => Script.UpdateInfo({
                userName: nm, email: em,
                password: pas, id: userId
            }, click, history)}>Submit</button>
        </div>
    )
}

export default ClearModalUser;