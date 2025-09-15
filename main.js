const setTimeBtn = document.getElementById("set_Time");

setTimeBtn.addEventListener("click", () => {
    //replace body content w new buttons
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
    // Add event listeners to the new buttons
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
            // Reattach the Set Time button listener
            const newSetTimeBtn = document.getElementById("set_time");
            newSetTimeBtn.addEventListener("click", setTimeHandler);
        });
    });
});

// Function to reuse for re-attaching the listener
function setTimeHandler() {
    setTimeBtn.click();
}

// Attach initial listener
setTimeBtn.addEventListener("click", setTimeHandler);