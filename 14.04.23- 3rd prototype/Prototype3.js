const chooseNameState = "CHOOSE_NAME_STATE";
const chooseBoardSizeState = "CHOOSE_BOARD_SIZE_STATE";
const playingState = "PLAYING_STATE";
const winnerState = "WINNER_STATE";
const x = "./x.png";
const o = "./o.png"
// update HTML elements
let imgFlag = false;
const currentGameInitial = {
  id: null,
  date: null,
  turns: [],
  playerTurn: "player1",
  playerNames: {
    player1: "",
    player2: ""
  },
  playerSource: {
    player1Src: x,
    player2Src: o
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
  createBoard: (boardSize) => {
    const board = document.createElement("table");
    board.setAttribute("border", "1");

    for (let i = 0; i < boardSize; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("td");
        const cellId = `row_${i + 1}_col_${j + 1}`;
        cell.setAttribute("id", cellId);
        row.appendChild(cell);
      }

      board.appendChild(row);
    }

    document.body.appendChild(board);
  },
  startNewGame: () => {
    game.currentGame.board = +prompt("choose size of board (Num*Num)");
    game.createBoard(game.currentGame.board);

    game.history.push(game.currentGame);

    // change current game => currentGameInitial
    game.currentGame = { ...currentGameInitial };

    // offer players to add their names
    game.currentGame.state = chooseNameState;

    // change names in current game
    game.currentGame.playerNames.player1 = prompt("Enter player 1 name:");
    game.currentGame.playerNames.player2 = prompt("Enter player 2 name:");

    // update HTML elements
    const player1NameElement = document.getElementById("player1NameDisplay");
    player1NameElement.innerText = game.currentGame.playerNames.player1;
    const player2NameElement = document.getElementById("player2NameDisplay");
    player2NameElement.innerText = game.currentGame.playerNames.player2;

    // play turn
    game.playTurn();
  },
  playTurn: () => {
    // get the HTML table cells
    const cells = document.querySelectorAll("td");

    // add a click event listener to each cell
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {

        // get the cell ID and image element
        const cellId = cell.id.slice(-1);
        const imageElement = cell.querySelector("img");

        // check if the cell is already occupied
        if (imgFlag === true){
          if (imageElement.getAttribute("src")) {
          alert("This cell is already occupied. Choose another one.");
          return;
        }}

        // save the cell
        const currentPlayer = game.currentGame.playerTurn;
        const currentImage = (currentPlayer === "player1" ? x : o);
        // imageElement = (imageElement = null ? currentImage : imageElement)
        imageElement.setAttribute("src", currentImage);
        game.currentGame.turns.push({
          player: currentPlayer,
          cell: cellId,
          image: currentImage
        });

        // check for a winner
        game.checkWinner();

        // change player to the other one
        game.currentGame.playerTurn =
          currentPlayer === "player1" ? "player2" : "player1";
        imgFlag = true;
        // play a new turn
        game.playTurn();
      });
    });
  },
  undo: () => {
    // check who is player, and change to the other one
    const player = (game.currentGame.playerTurn =
      game.currentGame.playerTurn === "player1" ? "player2" : "player1");

    // remove the last turn from "turns"
    game.currentGame.turns.pop();

    // play turn
    game.playTurn();
  },
  saveGame: () => {
    // check if a game is saved, if so, move it to history
    if (game.savedGame) {
      game.history.push(game.savedGame);
    }

    // sort history by date
    game.history.sort((a, b) => a.date - b.date);

    // save game into saved games
    game.savedGame = { ...game.currentGame };

    // save in history
    game.history.push(game.savedGame);
  },
  loadGame: () => {
    // change current game to save game
    game.currentGame = { ...game.savedGame };

    // change date to new Date()
    game.currentGame.date = new Date();

    // update HTML elements
    const player1NameElement = document.getElementById("player1NameDisplay");
    player1NameElement.innerText = game.currentGame.playerNames.player1;
    const player2NameElement = document.getElementById("player2NameDisplay");
    player2NameElement.innerText = game.currentGame.playerNames.player2;
    const currentPlayerNameElement = document.getElementById(
      "currentPlayerName"
    );
    currentPlayerNameElement.innerText =
      game.currentGame.playerNames[game.currentGame.playerTurn];
  },
  checkWinner: () => {
    // check if the game is finished
    const boardSize = game.currentGame.board;
    const turns = game.currentGame.turns;
    const maxTurns = boardSize ** 2;

    if (turns.length === maxTurns) {
      // determine the winner
      const winner =
        game.currentGame.playerTurn === "player1" ? "player2" : "player1";

      // update game state
      game.currentGame.state = winnerState;
      game.currentGame.winner = winner;
    }
  },
  deleteSavedGame: () => {
    // change saved game to null
    game.savedGame = null;
  },
  removeFinishGame: () => {
    // if game finished, and it was saved, remove from saved games
    if (game.currentGame.state === winnerState && game.savedGame) {
      game.deleteSavedGame();
    }
  },
  showRecord: () => { },
  chooseBoardSize: () => { },
  choosePlayersNames: (player) => { }
};

const startNewGameButton = document.getElementById("start_new_game_button");
startNewGameButton.addEventListener("click", game.startNewGame);

const undoLastStepButton = document.getElementById("undo_last_step_button");
undoLastStepButton.addEventListener("click", game.undo);

const resetGameButton = document.getElementById("reset_game_button");
resetGameButton.addEventListener("click", game.resetGame);

// const player1NameElement = document.getElementById("player1Name");
// game.currentGame.playerNames.player1 = player1NameElement.innerText;
// const player2NameElement = document.getElementById("player2Name");
// game.currentGame.playerNames.player2 = player2NameElement.innerText;
// const currentPlayerNameElement = document.getElementById("currentPlayerName");
// game.currentGame.playerNames[game.currentGame.playerTurn] = currentPlayerNameElement.innerText;

// start game on page load
window.onload = () => {
  game.choosePlayersNames();
};
