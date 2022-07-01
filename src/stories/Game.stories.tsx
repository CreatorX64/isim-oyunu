import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Game } from "components/Game";
import { GameContext } from "context/GameContext";

export default {
  title: "Game",
  component: Game
} as ComponentMeta<typeof Game>;

const Template: ComponentStory<typeof Game> = () => <Game />;

export const ComputersFirstTurn = Template.bind({});
ComputersFirstTurn.decorators = [
  (story) => (
    <GameContext.Provider
      value={{
        isGameRunning: true,
        currentTurn: "computer",
        computerGuesses: [],
        playerGuesses: [],
        lastComputerGuess: "",
        lastPlayerGuess: "",
        gameOverWinner: null,
        gameOverMessage: null,
        dispatch: () => undefined
      }}
    >
      {story()}
    </GameContext.Provider>
  )
];

export const ComputersTurn = Template.bind({});
ComputersTurn.decorators = [
  (story) => (
    <GameContext.Provider
      value={{
        isGameRunning: true,
        currentTurn: "computer",
        computerGuesses: ["ahmet", "rabia"],
        playerGuesses: ["temur", "alara"],
        lastComputerGuess: "rabia",
        lastPlayerGuess: "alara",
        gameOverWinner: null,
        gameOverMessage: null,
        dispatch: () => undefined
      }}
    >
      {story()}
    </GameContext.Provider>
  )
];

export const PlayersTurn = Template.bind({});
PlayersTurn.decorators = [
  (story) => (
    <GameContext.Provider
      value={{
        isGameRunning: true,
        currentTurn: "player",
        computerGuesses: ["ahmet"],
        playerGuesses: [],
        lastComputerGuess: "ahmet",
        lastPlayerGuess: "",
        gameOverWinner: null,
        gameOverMessage: null,
        dispatch: () => undefined
      }}
    >
      {story()}
    </GameContext.Provider>
  )
];

export const ComputerWins = Template.bind({});
ComputerWins.decorators = [
  (story) => (
    <GameContext.Provider
      value={{
        isGameRunning: true,
        currentTurn: "player",
        computerGuesses: ["ahmet", "rabia"],
        playerGuesses: ["temur", "rabia"],
        lastComputerGuess: "rabia",
        lastPlayerGuess: "rabia",
        gameOverWinner: "computer",
        gameOverMessage: "1 kelime bildin",
        dispatch: () => undefined
      }}
    >
      {story()}
    </GameContext.Provider>
  )
];

export const PlayerWins = Template.bind({});
PlayerWins.decorators = [
  (story) => (
    <GameContext.Provider
      value={{
        isGameRunning: true,
        currentTurn: "computer",
        computerGuesses: ["ahmet", "rabia"],
        playerGuesses: ["temur", "asena"],
        lastComputerGuess: "rabia",
        lastPlayerGuess: "asena",
        gameOverWinner: "player",
        gameOverMessage: "2 kelime bildin",
        dispatch: () => undefined
      }}
    >
      {story()}
    </GameContext.Provider>
  )
];
