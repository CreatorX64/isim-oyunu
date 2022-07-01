import type { FC } from "react";
import React from "react";

import { DEFAULT_TIMER_SEC } from "config";
import { Timer } from "components/Timer";
import styles from "styles/PlayerStatus.module.css";

interface PlayerStatusProps {
  playerName: string;
  isActive: boolean;
  latestGuess?: string;
  theme?: "winner" | "loser";
  resultMessage?: string;
  onTimerEnd?: () => void;
}

export const PlayerStatus: FC<PlayerStatusProps> = ({
  playerName,
  isActive,
  latestGuess = "",
  theme,
  resultMessage,
  onTimerEnd
}) => {
  const getCurrentStatusJsx = () => {
    return isActive && onTimerEnd ? (
      <Timer seconds={DEFAULT_TIMER_SEC} onTimerEnd={onTimerEnd} />
    ) : (
      <p className={styles.latestGuess}>{latestGuess}</p>
    );
  };

  return (
    <div
      className={`${styles.playerStatus} ${isActive ? styles.active : ""} ${
        theme ? styles[theme] : ""
      }`}
    >
      <h2>{playerName}</h2>

      {resultMessage ? (
        <p className={styles.resultMessage}>{resultMessage}</p>
      ) : (
        getCurrentStatusJsx()
      )}
    </div>
  );
};
