import {CardActions, Typography} from "@mui/material";

function ClearModalUser(props) {
    const {
        setName,
        setEmail,
        setPassword,
        nm,
        em,
        pas,
        Script,
        history,
        click,
        userId
    } = props;

    return (
        <div>
            <Typography
                gutterBottom
                component={'div'}
            >
                <label
                    htmlFor="name"
                >
                    Your name</label>
                <input
                    name="name"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    placeholder={nm}
                />
            </Typography>
            <Typography
                gutterBottom
                component={'div'}
            >
                <label
                    htmlFor="email"
                >
                    Your email</label>
                <input
                    name="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    defaultValue={em}
                />
            </Typography>
            <Typography
                gutterBottom
                component={'div'}
            >
                <label
                    htmlFor="pass"
                >
                    Your password</label>
                <input
                    name="pass"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    defaultValue={pas}
                />
            </Typography>
            <CardActions>
                <button
                    className={"button"}
                    onClick={() => {
                        Script.UpdateInfo({
                            userName: nm, email: em,
                            password: pas, id: userId
                        }, click, history)
                    }}
                >Submit
                </button>
            </CardActions>
        </div>
    )
}

export default ClearModalUser;