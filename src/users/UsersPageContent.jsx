import withPageHeader from "../hoc/withPageHeader"
import ClearUsers from "./ClearUsers";
import FindUserLine from './SearchBar';
import {AiOutlineArrowLeft} from "react-icons/all";
import {useState, useRef} from "react";
import {useOutsideClick} from "../hooks";
import {alpha} from "@mui/material";

function UsersPageContent(props) {
    const {
        users,
        setOpen,
        open,
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
                @keyframes pulse {
                     0% {
                     -moz-box-shadow: 0 0 0 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     box-shadow: 0 0 5px 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     }
                     70% {
                     -moz-box-shadow: 0 0 0 5px ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     box-shadow: 0 0 5px 5px ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     }
                     100% {
                     -moz-box-shadow: 0 0 0 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     box-shadow: 0 0 5px 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     }
                     }
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
                     border-left: 1px solid ${settings?.configs?.color[settings?.color]};
                     border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     }
                     .rowUsersContainer .usersNamePageName {
                     color: ${settings?.configs?.color[settings?.color]};
                     font-size: 16px;
                     font-weight:bold;
                     }
                `}
            </style>
            <div
                className={"Separator"}
                onClick={(e) => {
                    e.target.nextElementSibling.classList.toggle("Hide")
                }}
            />
            <span
                className={'tetris-tips-arrow'}
                style={{top: '2%'}}
            >
            <AiOutlineArrowLeft
                onClick={() => {
                    setIsSearchBarOpened((state) => true)
                }}
            />
            </span>
            <div
                className={"row rowUsersContainer"}
            >
                <ClearUsers
                    toMake={users}
                    isSearchBarOpened={isSearchBarOpened}
                    setOpen={setOpen}
                    settings={settings}
                    searchId={id}
                />

                {isSearchBarOpened &&
                    <div
                        ref={wrapperRef}
                    >
                        <FindUserLine
                            setOpen={setOpen}
                            open={open}
                        />
                    </div>}
            </div>
        </>)
}

export default withPageHeader(UsersPageContent, {path: "/users", Title: "Users"});