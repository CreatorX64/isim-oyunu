import type { FC } from "react";
import React, { useState } from "react";

import { useGameContext } from "hooks/useGameContext";
import { useSpeechRecognition } from "hooks/useSpeechRecognition";
import { Button } from "components/Button";
import { Game } from "components/Game";
import { HowToPlay } from "components/HowToPlay";
import { PlayIcon } from "icons/PlayIcon";
import styles from "styles/MainMenu.module.css";

export const MainMenu: FC = () => {
  const [isHowToPlayVisible, setIsHowToPlayVisible] = useState(false);
  const { isPermissed } = useSpeechRecognition();
  const { isGameRunning, dispatch, gameOverWinner } = useGameContext();

  return (
    <div className={styles.mainMenu}>
      {isHowToPlayVisible ? (
        <HowToPlay onClose={() => setIsHowToPlayVisible(false)} />
      ) : (
        <>
          <h1 className={`${styles.title} ${isGameRunning && isPermissed ? styles.flash : ""}`}>
            {gameOverWinner ? (
              <span>{gameOverWinner === "player" ? "oyunu kazandın!" : "oyunu kaybettin!"}</span>
            ) : (
              <>
                <span className={styles.flashTitle}>oyun başladı!</span>
                <span>˗ˏˋisim oyunuˎˊ˗</span>
              </>
            )}
          </h1>

          {isGameRunning ? (
            <Game />
          ) : (
            <>
              <Button
                text="başlamak için tıkla"
                Icon={PlayIcon}
                onClick={() => dispatch({ type: "GAME_BEGIN" })}
              />

              <button className="link" type="button" onClick={() => setIsHowToPlayVisible(true)}>
                nasıl oynanır?
              </button>
            </>
          )}

          {gameOverWinner && (
            <div className={styles.playAgain}>
              <Button text="tekrar oyna?" onClick={() => dispatch({ type: "GAME_BEGIN" })} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
