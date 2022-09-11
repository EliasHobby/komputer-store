let payAccount = 0;
let salary = 100;
let payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount);
let payAccountText = document.getElementById("pay-account");
payAccountText.innerText = `Pay account balance ${payAccountFormatted}`; // Display current Pay account balance

const btnWork = document.getElementById("btn-work"); // Work button, earn money
btnWork.addEventListener("click", buttonWork);

const btnBank = document.getElementById("btn-bank"); // Bank button, transfer earned money to bank
btnBank.addEventListener("click", buttonBank);

// Handlers

function buttonWork() {
    work();
}

function buttonBank() {
    bank();
}

// Functions

function work() {
    payAccount += salary;
    payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount)
    // Update displayed pay account balance
    payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;

    // Animation for earning money
    var moneyAnimation = document.createElement("anim");
    moneyAnimation.innerHTML = `+${salary}`
    document.getElementById("moneyAnimation").appendChild(moneyAnimation);
    moneyAnimation.classList.add("moneyAnimation"); // Add the class that animates
}

function bank() {
    bankAccount += payAccount;
    bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount)
    payAccount = 0;
    payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount)

    // Update displayed pay account and bank account balances
    payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
    bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;
}