let bankAccount = 0;
let bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
let currentLoan;
let currentLoanFormatted;
let currentLoanText;

let bankAccountText = document.getElementById("bank-account");
bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`

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
        let errorResponse;
        let successResponse;
        let maxLoan = bankAccount * 2;
        let attemptedLoan = prompt(`How much do you want to loan?`);
        if (attemptedLoan > maxLoan) { // If user attempts to loan more than double their bank value
            alert("Error: You cannot loan more than double your bank value!");
        } else { // If successful loan
            if(attemptedLoan === null) {
                return;
            }
            currentLoan = attemptedLoan;
            currentLoanFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(currentLoan);
            currentLoanText = document.getElementById("current-loan");
            currentLoanText.innerText = `Outstanding loan: ${currentLoanFormatted}`
            alert("Loan successful!");
            btnPayLoan.disabled = false; // Make the button to repay loan visible on successful loan
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
        btnPayLoan.disabled = true; // Hide the button to repay the loan if the loan is repaid in full

        // Set pay account balance to 0
        payAccount = 0;
        payAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(payAccount)
        payAccountText.innerText = `Pay account balance ${payAccountFormatted}`;

        alert("You are now debt-free!");
        const interval = setInterval(confetti, 10000);
        
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
