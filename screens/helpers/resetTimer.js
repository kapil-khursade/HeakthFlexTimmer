import saveTimers from "./saveTimers";

export default (id, bulkCategory, setTimerArr) => {
    setTimerArr(prevTimers => {
      const updatedTimmr =  prevTimers.map(timer => {
        if (timer.id === id || bulkCategory === timer.category) {
          if (timer.intervalId) {
            clearTimeout(timer.intervalId);
          }
          return { ...timer, countdown: 0, status: "Paused" };
        }
        return timer;
      });

      saveTimers(updatedTimmr)
      return updatedTimmr
    });
  };