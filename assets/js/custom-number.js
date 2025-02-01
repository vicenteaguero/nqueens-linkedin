// assets/js/custom-number.js

document.addEventListener("DOMContentLoaded", () => {
    const decrementButton = document.getElementById("decrement");
    const incrementButton = document.getElementById("increment");
    const numberInput = document.getElementById("n-value");

    decrementButton.addEventListener("click", () => {
        let currentValue = parseInt(numberInput.value);
        const min = parseInt(numberInput.min);
        if (currentValue > min) {
            numberInput.value = currentValue - 1;
        }
    });

    incrementButton.addEventListener("click", () => {
        let currentValue = parseInt(numberInput.value);
        const max = parseInt(numberInput.max);
        if (currentValue < max) {
            numberInput.value = currentValue + 1;
        }
    });
});
