import saveTimers from "./saveTimers";
import startCountdown from "./startCountdown";

export default (id, bulkCategory, setTimerArr) => {
    setTimerArr(prevTimers => {
      const updatedTimer =  prevTimers.map(timer => {
        if (timer.id === id) {
          if (timer.status === "Paused") {
            startCountdown(id, setTimerArr);
            return { ...timer, status: "Running" };
          } else if (timer.status === "Running"){
            clearInterval(timer.intervalId);
            return { ...timer, status: "Paused"};
          }
        }else if(bulkCategory && bulkCategory == timer.category){
            startCountdown(timer.id, setTimerArr);
            return { ...timer, status: "Running" };
        }
        return timer;
      });
        saveTimers(updatedTimer)
        return updatedTimer
    });
  };