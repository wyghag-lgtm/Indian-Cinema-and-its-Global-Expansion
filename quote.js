// Simple quote calculator for hourly rate × total hours
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quoteForm");
    const hourlyRateInput = document.getElementById("hourlyRate");
    const totalHoursInput = document.getElementById("totalHours");
    const currencySelect = document.getElementById("currency");
    const currencySymbolSpan = document.getElementById("currencySymbol");
    const errorMessage = document.getElementById("errorMessage");
    const quoteResult = document.getElementById("quoteResult");

    const symbols = {
        USD: "$",
        EUR: "€",
        GBP: "£"
    };

    function updateSymbol() {
        const value = currencySelect.value;
        currencySymbolSpan.textContent = symbols[value] || "$";
    }

    currencySelect.addEventListener("change", updateSymbol);
    updateSymbol();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const rate = parseFloat(hourlyRateInput.value);
        const hours = parseFloat(totalHoursInput.value);
        const currency = currencySelect.value;
        const symbol = symbols[currency] || "$";

        // basic validation
        if (isNaN(rate) || rate <= 0 || isNaN(hours) || hours <= 0) {
            errorMessage.textContent = "Please enter valid positive numbers for rate and hours.";
            quoteResult.style.display = "none";
            return;
        }

        errorMessage.textContent = "";

        const total = rate * hours;
        const formatted = total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        quoteResult.style.display = "block";
        quoteResult.innerHTML = `
            <strong>Total Project Cost:</strong> ${symbol}${formatted}
            <br>
            <span style="font-size:0.85rem; color:#7a6a5c;">
                Based on ${hours} hour(s) at ${symbol}${rate.toFixed(2)} per hour in ${currency}.
            </span>
        `;
    });
});
