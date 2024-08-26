import React from "react";
import classes from "./card.module.css";
const Card = (props) => {
  //0-12 = chidi
  //13-25= eent
  //26-38=paan
  //39-51=hukum
  const cardTypes = ["chidi", "eent", "paan", "hukum"];
  let cardType = "";
  const cardRack = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
    "ace",
  ];
  if (props.value >= 1100) {
    let cardNum = props.value - 1100;
    let pos = Math.floor(cardNum / 13);
    cardType = cardTypes[pos];
  } else if (props.value >= 1000) {
    let cardNum = props.value - 1000;
    let pos = Math.floor(cardNum / 13);
    cardType = cardTypes[pos];
  } else if (props.value > 100) {
    let cardNum = props.value - 100;
    let pos = Math.floor(cardNum / 13);
    cardType = cardTypes[pos];
  } else {
    let pos = Math.floor(props.value / 13);
    cardType = cardTypes[pos];
  }
  return (
    <div
      className={classes.card}
      onClick={() => props.cardPlayer(props.value)}



    >
      <div className={classes.cardInfo}>
        <p>
          {props.value >= 1100
            ? `${cardRack[(props.value - 1100) % 13]} tu  ch`
            : props.value >= 1000
              ? `${cardRack[(props.value - 1000) % 13]} tu`
              : props.value >= 100
                ? `${cardRack[(props.value - 100) % 13]} ch`
                : cardRack[props.value % 13]}
        </p>
        <div className={classes.cardType}>{cardType}</div>
      </div>
    </div>
  );
};

export default Card;
