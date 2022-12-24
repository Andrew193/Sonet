import s from "./users.module.css"
import Script from "./usersHelper"
import React from "react";
import {useRef} from "react"
import {useHistory} from "react-router-dom"
import Loader from "../Loader";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function FindUserLine(props) {
    const {
        setOpen,
        open
    } = props;

    let Input = useRef()
    const hist = useHistory();
    const {t} = useTranslation();

    return (
        <div
            className={`${s.FindUserLine} col-xs-4 col-sm-4`}
            data-testid={"FindLine"}
            style={{padding: 'unset'}}
        >
            <div data-testid={"inner"}>
                <input
                    ref={(el) => Input = el}
                    onInput={(e) => {
                        e.target.value = Script.input(e.target.value)
                    }}
                    placeholder={t("Input user ID")}/>
                <span
                    id={'mainPostBtn'}
                    onClick={() => {
                        setOpen(() => true)
                        Script.openUser(null, hist, Input.value, setOpen)
                    }}
                >{t("Find by ID")}
                </span>
            </div>

            <Loader
                open={open}
            />
        </div>
    )
}

FindUserLine.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool
};

export default FindUserLine;