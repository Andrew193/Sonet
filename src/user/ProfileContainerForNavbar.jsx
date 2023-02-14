import Avatar from '@mui/material/Avatar';
import React from "react";
import {BsThreeDots} from "react-icons/all";
import {GetShortUserInformation} from "../header/script";
import PropTypes from "prop-types";

function ProfileContainer(props) {
    const {
        customStyles
    } = props;

    const {userName, id} = GetShortUserInformation()

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

ProfileContainer.propTypes = {
    customStyles: PropTypes.object
}

export default ProfileContainer;