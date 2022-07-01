import type { FC } from "react";
import React from "react";

import styles from "styles/Button.module.css";

interface ButtonProps {
  text: string;
  Icon?: React.ComponentType;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ text, Icon, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span>{text}</span>
      {Icon && <Icon />}
    </button>
  );
};
