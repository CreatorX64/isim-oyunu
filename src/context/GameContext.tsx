import type { FC } from "react";
import React, { createContext, useReducer } from "react";

// The internal game state
interface GameState {
  isGameRunning: boolean;
  currentTurn: "player" | "computer";
  playerGuesses: string[];
  computerGuesses: string[];
  lastComputerGuess: string;
  lastPlayerGuess: string;
  gameOverWinner: "player" | "computer" | null;
  gameOverMessage: string | null;
}

// The exposed game state (to be used by the rest of the application)
interface ExposedState extends GameState {
  dispatch: React.Dispatch<Action>;
}

// Actions

interface GameBeginAction {
  type: "GAME_BEGIN";
}

interface SwitchTurnAction {
  type: "SWITCH_TURN";
  payload: string;
}

interface GameOverAction {
  type: "GAME_OVER";
  payload: {
    winner: "player" | "computer";
    message: string;
  };
}

type Action = GameBeginAction | SwitchTurnAction | GameOverAction;

const gameContextReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "GAME_BEGIN":
      // We explicitly set all properties because this action will also be used
      // to play the game again
      return {
        ...state,
        isGameRunning: true,
        currentTurn: "computer",
        playerGuesses: [],
        computerGuesses: [],
        lastComputerGuess: "",
        lastPlayerGuess: "",
        gameOverWinner: null,
        gameOverMessage: null
      };
    case "SWITCH_TURN":
      // If we just left (computer|player)'s turn set the last guess, add it to
      // guesses, and switch turn.
      return state.currentTurn === "computer"
        ? {
            ...state,
            lastComputerGuess: action.payload,
            computerGuesses: [...state.computerGuesses, action.payload],
            currentTurn: "player"
          }
        : {
            ...state,
            lastPlayerGuess: action.payload,
            playerGuesses: [...state.playerGuesses, action.payload],
            currentTurn: "computer"
          };
    case "GAME_OVER":
      return {
        ...state,
        isGameRunning: true,
        currentTurn: "computer",
        playerGuesses: [],
        computerGuesses: [],
        lastComputerGuess: "",
        lastPlayerGuess: "",
        gameOverWinner: action.payload.winner,
        gameOverMessage: action.payload.message
      };
    default:
      throw new Error(`"Unkown action in gameContextReducer()"`);
  }
};

export const GameContext = createContext<ExposedState | null>(null);

interface GameContextProviderProps {
  children: JSX.Element;
}

export const GameContextProvider: FC<GameContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameContextReducer, {
    isGameRunning: false,
    currentTurn: "computer",
    playerGuesses: [],
    computerGuesses: [],
    lastComputerGuess: "",
    lastPlayerGuess: "",
    gameOverWinner: null,
    gameOverMessage: null
  });

  const exposedState: ExposedState = {
    ...state,
    dispatch
  };

  return <GameContext.Provider value={exposedState}>{children}</GameContext.Provider>;
};
