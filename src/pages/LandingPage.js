import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGame,
  joinGame,
  playCard,
  firstShuffle,
  startGame,
  turupBid,
} from "../api/socketApi";
import store from "../store";
import { getPlayers } from "../store/userSlice";
import Card from "../components/Card";
import classes from "./landingPage.module.css";
import PlayerInfoCard from "../components/PlayerInfoCard";


const LandingPage = () => {
  const dispatch = useDispatch();
  const userSocketId = useSelector((state) => state.users.userSocketId);
  const gameId = useSelector((state) => state.users.gameId);
  const pls = useSelector((state) => state.users.game.clients);
  const cs = useSelector((state) => state.users.game.cards);
  const pts = useSelector((state) => state.users.game.playerTeamScore);
  const ots = useSelector((state) => state.users.game.opponentTeamScore);
  const ch = useSelector((state) => state.users.game.currentHand);
  const pt = useSelector((state) => state.users.game.playerTurn);
  const fss = useSelector((state) => state.users.game.firstShuffleFinished);
  const tct = useSelector((state) => state.users.game.turup);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [currentHand, setCurrentHand] = useState([]);
  const [playerTeamScore, setPlayerTeamScore] = useState(0);
  const [opponentTeamScore, setOpponentTeamScore] = useState(0);
  const [playerTurn, setPlayerTurn] = useState("");
  const [firstShuffleState, setFirstShuffleState] = useState(false);
  const [turup, setTurup] = useState("");
  const [handsToWin, setHandsToWin] = useState(7);
  const [selectedTurup, setSelectedTurup] = useState("");
  const [isTurupSelected, setIsTurupSelected] = useState(false);
  const [areCardsDistributed, setAreCardsDistributed] = useState(false);

  useEffect(() => {
    const newItems = pls;
    setCurrentPlayers(newItems);
    const newCards = cs;
    setCurrentCards(newCards);
    const playerTeamScore = pts;
    setPlayerTeamScore(playerTeamScore);
    const opponentTeamScore = ots;
    setOpponentTeamScore(opponentTeamScore);
    const currentHand = ch;
    setCurrentHand(currentHand);
    const playerTurn = pt;
    setPlayerTurn(playerTurn);
    const firstShuffleState = fss;
    setFirstShuffleState(firstShuffleState);
    const turup = tct;
    setTurup(turup);
  }, [pls, cs, ots, pts, ch, pt, fss, tct]);

  const gameCreationHandler = () => {
    const payload = {
      socketId: userSocketId,
    };
    createGame(payload);
  };
  const gameJoinHandler = () => {
    const payload = {
      gameId: inputText,
      playerId: userSocketId,
    };
    joinGame(payload);
  };
  const handsIncrementHandler = () => {
    if (handsToWin < 13) {
      setHandsToWin(handsToWin + 1);
    }
  };
  const handsDecrementHandler = () => {
    if (handsToWin > 7) {
      setHandsToWin(handsToWin - 1);
    }
  };
  const turupBidHandler = () => {
    const payload = {
      handsToWin,
      selectedTurup,
      gameId: gameId,
      playerId: userSocketId,
    };
    turupBid(payload);
    setIsTurupSelected(true);
  };
  const gameStartHandler = () => {
    const payload = {
      gameId: gameId,
      playerId: userSocketId,
    };
    startGame(payload);
    setAreCardsDistributed(true)
  };
  const firstShuffleHandler = () => {
    const payload = {
      gameId: gameId,
      playerId: userSocketId,
    };
    firstShuffle(payload);
  };
  const cardClickHandler = (e) => {
    let userHasSameCard = false;
    let userPlayedCorrect = false;
    const cardPlayed = e;
    if (playerTurn === userSocketId) {
      if (currentHand.length > 0) {
        const firstCard = currentHand[0].card;
        console.log("firsthand");
        console.log(firstCard);
        if (playerTurn === userSocketId && turup.length > 0) {
          //check if user has cardtype that is same as the first card of this hand
          console.log("i ran");
          if (currentHand.length > 0) {
            if (firstCard >= 100 && firstCard < 113) {
              console.log("1 worked");
              //check if user has any of the same cards
              for (let i = 0; i < 13; i++) {
                if (currentCards[i] >= 100 && currentCards[i] < 113) {
                  userHasSameCard = true;
                  console.log("1-1 worked");
                  if (cardPlayed >= 100 && cardPlayed < 113) {
                    userPlayedCorrect = true;
                    console.log("1-1-1 worked");
                  }
                }
              }
            } else if (firstCard >= 113 && firstCard < 126) {
              console.log("2 worked");
              //check if user has any of the same cards
              for (let i = 0; i < 13; i++) {
                if (currentCards[i] >= 113 && currentCards[i] < 126) {
                  userHasSameCard = true;
                  console.log("2-2 worked");
                  if (cardPlayed >= 113 && cardPlayed < 126) {
                    userPlayedCorrect = true;
                    console.log("2-2-2 worked");
                  }
                }
              }
            } else if (firstCard >= 126 && firstCard < 139) {
              //check if user has any of the same cards
              console.log("3 worked");

              for (let i = 0; i < 13; i++) {
                if (currentCards[i] >= 126 && currentCards[i] < 139) {
                  userHasSameCard = true;
                  console.log("3-3 worked");

                  if (cardPlayed >= 126 && cardPlayed < 139) {
                    userPlayedCorrect = true;
                    console.log("3-3-3 worked");
                  }
                }
              }
            } else if (firstCard >= 139 && firstCard < 152) {
              //check if user has any of the same cards
              console.log("4 worked");
              for (let i = 0; i < 13; i++) {
                if (currentCards[i] >= 139 && currentCards[i] < 152) {
                  userHasSameCard = true;
                  console.log("4-4 worked");
                  if (cardPlayed >= 139 && cardPlayed < 152) {
                    userPlayedCorrect = true;
                    console.log("4-4-4 worked");
                  }
                }
              }
            } else if (firstCard >= 1000 && firstCard < 1052) {
              //check if user has any of the same cards
              console.log("5 worked");
              for (let i = 0; i < 13; i++) {
                if (currentCards[i] >= 1000 && currentCards[i] < 1052) {
                  console.log("5-5 worked");
                  userHasSameCard = true;
                  if (cardPlayed >= 1000 && cardPlayed < 1052) {
                    userPlayedCorrect = true;
                    console.log("5-5-5 worked");
                  }
                }
              }
            } else if (firstCard >= 1100 && firstCard < 1152) {
              //check if user has any of the same cards
              console.log("6 worked");
              for (let i = 0; i < 13; i++) {
                if (currentCards[i] >= 1100 && currentCards[i] < 1152) {
                  console.log("6-6 worked");
                  userHasSameCard = true;
                  if (cardPlayed >= 1100 && cardPlayed < 1152) {
                    userPlayedCorrect = true;
                    console.log("6-6-6 worked");
                  }
                }
              }
            }
          }
          if (
            (userHasSameCard === true && userPlayedCorrect) ||
            userHasSameCard === false
          ) {
            //if the user played the card same as the hand or he has no card that is the same then there is no problem
            const payload = {
              gameId: gameId,
              playerId: userSocketId,
              cardPlayed: e,
            };
            console.log("clicked");
            console.log(e);
            console.log("i ran too");
            playCard(payload);
          } else if (userHasSameCard === true && userPlayedCorrect === false) {
            console.log("please play the same card as your turn");
          } else {
            console.log("not your turn");
          }
        } else {
          const payload = {
            gameId: gameId,
            playerId: userSocketId,
            cardPlayed: e,
          };
          console.log("clicked");
          console.log(e);
          playCard(payload);
        }
      } else {
        const payload = {
          gameId: gameId,
          playerId: userSocketId,
          cardPlayed: e,
        };
        console.log("clicked");
        console.log(e);
        playCard(payload);
      }
    }
  };
  const [inputText, setInputText] = useState("");
  const mainImageURL = "https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg";
  return (
    <>
      {gameId.length === 0 ? (
        <div className={classes.mainscreen}>
          <div className={classes.mainscreen_Heading}>
            GameStart
          </div>
          <div className={classes.mainscreen_Image}>
            <img src={mainImageURL} />
          </div>
          <div className={classes.mainscreen_Buttons}>

            <button onClick={gameCreationHandler}>create game</button>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={gameJoinHandler}>join game</button>
          </div>
        </div>
      ) : (
        <div>
          {currentPlayers.length < 4 && (
            <>
              <div className={classes.gameLinkInfo}>
                here is your game link to share with your friends and wait for them to join
                <div className={classes.gameLink}>
                  {gameId}
                </div>
              </div>

            </>
          )
          }
          <div >
            {currentPlayers.length > 0 && (
              <div className={classes.playersRoster}>
                {currentPlayers.map((cp) => (

                  <PlayerInfoCard key={cp.clientId} name={cp.clientId}
                    color={playerTurn === cp.clientId ? "#523f69" : "brown"}
                  />

                ))}
              </div>
            )
            }
          </div>
          <div>
            {currentPlayers.length === 4 &&
              firstShuffleState &&
              turup.length > 0 && <p>you can start playing now </p>}
            {currentPlayers.length === 4 && !firstShuffleState && (
              <div className={classes.shuffleInfo}>
                <p>start the game by shuffling once</p>
                <button onClick={firstShuffleHandler}>First Shuffle</button>
              </div>
            )}
            {isTurupSelected && firstShuffleState && turup.length === 0 && (
              <p>please wait while others also make their bids</p>
            )}
            {firstShuffleState && turup.length > 0 && !areCardsDistributed && (
              <button onClick={gameStartHandler}>Shuffle the rest</button>
            )}
          </div>


          {/* this for selecting the turup */}
          {!isTurupSelected && firstShuffleState ? (

            <div className={classes.biddingContainer}>
              <p>your current bid {handsToWin}</p>
              <div className={classes.biddingButtons}>
                <button onClick={handsIncrementHandler}>+</button>
                <button onClick={handsDecrementHandler}>-</button>
              </div>
              <div className={classes.biddingTypes}>
                <button style={{

                  color: selectedTurup === "chidi" ? 'white' : 'black',
                  backgroundColor: selectedTurup === "chidi" ? '#523f69' : '#9663d4'
                }} onClick={() => {
                  setSelectedTurup("chidi")

                }}>chidi </button>
                <button style={{

                  color: selectedTurup === "hukum" ? 'white' : 'black',
                  backgroundColor: selectedTurup === "hukum" ? '#523f69' : '#9663d4'
                }} onClick={() => setSelectedTurup("hukum")}>hukum </button>
                <button style={{

                  color: selectedTurup === "eent" ? 'white' : 'black',
                  backgroundColor: selectedTurup === "eent" ? '#523f69' : '#9663d4'
                }} onClick={() => setSelectedTurup("eent")}>eent </button>
                <button style={{

                  color: selectedTurup === "paan" ? 'white' : 'black',
                  backgroundColor: selectedTurup === "paan" ? '#523f69' : '#9663d4'
                }} onClick={() => setSelectedTurup("paan")}>paan</button>
              </div>
              <button onClick={turupBidHandler}>make the bid</button>
            </div>
          ) : (
            ""
          )}

          <div className={classes.currentHand}>
            {currentHand.map(
              (c) =>
                currentHand.length > 0 && (
                  <Card
                    key={c.card}
                    cardPlayer={() => cardClickHandler(c)}
                    value={c.card}
                  />
                )
            )}
          </div>
          {playerTurn === userSocketId && <p>its your turn</p>}
          <div className={classes.cardRack}>
            {currentCards.length > 0 && [].concat(currentCards).sort((a, b) => a > b ? 1 : -1).map(
              (cp) =>
                cp >= 0 && (
                  <Card
                    key={cp}
                    cardPlayer={() => cardClickHandler(cp)}
                    value={cp}
                  />
                )
            )}
          </div>
        </div>
      )}

    </>
  );
}
export default LandingPage;
