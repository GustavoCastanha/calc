const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const pressedButton = button.textContent;
        let currentNumber = screen.textContent;

        if (currentNumber === "Error!") {
            currentNumber = "";
        }

        if (button.id === "c") {
            screen.textContent = "0";
            return;
        }

        if (button.id === "delete") {
            if (currentNumber.length === 1 || currentNumber === "Error!") {
                screen.textContent = "0";
            } else {
                currentNumber = currentNumber.slice(0, -1);
                screen.textContent = currentNumber;
            }
            return;
        }

        if (button.id === "equals") {
            try {
                const result = eval(currentNumber);
                if (result.toString().length > 15) {
                    screen.textContent = "+" + (result.toString().length - 15);
                } else {
                    screen.textContent = result;
                }
            } catch {
                screen.textContent = "Error!";
            }
            return;
        }

        if (currentNumber.length < 14) {
            if (currentNumber === "0" || currentNumber === "Error!") {
                currentNumber = pressedButton;
            } else {
                currentNumber += pressedButton;
            }
            screen.textContent = currentNumber;
        } else if (currentNumber.length === 15) {
            currentNumber += pressedButton;
            screen.textContent = currentNumber;
        }
    });
});
