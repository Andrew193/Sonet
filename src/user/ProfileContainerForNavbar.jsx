import Avatar from '@mui/material/Avatar';
import {BsThreeDots} from "react-icons/all";

function ProfileContainer() {
    const {userName, id} = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <>
            <Avatar>{userName[0]}</Avatar>
            <p
                style={{alignItems: 'flex-start'}}
            >
                <span className={"fs_font-bold"}>{userName}</span>
                <span>#{id}</span>
            </p>
            <span>
            <BsThreeDots/>
            </span>
        </>
    )
}

export default ProfileContainer;