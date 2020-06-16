import { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";

export const useTimer = ({ timerStructure, ...otherTimerProps }) => {
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [delay, setDelay] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPauseButton, setShowPauseButton] = useState(false);

  useEffect(() => {
    if (index < timerStructure.length)
      setTimeLeft(timerStructure[index].duration);
  }, [index, timerStructure]);

  useInterval(() => {
    if (timeLeft <= 0) {
      if (index >= timerStructure.length - 1) {
        setDelay(null);
        return;
      }
      setIndex(index + 1);
    }
    setTimeLeft(timeLeft - 1);
  }, delay);

  const onStartButtonClick = () => {
    setDelay(1000);
    setIsTimerRunning(true);
    setShowPauseButton(true);
  };

  return {
    index,
    setIndex,
    timeLeft,
    setTimeLeft,
    delay,
    setDelay,
    isTimerRunning,
    setIsTimerRunning,
    onStartButtonClick,
    showPauseButton,
  };
};
