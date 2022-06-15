import Avatar from '@mui/material/Avatar';
import {BsThreeDots} from "react-icons/all";

function ProfileContainer(props) {
    const {
        customStyles
    } = props;

    const {userName, id} = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <>
            <Avatar
                style={{
                    fontSize: customStyles?.fontSize,
                    color: customStyles?.color,
                }}
            >{userName[0]}</Avatar>
            <p
                style={{
                    fontSize: customStyles?.fontSize,
                    color: customStyles?.color,
                    alignItems: 'flex-start'
                }}
            >
                <span
                    className={"fs_font-bold"}
                    style={{
                        fontSize: customStyles?.fontSize,
                        color: customStyles?.color,
                        alignItems: 'flex-start'
                    }}
                >{userName}</span>
                <span
                    style={{
                        fontSize: customStyles?.fontSize,
                        color: customStyles?.color,
                        alignItems: 'flex-start'
                    }}
                >#{id}</span>
            </p>
            <span
                style={{
                    fontSize: customStyles?.fontSize,
                    color: customStyles?.color,
                }}
            >
            <BsThreeDots/>
            </span>
        </>
    )
}

export default ProfileContainer;