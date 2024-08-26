import React from "react";
import classes from "./PlayerInfoCardCreater.module.css"
const PlayerInfoCardCreater = ({ name, color }) => {

    const firstNameInitial = name[0];

    return (
        <span style={{


            backgroundColor: color
        }} className={classes.userProfileImage}>
            {firstNameInitial}

        </span>
    );
};
export default PlayerInfoCardCreater;