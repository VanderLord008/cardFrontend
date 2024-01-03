import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSocketId: "",
  gameId: "",
  // players: [],
  // cards: [],
  game: {
    clients: [],
    cards: [],
    playerTeamScore: 0,
    opponentTeamScore: 0,
    currentHand: [],
    playerTurn: "",
    firstShuffleFinished: false,
    turup: "",
    targetForTeam: 7,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSocketId(state, action) {
      state.userSocketId = action.payload;
    },
    // setPlayers(state, action) {
    //   state.action.payload.prop = action.payload.value;
    // },
    setGameId(state, action) {
      state.gameId = action.payload;
    },
    // setCards(state, action) {
    //   state.cards = action.payload;
    // },
    updateGame(state, action) {
      const target = action.payload.prop;
      state.game[target] = action.payload.value;
    },
  },
});

export const { setSocketId, setGameId, updateGame } = userSlice.actions;
export default userSlice.reducer;
