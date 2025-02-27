import saveTimers from "./saveTimers";
import startCountdown from "./startCountdown";

export default (id, bulkCategoryAction, setTimerArr) => {
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
        }else if(bulkCategoryAction && bulkCategoryAction.bulkCategory == timer.category){
           
          if(bulkCategoryAction.action === "Running"){
            startCountdown(timer.id, setTimerArr);
          }else{
            clearInterval(timer.intervalId)
          }
            return { ...timer, status: bulkCategoryAction.action };
        }
        return timer;
      });
        saveTimers(updatedTimer)
        return updatedTimer
    });
  };