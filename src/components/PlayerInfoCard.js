
import PlayerInfoCardCreater from "./PlayerInfoCardCreater";
import classes from "./PlayerInfoCard.module.css"

const PlayerInfoCard = ({ name, color }) => {
    return (
        <div className={classes.main}>
            <PlayerInfoCardCreater name={name} color={color} />
        </div>
    );
};

export default PlayerInfoCard;