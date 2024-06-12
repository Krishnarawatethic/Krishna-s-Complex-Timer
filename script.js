var confirmButton1Clicked = false;
var confirmButton2Clicked = false;
var confirmButton = false; 
var lapsRemaining = 0; 
var intervalId;
function validateNumber() {
    var input = document.getElementById("exampleInputPassword1").value.trim();
    var intValue = parseInt(input);
    var confirmButton = document.getElementById("confirmButton");
    var decimalIndex = input.indexOf(".");
    var hasDecimal = decimalIndex !== -1;
    var decimalPart = hasDecimal ? input.substring(decimalIndex + 1) : "";
    confirmButton.disabled = isNaN(intValue) || intValue < 1 || intValue > 999 || (hasDecimal && !/\.0*$/.test(input));
}

function enableConfirmButton() {
    var confirmButton = document.querySelector(".btn1");
    confirmButton.disabled = false;
}

function handleSubmit() {
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    var checked = false;
    var selectedTime = 0; 

    radioButtons.forEach(function(radioButton) {
        if (radioButton.checked) {
            checked = true;
            var radioId = radioButton.id;
            if (radioId === "radio1") {
                selectedTime = 60; 
            } else if (radioId === "radio2") {
                selectedTime = 120; 
            } else if (radioId === "radio3") {
                selectedTime = 180; 
            } else if (radioId === "radio4") {
                selectedTime = 240; 
            } else if (radioId === "radio5") {
                selectedTime = 300; 
            }
        }
    });

    if (!checked) {
        return;
    }

    var minutes = Math.floor(selectedTime / 60);
    var seconds = selectedTime % 60;
    var formattedTime = pad(minutes) + ":" + pad(seconds);


    var disShow = document.querySelector(".disShow");
    disShow.textContent = formattedTime;

    var confirmButton = document.querySelector(".btn1");
    confirmButton.disabled = true;
    radioButtons.forEach(function(radioButton) {
        radioButton.disabled = true;
    });
    confirmButton.style.backgroundColor = "lightgreen";
    confirmButton.style.color = "white";
    confirmButton.style.borderColor = "lightgreen";
    confirmButton1Clicked = true;
    checkButtonStatus(); 
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

function handleSubmit2() {
    var exampleInputPassword1 = document.getElementById("exampleInputPassword1");
    var inputValue = exampleInputPassword1.value.trim();


    var disLap = document.querySelector(".disLap");
    disLap.textContent = inputValue;

    lapsRemaining = parseInt(inputValue);

    exampleInputPassword1.disabled = true;
    var confirmButton2 = document.querySelector(".btn2");
    confirmButton2.disabled = true;
    confirmButton2.style.backgroundColor = "lightgreen";
    confirmButton2.style.color = "white";
    confirmButton2.style.borderColor = "lightgreen";
    confirmButton2Clicked = true;
    checkButtonStatus(); 
    
}

function checkButtonStatus() {
    var startStart = document.querySelector(".start");
    var startReset = document.querySelector(".reset");
    if (confirmButton1Clicked == true && confirmButton2Clicked == true) {
        startStart.disabled = false;
        startReset.disabled = false;
    }
}

function handleSubmit3() {
    var startPause = document.querySelector(".pause");
    var startButton = document.querySelector(".start");
    startButton.disabled = true;
    startPause.disabled = false;
    var exampleInputPassword1 = document.getElementById("exampleInputPassword1");
    exampleInputPassword1.disabled = true;
    confirmButton = true; 
    startTimer(); 
}

function startTimer() {
    var disShow = document.querySelector(".disShow");
    var initialTime = disShow.textContent;
    var timeArray = initialTime.split(":");
    var minutes = parseInt(timeArray[0]);
    var seconds = parseInt(timeArray[1]);

    intervalId = setInterval(function() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(intervalId);
                if (lapsRemaining > 0) {
                    lapsRemaining--;
                    var disLap = document.querySelector(".disLap");
                    disLap.textContent = lapsRemaining;
                    
                    disShow.textContent = initialTime;
                    
                    startTimer();
                } else {

                }
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        var formattedTime = pad(minutes) + ":" + pad(seconds);
        disShow.textContent = formattedTime;
    }, 1000);
}

function handleSubmit4() {
    var startPause = document.querySelector(".pause");
    var startButton = document.querySelector(".start");
    startButton.disabled = false;
    startPause.disabled = true;
    var exampleInputPassword1 = document.getElementById("exampleInputPassword1");
    exampleInputPassword1.disabled = true;
    clearInterval(intervalId); 
}

function handleSubmit5() {
    clearInterval(intervalId); 
    var disShow = document.querySelector(".disShow");
    var disLap = document.querySelector(".disLap");
    disShow.textContent = "00:00";
    disLap.textContent = "0"; 


    confirmButton1Clicked = false;
    confirmButton2Clicked = false;
    var startButton = document.querySelector(".start");
    startButton.disabled = true;
    var confirmButtons = document.querySelectorAll('.btn1, .btn2');
    confirmButtons.forEach(function(confirmButton) {
        confirmButton.disabled = true;
        confirmButton.style.backgroundColor = "";
        confirmButton.style.color = "";
        confirmButton.style.borderColor = "";
    });
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
        radioButton.disabled = false;
    });
    var exampleInputPassword1 = document.getElementById("exampleInputPassword1");
    exampleInputPassword1.disabled = false;
    exampleInputPassword1.value = "";
    var startPause = document.querySelector(".pause");
    var startReset = document.querySelector(".reset");
    startPause.disabled = true;
    startReset.disabled = true;
}
