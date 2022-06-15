import withPageHeader from "../hoc/withPageHeader"
import ClearUsers from "./ClearUsers";
import FindUserLine from './SearchBar';
import {AiOutlineArrowLeft} from "react-icons/all";
import {useState} from "react";
import {useOutsideClick} from "../hooks";
import {useRef} from "react";

function UsersPageContent(props) {
    const {
        users,
        setOpen,
        open,
    } = props;

    const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setIsSearchBarOpened(false);
    })

    return (
        <>
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
            <div className={"row"}>
                <ClearUsers
                    toMake={users}
                    isSearchBarOpened={isSearchBarOpened}
                    setOpen={setOpen}
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