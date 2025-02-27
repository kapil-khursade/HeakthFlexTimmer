import startCountdown from "./startCountdown"

export default (timerArr, setTimerArr) => {
    timerArr.forEach(timer => {
        if(timer.status === "Running"){
            startCountdown(timer.id, setTimerArr)
        }
    });
}