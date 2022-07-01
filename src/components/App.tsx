import type { FC } from "react";
import React from "react";

import { GameContextProvider } from "context/GameContext";
import { MainMenu } from "components/MainMenu";
import styles from "styles/App.module.css";

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <GameContextProvider>
        <MainMenu />
      </GameContextProvider>
    </div>
  );
};
