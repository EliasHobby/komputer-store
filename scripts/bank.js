let payAccount = 0;
let payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount);
let bankAccount = 0;
let bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
let currentLoan;
let currentLoanFormatted;
let currentLoanText;

let payAccountText = document.getElementById("pay-account");
payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;

let bankAccountText = document.getElementById("bank-account");
bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`

const btnWork = document.getElementById("btn-work");
btnWork.addEventListener("click", buttonWork);

const btnBank = document.getElementById("btn-bank");
btnBank.addEventListener("click", buttonBank);

const btnGetLoan = document.getElementById("btn-getLoan");
btnGetLoan.addEventListener("click", buttonGetLoan);
 
const btnPayLoan = document.getElementById("btn-payLoan");
btnPayLoan.disabled = true;
btnPayLoan.addEventListener("click", buttonPayLoan);

// Handlers
function buttonWork() {
    work();
}

function buttonBank() {
    bank();
}

function buttonGetLoan() {
    getLoan();
}

function buttonPayLoan() {
    payLoan();
}


// Functions

function work() {
    payAccount += 100;
    payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount)

    payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
}

function bank() {
    bankAccount += payAccount;
    bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount)
    payAccount = 0;
    payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount)

    payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
    bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;
}

function getLoan() {
    if (!currentLoan == 0) { // If current loan exists, throw error
            errorResponse = "Error: Please pay back the balance of the outstanding loan before taking up a new one.";
            successResponse = null;
            document.getElementById("errorResponse").innerHTML = errorResponse;
            document.getElementById("successResponse").innerHTML = successResponse;
    } else { // If no current loan exists, allow new loan
        let errorResponse;
        let successResponse;
        let maxLoan = bankAccount * 2;
        let attemptedLoan = prompt(`How much do you want to loan?`);
        if (attemptedLoan > maxLoan) { // If user attempts to loan more than double their bank value
            errorResponse = "Error: You cannot loan more than double your bank value!";
            successResponse = null;
            document.getElementById("errorResponse").innerHTML = errorResponse;
            document.getElementById("successResponse").innerHTML = successResponse;
        } else { // If successful loan
            if(attemptedLoan === null) {
                return;
            }
            currentLoan = attemptedLoan;
            currentLoanFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(currentLoan);
            currentLoanText = document.getElementById("current-loan");
            currentLoanText.innerText = `Outstanding loan: ${currentLoanFormatted}`
            successResponse = "Loan successful!";
            errorResponse = null;
            document.getElementById("successResponse").innerHTML = successResponse;
            document.getElementById("errorResponse").innerHTML = errorResponse;
            btnPayLoan.disabled = false;
        }
    }
}

function payLoan() {
    if (currentLoan < payAccount) { // If the pay account has enough money to repay the entire loan

        // Add additional money from pay account to the bank account after repaying the loan
        payAccount = payAccount - currentLoan;
        bankAccount += payAccount;
        bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount)
        bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;

        // Remove the existing loan
        currentLoan = 0;
        currentLoanText = document.getElementById("current-loan");
        currentLoanText.innerText = null;
        btnPayLoan.disabled = true;

        // Set pay account balance to 0
        payAccount = 0;
        payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount)
        payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
        
    } else { // If the pay account does not have enough money to repay the entire loan

        // Subtract pay account from current loan and update the value
        currentLoan -= payAccount;
        currentLoanFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(currentLoan);
        currentLoanText = document.getElementById("current-loan");
        currentLoanText.innerText = `Outstanding loan: ${currentLoanFormatted}`

        // Set pay account balance to 0
        payAccount = 0;
        payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount)
        payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
        
    }
}