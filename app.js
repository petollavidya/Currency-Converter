const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const updateExchangeRate = async () => {
  try {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }

    const from = fromCurr.value;
    const to = toCurr.value;

    const URL = `https://api.exchangerate-api.com/v4/latest/${from}`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.rates[to];
    let finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
  } catch (error) {
    console.error(error);
    msg.innerText = "Network error. Try again later.";
  }
};
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
