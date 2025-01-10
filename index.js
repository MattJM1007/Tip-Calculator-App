//--------DOM objects--------
const inputFields = Array.from(document.querySelectorAll('input'));
const tipButtons = Array.from(document.getElementsByClassName('tip-button'));
const customTipButton = document.getElementById('custom-tip-percentage');
const resetButton = document.querySelector('.reset-button');
const calculatedTip = document.getElementById('calculated-tip');
const calculatedTotal = document.getElementById('calculated-total');
const error = document.querySelector(".error-message");
const peopleInput = document.getElementById('total-people-input');

//--------Variables--------
let userBill = 0;
let userTip = 0;
let totalPeople = 0;

//--------Event Listeners--------
inputFields.forEach((input) => {
    input.addEventListener('change', () => {
        userBill = parseFloat(document.getElementById("total-bill-input").value) || 0;

        totalPeople = parseFloat(document.getElementById('total-people-input').value);

        displayResults();
    })
});

tipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        removeActiveButton();
        resetCustomTip();
        
        e.target.classList.add('tip-button-active');
        userTip = parseFloat(e.target.id);

        displayResults();
    })
});

customTipButton.addEventListener('change', () =>{
    userTip = parseFloat(document.getElementById('custom-tip-percentage').value);
     
    removeActiveButton();

    displayResults();

})

resetButton.addEventListener('click', () => {
    inputFields.forEach(input => input.value = '');
    calculatedTip.innerText = '$0.00';
    calculatedTotal.innerText = '$0.00';

    userBill = 0;
    userTip = 0;
    totalPeople = 0;
    
    resetButton.classList.remove('active-reset-button');
    error.classList.add('hidden');
    peopleInput.classList.remove('error-input');
    removeActiveButton();
})


//--------functions--------

function displayResults(){
    if(totalPeople > 0){
        error.classList.add('hidden');
        peopleInput.classList.remove('error-input');

        calculateTipAmount();
        calculateTotalBill();
        activateResetButton();

        console.log(`Bill: $${userBill}, Tip: ${userTip}%, People: ${totalPeople}`)
    } else {
        error.classList.remove('hidden');
        peopleInput.classList.add('error-input');
    }
};

function removeActiveButton() {
    tipButtons.forEach((button) => {
        button.classList.remove('tip-button-active');
    })
};

function resetCustomTip(){
    customTipButton.value = '';
}

function calculateTipAmount() {
    const tipPerPerson = (userBill * (userTip / 100))/totalPeople;

    calculatedTip.innerText = `$${tipPerPerson.toFixed(2)}`;
};

function calculateTotalBill() {
    const totalPerPerson = 
    (userBill + (userBill * (userTip / 100))) / totalPeople;

    calculatedTotal.innerText = `$${totalPerPerson.toFixed(2)}`;
};

function activateResetButton() {
    resetButton.classList.add('active-reset-button');
};