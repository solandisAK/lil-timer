const setTimeBtn = document.getElementById("set_time");

setTimeBtn.addEventListener("click", () => {
    // Replace body content with new buttons
    document.body.innerHTML = `
        <h2>Select a Time</h2>
        <div class="time-options">
            <button class="time-option" data-time="10">10 min</button>
            <button class="time-option" data-time="5">5 min</button>
            <button class="time-option" data-time="3">3 min</button>
            <button class="time-option" data-time="2">2 min</button>
            <button class="time-option" data-time="1">1 min</button>
        </div>
    `;

    const buttons = document.querySelectorAll(".time-option");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedTime = button.getAttribute("data-time");

            // Go back to main timer page with selected time
            document.body.innerHTML = `
                <div id="timer">
                    <div id="time_left">${selectedTime}:00</div>
                    <div id="time_label"> minutes </div>
                </div>
                <div class="buttons">
                    <button id="set_time">set time</button>
                    <button id="stop">stop</button>
                    <button id="start">start</button>
                </div>
            `;

            // Reattach Set Time button
            const newSetTimeBtn = document.getElementById("set_time");
            newSetTimeBtn.addEventListener("click", setTimeHandler);

            // Initialize timer with selected time
            setTimer(selectedTime, "time_left");
        });
    });
});

function setTimeHandler() {
    setTimeBtn.click();
}

setTimeBtn.addEventListener("click", setTimeHandler);

function setTimer(amt_time, btn_time_left) {
    const time_display = document.getElementById(btn_time_left);
    let time_left = amt_time * 60;
    let timerId = null;

    function updateDisplay() {
        const minutes = Math.floor(time_left / 60);
        const seconds = time_left % 60;
        time_display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    function startTimer() {
        if (timerId === null) {
            timerId = setInterval(() => {
                if (time_left <= 0) {
                    clearInterval(timerId);
                    timerId = null;
                    time_display.textContent = "Time is up!";
                } else {
                    time_left--;
                    updateDisplay();
                }
            }, 1000);
        }
    }

    function stopTimer() {
        clearInterval(timerId);
        timerId = null;
    }

    // Attach fresh listeners to new buttons
    const start_btn = document.getElementById("start");
    start_btn.addEventListener("click", startTimer);

    const stop_btn = document.getElementById("stop");
    stop_btn.addEventListener("click", stopTimer);

    updateDisplay(); // show initial value
}