import saveTimers from "./saveTimers";

export default async (id, setTimerArr) => {
    setTimerArr(prevTimers => {
      const updatedTimers = prevTimers.filter(timer => timer.id !== id);
      saveTimers(updatedTimers);
      return updatedTimers;
    });
  };