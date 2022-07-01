import type { FC } from "react";
import React, { useState, useEffect, useRef } from "react";

import styles from "styles/Timer.module.css";

interface TimerProps {
  seconds: number;
  onTimerEnd: () => void;
}

const getTimeStringFromSeconds = (seconds: number): string => {
  if (seconds < 0 || seconds > 5999) {
    throw new Error('Parameter "seconds" must be between 0 - 5999 (99:59)');
  }

  const secondsPart = (seconds % 60).toString().padStart(2, "0");
  const minutesPart = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  return `${minutesPart}:${secondsPart}`;
};

export const Timer: FC<TimerProps> = ({ seconds, onTimerEnd }) => {
  const [runningSeconds, setRunningSeconds] = useState(seconds);

  // Interval ID
  const iid = useRef<ReturnType<typeof setTimeout>>();

  // Initialize the timer on component mount
  useEffect(() => {
    if (!iid.current) {
      iid.current = setInterval(() => {
        setRunningSeconds((prevState) => prevState - 1);
      }, 1000);
    }

    () => {
      clearInterval(iid.current);
    };
  }, []);

  // Stop the timer once runningSeconds is 0 & call onTimerEnd
  useEffect(() => {
    if (runningSeconds === 0) {
      clearInterval(iid.current);
      onTimerEnd();
    }
  }, [runningSeconds]);

  return (
    <div className={styles.timer}>
      <span>{getTimeStringFromSeconds(runningSeconds)}</span>
    </div>
  );
};
