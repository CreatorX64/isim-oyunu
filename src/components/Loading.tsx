import type { FC } from "react";
import React from "react";

import { LoadingIcon } from "icons/LoadingIcon";
import styles from "styles/Loading.module.css";

interface LoadingProps {
  message: string;
}

export const Loading: FC<LoadingProps> = ({ message }) => {
  return (
    <div className={styles.loading}>
      <p>{message}</p>
      <LoadingIcon />
    </div>
  );
};
