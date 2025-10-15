"use strict";

const form = document.querySelector(".tip-form");
const totalBillInput = document.getElementById("total-bill");
const tipPercentButtons = document.querySelectorAll('input[type="radio"]');
const tipPercentCustom = document.getElementById("custom-tip-input");
const totalPeopleInput = document.getElementById("total-people");
const tipResult = document.getElementById("tip-result");
const totalResult = document.getElementById("total-result");
const resetBtn = document.querySelector(".tip-results .btn");

//clear custom when radio is checked
function clearCustomTip() {
  let isChecked = false;
  tipPercentButtons.forEach((button) => {
    if (button.checked) {
      isChecked = true;
    }

    if (isChecked) {
      tipPercentCustom.value = "";
      return;
    }
  });
}

//clear radio when custom has value
function clearTipButtons() {
  tipPercentButtons.forEach((button) => (button.checked = false));
}

//get tip value
function getTipPercent() {
  if (tipPercentCustom.value) {
    return tipPercentCustom.value;
  }

  const checkedButton = document.querySelector('input[name="tip-percentage"]:checked');
  return checkedButton ? checkedButton.value : 0;
}

//calculate result & update DOM
function calculateResult() {
  const total = parseFloat(totalBillInput.value) || 0;
  const tipPercentage = parseFloat(getTipPercent()) / 100;
  const numberOfPeople = parseInt(totalPeopleInput.value);

  if (!numberOfPeople) return;

  const tipPerPerson = (total * tipPercentage) / numberOfPeople;
  const totalPerPerson = (total + total * tipPercentage) / numberOfPeople;

  tipResult.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalResult.textContent = `$${totalPerPerson.toFixed(2)}`;
}

//enable reset button
function resetForm() {
  form.reset();
  tipResult.textContent = `$0.00`;
  totalResult.textContent = `$0.00`;
  document.querySelector(".error").textContent = "";
  totalPeopleInput.classList.remove("input-error");
}

//show error
function toggleError() {
  const errorEl = this.parentElement.querySelector(".error");

  if (!parseInt(this.value)) {
    errorEl.textContent = "Can't be zero";
    this.classList.add("input-error");
    return;
  }

  errorEl.textContent = "";
  this.classList.remove("input-error");
}

//Event Listeners
tipPercentButtons.forEach((button) => button.addEventListener("click", clearCustomTip));
tipPercentCustom.addEventListener("input", clearTipButtons);

form.addEventListener("change", (e) => {
  if (e.target.matches("input")) {
    calculateResult();
  }
});

resetBtn.addEventListener("click", resetForm);
totalPeopleInput.addEventListener("input", toggleError);
