import { Alert } from "react-native";
import saveTimers from "./saveTimers";

export default (id,setTimerArr) => {
    setTimerArr(prevTimers => {
      return prevTimers.map(timer => {
        if (timer.id === id && timer.status !== "Completed") {
          if (timer.intervalId) {
            clearInterval(timer.intervalId);
          }

          const intervalId = setInterval(() => {
            setTimerArr(currentTimers => {
              const updatedTimmerAr =  currentTimers.map(t => {
                if (t.id === id && t.status === "Running") {
                  if (t.countdown >= t.duration) {
                    clearInterval(t.intervalId); 
                    Alert.alert("Congraulations!!!", `Timer ${t.name} completed`)
                    return { ...t, status: "Completed"};
                  }
                  
                  if (t.midwayAlert !== 0) {
                    const midwayTime = Math.floor((t.duration * t.midwayAlert) / 100);
                    
                    if (t.countdown === midwayTime) {
                      clearInterval(t.intervalId); 
                      Alert.alert(
                        "Your Custom Alert",
                        `Timer "${t.name}" is ${t.midwayAlert}% completed!`
                      );
                      return { ...t, status: "Paused", countdown: t.countdown + 1};
                    }
                  }
                  
                  return { ...t, countdown: t.countdown + 1 };
                }
                return t;
              });
              saveTimers(updatedTimmerAr)
              return updatedTimmerAr
            });
          }, 1000);
  
          return { ...timer, intervalId, status: "Running" };
        }
        return timer;
      });
    });
  };