// Variables

let bankAccount = 0;
let currentLoan;
let disposableAmount;

let bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
let currentLoanFormatted;
let disposableAmountFormatted;

let bankAccountText = document.getElementById("bank-account");
let currentLoanText = document.getElementById("current-loan");
let disposableAmountText = document.getElementById("disposable-amount");
bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`

// Buttons

const btnGetLoan = document.getElementById("btn-getLoan");
btnGetLoan.addEventListener("click", buttonGetLoan);
 
const btnPayLoan = document.getElementById("btn-payLoan");
btnPayLoan.disabled = true; // Hide button to repay loan when user has no active loan
btnPayLoan.addEventListener("click", buttonPayLoan);

// Handlers

function buttonGetLoan() {
    getLoan();
}

function buttonPayLoan() {
    payLoan();
}


// Functions

function getLoan() {
    if (!currentLoan == 0) { // If current loan exists, throw error
        alert("Error: Please pay back the balance of the outstanding loan before taking up a new one.");
    } else { // If no current loan exists, allow new loan
        let maxLoan = bankAccount * 2;
        let attemptedLoan = prompt(`How much do you want to loan?`);
        if(attemptedLoan === null) { // If user cancels input, ensure that we don't set attempted loan to an empty string
            return;
        }
        if (isNaN(attemptedLoan) || attemptedLoan <= 0) { // If user tries to loan a non integer, or an amount of zero or below, throw error
            alert("Error: Please enter a sum consisting of only positive numbers.");
            return;
        }
        if (attemptedLoan > maxLoan) { // If user attempts to loan more than double their bank value
            alert("Error: You cannot loan more than double your bank value!");
        } else { // If successful loan
            currentLoan = attemptedLoan;
            disposableAmount = +currentLoan + bankAccount;

            updateDisposableBalance();
            updateCurrentLoanBalance();
            
            alert("Loan successful!");
            btnPayLoan.disabled = false; // Make the button to repay loan visible on successful loan
        }
    }
}

function payLoan() {
    if (currentLoan <= payAccount) { // If the pay account has enough money to repay the entire loan

        // Add surplus money from pay account to the bank account after repaying the loan
        payAccount = payAccount - currentLoan;
        bankAccount += payAccount;
        
        // Remove the existing loan
        currentLoan = 0;
        currentLoanText.innerText = null;
        btnPayLoan.disabled = true; // Hide the button to repay the loan if the loan is repaid in full

        // Disposable amount is no longer necessary to display as it is equal to bank balance
        disposableAmount = 0;
        disposableAmountText.innerText = null;

        // Set pay account balance to 0
        payAccount = 0;
        
        // Update displayed balances
        updateBankBalance();
        updatePayBalance();

        alert("You are now debt-free!");
        
    } else { // If the pay account does not have enough money to repay the entire loan

        // Subtract pay account from current loan and update the value
        currentLoan -= payAccount;
        disposableAmount = +currentLoan + bankAccount;
        
        // Set pay account balance to 0
        payAccount = 0;
        
        // Update displayed balances
        updatePayBalance();
        updateCurrentLoanBalance();
        updateDisposableBalance();
    }
}

function updateBankBalance() {
    bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
    bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;
}

function updatePayBalance() {
    payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount);
    payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;
}

function updateCurrentLoanBalance() {
    currentLoanFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(currentLoan);
    currentLoanText.innerText = `Outstanding loan: ${currentLoanFormatted}`;
}

function updateDisposableBalance() {
    disposableAmountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(disposableAmount);
    disposableAmountText.innerText = `Disposable amount: ${disposableAmountFormatted}`;
}
