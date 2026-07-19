// calculator.js - Financial Calculators Logic

// Currency Formatter Helper
const formatUSD = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
};

// ========================================================
// 1. EMI Calculator
// ========================================================
function calculateEMI() {
    const principalInput = document.getElementById('emiPrincipal');
    const rateInput = document.getElementById('emiRate');
    const yearsInput = document.getElementById('emiYears');
    const resultBox = document.getElementById('emiResult');
    const errorBox = document.getElementById('emiError');

    // Clear styles
    errorBox.style.display = 'none';
    resultBox.style.display = 'none';
    principalInput.classList.remove('is-invalid');
    rateInput.classList.remove('is-invalid');
    yearsInput.classList.remove('is-invalid');

    const P = parseFloat(principalInput.value);
    const annualRate = parseFloat(rateInput.value);
    const years = parseFloat(yearsInput.value);

    // Validation
    let hasError = false;
    if (isNaN(P) || P <= 0) { principalInput.classList.add('is-invalid'); hasError = true; }
    if (isNaN(annualRate) || annualRate <= 0) { rateInput.classList.add('is-invalid'); hasError = true; }
    if (isNaN(years) || years <= 0) { yearsInput.classList.add('is-invalid'); hasError = true; }

    if (hasError) {
        errorBox.innerText = "Please enter valid positive numbers in all fields.";
        errorBox.style.display = 'block';
        return;
    }

    const r = (annualRate / 12) / 100; // monthly interest rate
    const n = years * 12; // tenure in months

    // EMI calculation
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    // Display
    document.getElementById('emiMonthly').innerHTML = `<strong>Monthly EMI:</strong> <span class="text-primary fw-bold">${formatUSD(emi)}</span>`;
    document.getElementById('emiTotal').innerHTML = `<strong>Total Payment:</strong> ${formatUSD(totalPayment)}`;
    document.getElementById('emiInterest').innerHTML = `<strong>Total Interest:</strong> ${formatUSD(totalInterest)}`;

    resultBox.style.display = 'block';
}

// ========================================================
// 2. Simple Interest Calculator
// ========================================================
function calculateSI() {
    const principalInput = document.getElementById('siPrincipal');
    const rateInput = document.getElementById('siRate');
    const timeInput = document.getElementById('siTime');
    const resultBox = document.getElementById('siResult');
    const errorBox = document.getElementById('siError');

    // Clear styles
    errorBox.style.display = 'none';
    resultBox.style.display = 'none';
    principalInput.classList.remove('is-invalid');
    rateInput.classList.remove('is-invalid');
    timeInput.classList.remove('is-invalid');

    const P = parseFloat(principalInput.value);
    const R = parseFloat(rateInput.value);
    const T = parseFloat(timeInput.value);

    // Validation
    let hasError = false;
    if (isNaN(P) || P <= 0) { principalInput.classList.add('is-invalid'); hasError = true; }
    if (isNaN(R) || R <= 0) { rateInput.classList.add('is-invalid'); hasError = true; }
    if (isNaN(T) || T <= 0) { timeInput.classList.add('is-invalid'); hasError = true; }

    if (hasError) {
        errorBox.innerText = "Please enter valid positive numbers in all fields.";
        errorBox.style.display = 'block';
        return;
    }

    const interest = (P * R * T) / 100;
    const total = P + interest;

    // Display
    document.getElementById('siInterest').innerHTML = `<strong>Interest Earned:</strong> <span class="text-success fw-bold">${formatUSD(interest)}</span>`;
    document.getElementById('siTotal').innerHTML = `<strong>Total Amount:</strong> ${formatUSD(total)}`;

    resultBox.style.display = 'block';
}

// ========================================================
// 3. Compound Interest Calculator
// ========================================================
function calculateCI() {
    const principalInput = document.getElementById('ciPrincipal');
    const rateInput = document.getElementById('ciRate');
    const timeInput = document.getElementById('ciTime');
    const freqSelect = document.getElementById('ciFrequency');
    const resultBox = document.getElementById('ciResult');
    const errorBox = document.getElementById('ciError');

    // Clear styles
    errorBox.style.display = 'none';
    resultBox.style.display = 'none';
    principalInput.classList.remove('is-invalid');
    rateInput.classList.remove('is-invalid');
    timeInput.classList.remove('is-invalid');

    const P = parseFloat(principalInput.value);
    const annualRate = parseFloat(rateInput.value);
    const t = parseFloat(timeInput.value);
    const n = parseInt(freqSelect.value);

    // Validation
    let hasError = false;
    if (isNaN(P) || P <= 0) { principalInput.classList.add('is-invalid'); hasError = true; }
    if (isNaN(annualRate) || annualRate <= 0) { rateInput.classList.add('is-invalid'); hasError = true; }
    if (isNaN(t) || t <= 0) { timeInput.classList.add('is-invalid'); hasError = true; }

    if (hasError) {
        errorBox.innerText = "Please enter valid positive numbers in all fields.";
        errorBox.style.display = 'block';
        return;
    }

    const r = annualRate / 100;
    const A = P * Math.pow(1 + (r / n), n * t);
    const interest = A - P;

    // Display
    document.getElementById('ciInterest').innerHTML = `<strong>Interest Earned:</strong> <span class="text-warning fw-bold text-dark">${formatUSD(interest)}</span>`;
    document.getElementById('ciTotal').innerHTML = `<strong>Total Amount (Accumulated):</strong> ${formatUSD(A)}`;

    resultBox.style.display = 'block';
}

// ========================================================
// 4. 50-30-20 Budget Calculator
// ========================================================
function calculateBudgetSplit() {
    const incomeInput = document.getElementById('budgetIncome');
    const resultBox = document.getElementById('budgetSplitResult');
    const progressDiv = document.getElementById('budgetProgress');
    const errorBox = document.getElementById('budgetSplitError');

    // Clear styles
    errorBox.style.display = 'none';
    resultBox.style.display = 'none';
    progressDiv.style.display = 'none';
    incomeInput.classList.remove('is-invalid');

    const income = parseFloat(incomeInput.value);

    // Validation
    if (isNaN(income) || income <= 0) {
        incomeInput.classList.add('is-invalid');
        errorBox.innerText = "Please enter a valid monthly net income.";
        errorBox.style.display = 'block';
        return;
    }

    const needs = income * 0.50;
    const wants = income * 0.30;
    const savings = income * 0.20;

    // Display
    document.getElementById('bNeeds').innerHTML = `<strong>Needs (50%):</strong> <span class="text-primary fw-bold">${formatUSD(needs)}</span> (Housing, Groceries, Bills)`;
    document.getElementById('bWants').innerHTML = `<strong>Wants (30%):</strong> <span class="text-warning fw-bold text-dark">${formatUSD(wants)}</span> (Dining out, Hobby, Travel)`;
    document.getElementById('bSavings').innerHTML = `<strong>Savings / Debt (20%):</strong> <span class="text-success fw-bold">${formatUSD(savings)}</span> (Emergency fund, Investments)`;

    resultBox.style.display = 'block';
    progressDiv.style.display = 'block';
}
