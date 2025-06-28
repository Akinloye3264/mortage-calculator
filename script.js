function Submit() {
   
    const mortgageAmount = parseFloat(document.getElementById("Amount").value.trim());
    const mortgageTerm = parseFloat(document.getElementById("term").value.trim());
    const interestRate = parseFloat(document.getElementById("rate").value.trim());
    
    const mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;
    
  
    if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate)) {
        alert("Please enter valid numbers for all fields");
        return;
    }
    
    if (mortgageAmount <= 0 || mortgageTerm <= 0 || interestRate <= 0) {
        alert("Please enter positive values for all fields");
        return;
    }
    
    let monthlyPayment, totalRepayment;
    if (mortgageType === "repayment") {
    
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = mortgageTerm * 12;
        
        if (monthlyRate === 0) {
            monthlyPayment = mortgageAmount / numberOfPayments;
        } else {
            monthlyPayment = mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
        
        totalRepayment = monthlyPayment * numberOfPayments;
    } else {       
        const monthlyRate = interestRate / 100 / 12;
        const monthlyInterest = mortgageAmount * monthlyRate;
        const monthlyPrincipal = mortgageAmount / (mortgageTerm * 12);
        
        monthlyPayment = monthlyInterest + monthlyPrincipal;
        totalRepayment = monthlyPayment * (mortgageTerm * 12);
    }

    showResults();
    
    document.getElementById("result").textContent = `£${monthlyPayment.toFixed(2)}`;
    document.getElementById("total-repayment").textContent = `£${totalRepayment.toFixed(2)}`;
}

function showEmptyState() {
    const resultCard = document.querySelector('.result-card');
    resultCard.innerHTML = `
        <div class="empty-state">
            <img src="./assets/images/illustration-empty.svg" alt="Empty state illustration" class="empty-illustration">
            <h2>Results shown here</h2>
            <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be</p>
        </div>
    `;
}

function showResults() {
    const resultCard = document.querySelector('.result-card');
    resultCard.innerHTML = `
        <h1>Your results</h1> 
        <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again.</p>
        <div class="Showing-result">
            <h1>Your monthly Repayments</h1>
            <p class="result" id="result"></p>
            <p class="result-details"></p>
            <p>Total you will repay over the term</p>
            <p class="total-repayment" id="total-repayment"></p>
        </div>
    `;
}

function clearAll() {
    document.getElementById("Amount").value = "";
    document.getElementById("term").value = "";
    document.getElementById("rate").value = "";
    showEmptyState();
}


document.addEventListener('DOMContentLoaded', function() {
    showEmptyState();
    
    const clearButton = document.querySelector('.clear');
    if (clearButton) {
        clearButton.addEventListener('click', clearAll);
    }
});