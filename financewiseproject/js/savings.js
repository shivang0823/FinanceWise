// savings.js - Savings Goal Planner Logic

function calculateSavings() {
    // Select input elements
    const goalNameInput = document.getElementById('goalName');
    const goalAmountInput = document.getElementById('goalAmount');
    const monthlySavingInput = document.getElementById('monthlySaving');

    // Error and results container
    const savingsError = document.getElementById('savingsError');
    const savingsResults = document.getElementById('savingsResults');

    // Clear previous errors
    savingsError.style.display = 'none';
    savingsError.innerHTML = '';
    goalNameInput.classList.remove('is-invalid');
    goalAmountInput.classList.remove('is-invalid');
    monthlySavingInput.classList.remove('is-invalid');

    // Parse values
    const goalName = goalNameInput.value.trim();
    const goalAmount = parseFloat(goalAmountInput.value);
    const monthlySaving = parseFloat(monthlySavingInput.value);

    // Validation
    let hasErrors = false;

    if (!goalName) {
        goalNameInput.classList.add('is-invalid');
        hasErrors = true;
    }
    if (isNaN(goalAmount) || goalAmount <= 0) {
        goalAmountInput.classList.add('is-invalid');
        hasErrors = true;
    }
    if (isNaN(monthlySaving) || monthlySaving <= 0) {
        monthlySavingInput.classList.add('is-invalid');
        hasErrors = true;
    }

    if (hasErrors) {
        savingsError.className = 'alert alert-danger mt-3';
        savingsError.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Please fill in all fields with valid positive numbers.';
        savingsError.style.display = 'block';
        savingsResults.style.display = 'none';
        return;
    }

    // Calculations
    const monthsRequired = Math.ceil(goalAmount / monthlySaving);
    
    // Estimate completion date
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthsRequired);
    const options = { year: 'numeric', month: 'long' };
    const completionDateStr = currentDate.toLocaleDateString('en-US', options);

    // Format currency helper using global settings
    const formatCurrency = (val) => {
        return window.formatCurrencyGlobal(val);
    };

    // Update result UI elements
    document.getElementById('displayGoalName').innerText = goalName;
    document.getElementById('displayGoalAmount').innerText = formatCurrency(goalAmount);
    document.getElementById('displayMonths').innerText = `${monthsRequired} Month${monthsRequired > 1 ? 's' : ''}`;
    document.getElementById('displayDate').innerText = completionDateStr;
    document.getElementById('displayMonthly').innerText = formatCurrency(monthlySaving);

    // Progress bar
    const progressPercent = Math.min(((monthlySaving / goalAmount) * 100), 100).toFixed(1);
    const progressPercentEl = document.getElementById('progressPercent');
    const progressBar = document.getElementById('savingsProgress');

    progressPercentEl.innerText = `${progressPercent}%`;
    progressBar.style.width = `${progressPercent}%`;
    progressBar.setAttribute('aria-valuenow', progressPercent);

    // Completion text
    const completionMessage = document.getElementById('completionMessage');
    completionMessage.innerHTML = `<i class="bi bi-info-circle-fill me-2"></i>To buy your <strong>${goalName}</strong>, you will need to save <strong>${formatCurrency(monthlySaving)}</strong> per month for the next <strong>${monthsRequired} months</strong>. You will reach your target around <strong>${completionDateStr}</strong>!`;

    // Display the results block
    savingsResults.style.display = 'block';
}

function resetSavings() {
    // Reset Form
    document.getElementById('savingsForm').reset();

    // Clear validation highlights
    document.getElementById('goalName').classList.remove('is-invalid');
    document.getElementById('goalAmount').classList.remove('is-invalid');
    document.getElementById('monthlySaving').classList.remove('is-invalid');

    // Hide results & errors
    document.getElementById('savingsError').style.display = 'none';
    document.getElementById('savingsResults').style.display = 'none';
}

// Dynamically update UI on currency selection changes
window.addEventListener('currencyChange', () => {
    if (document.getElementById('savingsResults').style.display === 'block') {
        calculateSavings();
    }
});
