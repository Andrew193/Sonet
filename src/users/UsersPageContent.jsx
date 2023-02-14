import React from "react";
import withPageHeader from "../hoc/withPageHeader"
import ClearUsers from "./ClearUsers";
import FindUserLine from './SearchBar';
import {AiOutlineArrowLeft} from "react-icons/all";
import {useState, useRef} from "react";
import {useOutsideClick} from "../hooks";
import {alpha} from "@mui/material";
import PropTypes from "prop-types";
import Separator from "../components/common/Separator/Separator";

function UsersPageContent(props) {
    const {
        users,
        settings,
        id
    } = props;

    const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setIsSearchBarOpened(false);
    })

    return (
        <>
            <style>
                {`
                     .tetris-tips-arrow svg:hover {
                     background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)};
                     }
                     .itemsUsersPage {
                     background: ${settings?.configs?.background[settings?.background]};
                     border-bottom: 1px solid ${settings?.configs?.color[settings?.color]}!important;
                     }
                     .itemsUsersPage:nth-child(2n) {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.3)} !important;
                     }
                     .itemsUsersPage:hover {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
                     }
                     .basicPageHead {
                      background: ${settings?.configs?.background[settings?.background]};
                     }
                     .rowUsersContainer {
                     height:inherit;
                     }
                     .rowUsersContainer .usersNamePageName {
                     color: ${settings?.configs?.color[settings?.color]};
                     font-size: 16px;
                     font-weight:bold;
                     }
                `}
            </style>
            <Separator/>
            <span className={'tetris-tips-arrow'} style={{top: '2%'}}>
            <AiOutlineArrowLeft onClick={() => setIsSearchBarOpened(() => true)}/>
            </span>
            <div className={"row rowUsersContainer"}>
                <ClearUsers
                    toMake={users}
                    isSearchBarOpened={isSearchBarOpened}
                    settings={settings}
                    searchId={id}
                />
                {isSearchBarOpened && <div ref={wrapperRef}><FindUserLine/></div>}
            </div>
        </>)
}

UsersPageContent.propTypes = {
    users: PropTypes.object,
    settings: PropTypes.object,
    id: PropTypes.string
};

export default withPageHeader(UsersPageContent, {path: "/users", Title: "Users"});