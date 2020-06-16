export const generateTimerStructure = ({
  numberOfSets,
  numberOfExercises,
  nameOfExercises,
  exerciseDuration,
  restBetweenExercises,
  restBetweenSets,
  hasWarmupPeriod,
  warmupPeriod,
  hasCooldownPeriod,
  cooldownPeriod,
}) => {
  let timerStructure = [];

  if (hasWarmupPeriod) {
    timerStructure.push({ name: "warmup", duration: +warmupPeriod });
  }

  const exercisesWithDurationArray = nameOfExercises.reduce((acc, curr, i) => {
    if (i < numberOfExercises - 1) {
      return acc.concat(
        { name: curr, duration: +exerciseDuration },
        { name: "rest", duration: +restBetweenExercises }
      );
    }
    return acc.concat({ name: curr, duration: +exerciseDuration });
  }, []);

  for (let i = 0; i < numberOfSets; i++) {
    timerStructure = timerStructure.concat(exercisesWithDurationArray);
    if (i < numberOfSets - 1) {
      timerStructure.push({
        name: "rest between sets",
        duration: +restBetweenSets,
      });
    }
  }

  if (hasCooldownPeriod) {
    timerStructure.push({ name: "cooldown", duration: +cooldownPeriod });
  }

  return timerStructure;
};

export const getTotalDuration = (timerStructure) =>
  timerStructure.map((c) => c.duration).reduce((acc, curr) => acc + curr, 0);

export const getMinutesAndSeconds = (totalSeconds) => {
  let minutes;
  let seconds;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;
  return {
    minutes,
    seconds,
  };
};

export const zeroPad = (num) => num.toString().padStart(2, "0");
