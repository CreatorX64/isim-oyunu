import { FC, useEffect } from "react";
import React from "react";

import { AI_FAILURE_PROBABILITY, DEFAULT_TIMER_SEC } from "config";
import { namesList, namesMap } from "lib/names";
import { useSpeechRecognition } from "hooks/useSpeechRecognition";
import { useGameContext } from "hooks/useGameContext";
import { RequestPermissionScreen } from "components/RequestPermissionScreen";
import { PlayerStatus } from "components/PlayerStatus";
import styles from "styles/Game.module.css";

export const Game: FC = () => {
  const {
    recordedText,
    resetRecognitionState,
    isResultReady,
    speechToText,
    haltRecording,
    isPermissed,
    isListening
  } = useSpeechRecognition();
  const {
    dispatch,
    isGameRunning,
    currentTurn,
    lastComputerGuess,
    lastPlayerGuess,
    computerGuesses,
    playerGuesses,
    gameOverMessage,
    gameOverWinner
  } = useGameContext();

  const playerLost = () => {
    dispatch({
      type: "GAME_OVER",
      payload: {
        winner: "computer",
        message: `${playerGuesses.length} kelime bildin`
      }
    });
  };

  const computerLost = () => {
    dispatch({
      type: "GAME_OVER",
      payload: {
        winner: "player",
        message: `${playerGuesses.length} kelime bildin`
      }
    });
  };

  // Check computer's OR player's answer, depending on currentTurn
  useEffect(() => {
    if (isGameRunning && isPermissed && !gameOverWinner) {
      if (currentTurn === "computer") {
        haltRecording(); // Stop recording if it's still going on

        // Two scenarios for computer to lose: It picked the same name OR the
        // failure probability is met. However, failure probability is only
        // taken into account if this is NOT the first turn
        let failureValue = computerGuesses.length > 0 ? Math.random() : 1.0;
        console.log("AI kazanma/kaybetme degeri:", failureValue);

        // Pick a name for the computer

        let computerGuess: string;

        // If this is the first round, pick a random name from all names. If this
        // is not the first round, pick a name that begins with the last char of
        // player's latest guess
        if (lastPlayerGuess) {
          // If player made a guess that ends with "ğ", let's accept defeat...
          if (lastPlayerGuess.endsWith("ğ")) {
            // This effectively means computer loses. Because:
            // AI failure probability = failureValue < AI_FAILURE_PROBABILITY
            failureValue = 0;
            computerGuess = "";
          } else {
            const namesSubset = namesMap.get(lastPlayerGuess.at(-1) as string) as string[]; // We know it's not undefined
            computerGuess = namesSubset[Math.floor(Math.random() * namesSubset.length)];

            // Computer cannot pick a name that ends with "ğ"
            while (computerGuess.endsWith("ğ")) {
              computerGuess = namesSubset[Math.floor(Math.random() * namesSubset.length)];
            }
          }
        } else {
          computerGuess = namesList[Math.floor(Math.random() * namesList.length)];
        }

        // This is a random delay to simulate "computer thinking"
        const delayMs = (Math.floor(Math.random() * (DEFAULT_TIMER_SEC * 1 - 1)) + 1) * 1000;

        if (
          computerGuesses.includes(computerGuess) ||
          playerGuesses.includes(computerGuess) ||
          failureValue < AI_FAILURE_PROBABILITY
        ) {
          // Computer has lost
          setTimeout(() => {
            computerLost();
          }, delayMs);
        } else {
          setTimeout(() => {
            dispatch({
              type: "SWITCH_TURN",
              payload: computerGuess
            });
          }, delayMs);
        }
      } else if (currentTurn === "player") {
        // Handle player guess, check for failure, then update currentTurn
        speechToText();
      }
    }
  }, [isGameRunning, isPermissed, currentTurn, gameOverWinner, lastPlayerGuess, computerGuesses]);

  // Check for player's guess (in recordedText state). If/when it is set, verify
  // player's answer & hande results
  useEffect(() => {
    // If it's player's turn & recordedText has been set, validate player answer
    if (
      currentTurn === "player" &&
      recordedText &&
      isResultReady &&
      !gameOverWinner &&
      !isListening &&
      isResultReady
    ) {
      if (
        playerGuesses.includes(recordedText) ||
        computerGuesses.includes(recordedText) ||
        !namesList.includes(recordedText) ||
        !recordedText.startsWith(lastComputerGuess.at(-1) as string)
      ) {
        playerLost();
      } else {
        dispatch({
          type: "SWITCH_TURN",
          payload: recordedText
        });
      }
      resetRecognitionState();
    }
  }, [
    currentTurn,
    recordedText,
    isResultReady,
    gameOverWinner,
    isListening,
    playerGuesses,
    lastComputerGuess
  ]);

  // Halt recording if/when the game stops
  useEffect(() => {
    if (gameOverWinner && gameOverMessage) {
      haltRecording();
    }
  });

  if (!isPermissed) {
    return <RequestPermissionScreen />;
  }

  return (
    <div className={styles.game}>
      <div className={styles.statusRow}>
        {/* Computer status */}
        {gameOverMessage && gameOverWinner ? (
          <PlayerStatus
            playerName="computer"
            resultMessage={gameOverWinner === "computer" ? "凸(¬‿¬)凸" : "ಥ_ಥ"}
            isActive={false}
          />
        ) : (
          <PlayerStatus
            playerName="bilgisayar"
            latestGuess={lastComputerGuess}
            isActive={currentTurn === "computer"}
            onTimerEnd={computerLost}
          />
        )}

        {/* Player status */}
        {gameOverMessage && gameOverWinner ? (
          <PlayerStatus
            playerName="oyuncu"
            theme={gameOverWinner ? (gameOverWinner === "player" ? "winner" : "loser") : undefined}
            resultMessage={gameOverMessage}
            isActive={false}
          />
        ) : (
          <PlayerStatus
            playerName="oyuncu"
            latestGuess={lastPlayerGuess}
            isActive={currentTurn === "player"}
            onTimerEnd={playerLost}
          />
        )}
      </div>
    </div>
  );
};
