const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

const exchangeRates = {
  EUR: { EUR: 1, ALL: 117, USD: 1.07 },
  ALL: { EUR: 0.0085, ALL: 1, USD: 0.0091 },
  USD: { EUR: 0.93, ALL: 110, USD: 1 },
};

function calculate() {
  const fromCurrency = currencyOne.value;
  const toCurrency = currencyTwo.value;
  const amount = parseFloat(amountOne.value);

  if (!isNaN(amount)) {
    const rateValue = exchangeRates[fromCurrency][toCurrency];
    amountTwo.value = (amount * rateValue).toFixed(2);
    rate.innerText = `1 ${fromCurrency} = ${rateValue} ${toCurrency}`;
  } else {
    amountTwo.value = "";
    rate.innerText = "Please enter a valid amount.";
  }
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();