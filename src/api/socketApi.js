import { useDispatch } from "react-redux";
import io from "socket.io-client";
import {
  setCards,
  setGameId,
  setPlayers,
  setSocketId,
  updateGame,
} from "../store/userSlice";
import store from "../store";
const socket = io.connect("http://localhost:9000/");
//const dispatch = useDispatch();

socket.on("welcome", (data) => {
  console.log("your socket id is - " + data);
  store.dispatch(setSocketId(data));
});

export const createGame = (data) => {
  //console.log(data);
  socket.emit("createGame", { data });
};
socket.on("createGameResponse", (data) => {
  console.log(data);
  console.log("your game id is - " + data.payload.game.id);
  store.dispatch(setGameId(data.payload.game.id));
});
export const joinGame = (data) => {
  //console.log(data);
  socket.emit("joinGame", { data });
};
socket.on("joinGameResponse", (data) => {
  console.log(data);
  //console.log("your game id is - " + data.payload.game.id);
  //console.log("it worked");
  // store.dispatch(setPlayers(data.payload.game.clients));
  store.dispatch(
    updateGame({
      prop: "clients",
      value: data.payload.game.clients,
    })
  );
  store.dispatch(setGameId(data.payload.game.id));
});
export const firstShuffle = (data) => {
  console.log(data);
  socket.emit("firstShuffle", { data });
};

socket.on("firstShuffleResponse", (data) => {
  console.log(data);
  //console.log("your game id is - " + data.payload.game.id);
  //console.log("it worked");
  //store.dispatch(setGameId(data.payload.game.id));
  //store.dispatch(setPlayers(data.payload.game.clients));
  //store.dispatch(setCards(data.payload.game.cards));
  store.dispatch(
    updateGame({
      prop: "cards",
      value: data.payload.game.cards,
    })
  );
  //update current player turn
  store.dispatch(
    updateGame({
      prop: "playerTurn",
      value: data.payload.game.playerTurn,
    })
  );
  //update the firstShuffleFinished since its been done
  store.dispatch(
    updateGame({
      prop: "firstShuffleFinished",
      value: data.payload.game.firstShuffleFinished,
    })
  );
});

export const turupBid = (data) => {
  console.log(data);
  socket.emit("turupBid", { data });
};
socket.on("turupBidResponse", (data) => {
  console.log(data);

  store.dispatch(
    updateGame({
      prop: "turup",
      value: data.payload.game.turup,
    })
  );
  //find the team of the client
  const isClientInTeamA = data.payload.game.teamA.includes(
    data.payload.clientId
  );
  if (isClientInTeamA) {
    store.dispatch(
      updateGame({
        prop: "targetForTeam",
        value: data.payload.game.targetForTeamA,
      })
    );
  } else {
    store.dispatch(
      updateGame({
        prop: "targetForTeam",
        value: data.payload.game.targetForTeamB,
      })
    );
  }
});

export const startGame = (data) => {
  console.log(data);
  socket.emit("startGame", { data });
};
socket.on("startGameResponse", (data) => {
  console.log(data);

  store.dispatch(
    updateGame({
      prop: "cards",
      value: data.payload.game.cards,
    })
  );
});

export const playCard = (data) => {
  console.log(data);
  socket.emit("playCard", { data });
};
socket.on("playCardResponse", (data) => {
  console.log(data);
  //console.log("your game id is - " + data.payload.game.id);
  //console.log("it worked");
  //store.dispatch(setGameId(data.payload.game.id));
  //store.dispatch(setPlayers(data.payload.game.clients));
  //store.dispatch(setCards(data.payload.game.cards));
  //we need to figure out which team the player is in
  const playerId = data.payload.playerId;
  console.log(playerId);
  // if(playerId===data.payload.game.teamA[0] || playerId===data.payload.game.teamA[1]){
  //   //find the score of this team
  //   const playerTeamScore=data.payload.game.score[data.payload.game.teamA[0]] +
  //     data.payload.game.score[data.payload.game.teamA[1]];
  //     const opponentTeamScore =
  //       data.payload.game.score[data.payload.game.teamA[0]] +
  //       data.payload.game.score[data.payload.game.teamA[1]];
  //   store.dispatch(
  //     updateGame({
  //       prop: "playerTeamScore",
  //       value: playerTeamScore,
  //     })
  //   );
  // }
  let isPlayerTeamA = false;
  let teamAScore = 0;
  for (let i = 0; i < data.payload.game.teamA.length; i++) {
    if (playerId === data.payload.game.teamA[i]) {
      isPlayerTeamA = true;
    }
    teamAScore += data.payload.game.score[data.payload.game.teamA[i]];
  }
  let teamBScore = 0;
  for (let i = 0; i < data.payload.game.teamB.length; i++) {
    teamBScore += data.payload.game.score[data.payload.game.teamB[i]];
  }
  if (isPlayerTeamA === true) {
    store.dispatch(
      updateGame({
        prop: "playerTeamScore",
        value: teamAScore,
      })
    );
    store.dispatch(
      updateGame({
        prop: "opponentTeamScore",
        value: teamBScore,
      })
    );
  } else {
    store.dispatch(
      updateGame({
        prop: "playerTeamScore",
        value: teamBScore,
      })
    );
    store.dispatch(
      updateGame({
        prop: "opponentTeamScore",
        value: teamAScore,
      })
    );
  }
  //update cards
  store.dispatch(
    updateGame({
      prop: "cards",
      value: data.payload.game.cards,
    })
  );
  //update current hand
  store.dispatch(
    updateGame({
      prop: "currentHand",
      value: data.payload.game.currentHand,
    })
  );
  //update current player turn
  store.dispatch(
    updateGame({
      prop: "playerTurn",
      value: data.payload.game.playerTurn,
    })
  );
});
