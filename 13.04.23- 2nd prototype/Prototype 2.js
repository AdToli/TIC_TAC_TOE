const chooseNameState = "CHOOSE_NAME_STATE";
const chooseBoardSizeState = "CHOOSE_BOARD_SIZE_STATE";
const playingState = "PLAYING_STATE";
const winnerState = "WINNER_STATE";

const currentGameInitial = {
  id: null,
  date: null,
  turns: [],
  playerTurn: "player1",
  playerNames: {
    player1: "",
    player2: ""
  },
  state: chooseNameState,
  winner: "",
  board: 3
};

const game = {
  currentGame: currentGameInitial,
  history: [],
  gameSaved: [],
  savedGame: null,
  startNewGame: () => {
    // save current game in history
    // change current game => currentGameInitial
    // offer players to add their names
    // change names in current game
    // change board size
    // play turn
  },
  playTurn: () => {
    // check which player
    // present player
    // press a cell
    // save the cell
    // change player to the other one
    // checkWinner()
    // start a new turn
  },
  undo: () => {
    // check who is player, and change to the other one
    // remove the last turn from "turns"
    // play turn
  },
  saveGame: () => {
    // check if a game is saved, if so, move it to history
    // sort history by date
    // save game into saved games
    // save in hisotry
  },
  loadGame: () => {
    // change current game to save game
    // change date to new Date()
  },
  deleteSavedGame: () => {
    // change saved game to null
  },
  checkWinner: () => {
    // if game finished, and it was saved, remove from saved games
  },
  showRecord: () => {},
  chooseBoardSize: () => {},
  choosePlayersNames: (player) => {}
};
