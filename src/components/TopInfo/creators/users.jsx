import {useHistory} from "react-router-dom";
import dateHelper from "../../../helpers/dateHelper.js"
import script from "../script.js";
import {v4 as uuidv4} from 'uuid';
import {Typography} from "@mui/material";
import {useMemo} from "react";
import s from "../top-info.module.css"
import {AiOutlineComment, AiOutlineDislike, AiOutlineLike, AiOutlineMail} from "react-icons/ai";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";

function UsersCreator(props) {
    const {
        settings,
        toCreate
    } = props;

    const history = useHistory();
    const {t} = useTranslation();
    const usersListToMap = useMemo(() => toCreate, [toCreate]);

    return (
        <>
            {usersListToMap.map((value) =>
                <div
                    key={uuidv4()}
                    data-id={value.id}
                    style={{
                        color: settings?.configs?.color[settings?.color]
                    }}
                >
                    <Typography
                        variant="p"
                        component="div"
                        className={s.latestPostFirstLine}
                    >
                        <li
                            style={{
                                flex: '4'
                            }}
                        >{dateHelper.fromNow(value[4])}</li>
                        <Typography
                            variant="h5"
                            component="h4"
                            style={{
                                fontWeight: "bold",
                                fontSize: '13px',
                                flex: '8'
                            }}
                        ><span
                            style={{
                                marginLeft: "15px",
                                fontSize: "13px"
                            }}
                        >#{value[0]}</span></Typography>
                    </Typography>
                    <Typography
                        variant="p"
                        component="p"
                        className={s.PostLine}
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    ><AiOutlineMail
                        style={{
                            fontSize: "16px",
                            marginRight: "5px"
                        }}
                    />{value[1]}</Typography>
                    <p/>
                </div>
            )}
        </>
    )
}

export default UsersCreator;