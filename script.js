let a = "";
let b = "";
let sign = "";
let buttons = document.querySelectorAll(".buttons button");
let calculation = document.querySelector(".calculation");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;
        if (buttonText === "AC") {
            calculation.textContent = "";
        }
        else if (buttonText === "C") {
            calculation.textContent = calculation.textContent.slice(0, -1);
        }
        else {
            calculation.textContent += buttonText;
        }
    });
});


