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
    if (!currentLoan == 0) { // If user has a loan. currentLoan is defined in bank.js and can be used because we load this script after
        if (currentLoan <= Math.round((10 / 100) * payAccount)) { // If 10% of the money in the pay account is enough to cover the remainder of the loan

            bankAccount += (payAccount - currentLoan); // Add the pay account value minus the value of the remaining loan
            payAccount = 0;

            // Remove the existing loan
            currentLoan = 0;
            currentLoanText = document.getElementById("current-loan");
            currentLoanText.innerText = null;
            btnPayLoan.disabled = true; // Hide the button to repay the loan if the loan is repaid in full

            // Update displayed balances
            bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
            payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount);

            payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
            bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;

            alert("You are now debt-free!");
        } else { // If 10% of the money in the pay account doesn't cover the remainder of the loan
            currentLoan -= Math.round((10 / 100) * payAccount);
            bankAccount += payAccount - Math.round((10 / 100) * payAccount);
            payAccount = 0;

            // Update displayed balances
            currentLoanFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(currentLoan);
            bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
            payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount);

            currentLoanText.innerText = `Outstanding loan: ${currentLoanFormatted}`
            bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;
            payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
        }
    }
    else {
        bankAccount += payAccount;
        payAccount = 0;
    
        // Update displayed balances
        payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount);
        bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
        payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
        bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;
    }
}