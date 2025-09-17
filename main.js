const timerDiv = document.getElementById("timer");
const buttonsDiv = document.querySelector(".buttons");
const setTimeBtn = document.getElementById("set_time");

setTimeBtn.addEventListener("click", showTimeOptions);

function showTimeOptions() {
    // Update buttons area to show time options
    buttonsDiv.innerHTML = `
        <div class="time-options">
            <button class="time-option" data-time="10">10 min</button>
            <button class="time-option" data-time="5">5 min</button>
            <button class="time-option" data-time="3">3 min</button>
            <button class="time-option" data-time="2">2 min</button>
            <button class="time-option" data-time="1">1 min</button>
        </div>
    `;

    const timeButtons = buttonsDiv.querySelectorAll(".time-option");
    timeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedTime = btn.getAttribute("data-time");

            // Update timer area
            timerDiv.innerHTML = `
                <div id="time_left">${selectedTime}:00</div>
            `;

            // Restore original buttons
            buttonsDiv.innerHTML = `
                <button id="set_time">set time</button>
                <button id="stop">stop</button>
                <button id="start">start</button>
            `;

            // Reattach set time handler
            document.getElementById("set_time").addEventListener("click", showTimeOptions);

            // Initialize timer
            setTimer(selectedTime, "time_left");
        });
    });
}

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
        if (!timerId) {
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

    document.getElementById("start").addEventListener("click", startTimer);
    document.getElementById("stop").addEventListener("click", stopTimer);

    updateDisplay(); // show initial time
}