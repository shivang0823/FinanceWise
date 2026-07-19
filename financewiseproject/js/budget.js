// budget.js - Monthly Budget Planner Logic

function calculateBudget() {
    // Select input elements
    const incomeInput = document.getElementById('income');
    const rentInput = document.getElementById('rent');
    const foodInput = document.getElementById('food');
    const transportInput = document.getElementById('transport');
    const entertainmentInput = document.getElementById('entertainment');
    const otherInput = document.getElementById('other');

    // Error and result elements
    const budgetError = document.getElementById('budgetError');
    const budgetResults = document.getElementById('budgetResults');
    
    // Parse values
    const income = parseFloat(incomeInput.value) || 0;
    const rent = parseFloat(rentInput.value) || 0;
    const food = parseFloat(foodInput.value) || 0;
    const transport = parseFloat(transportInput.value) || 0;
    const entertainment = parseFloat(entertainmentInput.value) || 0;
    const other = parseFloat(otherInput.value) || 0;

    // Validation: Income is required and must be greater than 0
    if (incomeInput.value.trim() === '' || income <= 0) {
        budgetError.style.display = 'block';
        budgetResults.style.display = 'none';
        incomeInput.classList.add('is-invalid');
        return;
    }

    // Clear validation error styling
    budgetError.style.display = 'none';
    incomeInput.classList.remove('is-invalid');

    // Calculate totals
    const totalExpenses = rent + food + transport + entertainment + other;
    const remainingSavings = income - totalExpenses;

    // Format currency helper using global settings
    const formatCurrency = (val) => {
        return window.formatCurrencyGlobal(val);
    };

    // Update summary cards
    document.getElementById('resultIncome').innerText = formatCurrency(income);
    document.getElementById('resultExpenses').innerText = formatCurrency(totalExpenses);
    
    const savingsElement = document.getElementById('resultSavings');
    savingsElement.innerText = formatCurrency(remainingSavings);

    // Update expense breakdown table
    document.getElementById('tRent').innerText = formatCurrency(rent);
    document.getElementById('tFood').innerText = formatCurrency(food);
    document.getElementById('tTransport').innerText = formatCurrency(transport);
    document.getElementById('tEntertain').innerText = formatCurrency(entertainment);
    document.getElementById('tOther').innerText = formatCurrency(other);

    // Dynamic savings alert and styling
    const savingsCard = document.getElementById('savingsCard');
    const savingsAlert = document.getElementById('savingsAlert');

    if (remainingSavings > 0) {
        // Positive savings
        savingsCard.className = 'card text-center border-success';
        savingsElement.className = 'card-title text-success fw-bold';
        
        const savingsPercent = ((remainingSavings / income) * 100).toFixed(1);
        savingsAlert.className = 'alert alert-success mt-3';
        savingsAlert.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i><strong>Great job!</strong> You are saving <strong>${savingsPercent}%</strong> of your income (${formatCurrency(remainingSavings)}).`;
    } else if (remainingSavings === 0) {
        // Zero balance
        savingsCard.className = 'card text-center border-warning';
        savingsElement.className = 'card-title text-warning fw-bold';
        
        savingsAlert.className = 'alert alert-warning mt-3';
        savingsAlert.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i><strong>Balanced budget.</strong> Your expenses match your income exactly. Try cutting wants to build savings.`;
    } else {
        // Deficit (Negative savings)
        savingsCard.className = 'card text-center border-danger';
        savingsElement.className = 'card-title text-danger fw-bold';
        
        const deficitPercent = ((Math.abs(remainingSavings) / income) * 100).toFixed(1);
        savingsAlert.className = 'alert alert-danger mt-3';
        savingsAlert.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i><strong>Deficit warning!</strong> You are overspending by <strong>${deficitPercent}%</strong> (${formatCurrency(Math.abs(remainingSavings))}). Consider reducing expenses.`;
    }

    // Display the results section
    budgetResults.style.display = 'block';
}

function resetBudget() {
    // Reset Form
    document.getElementById('budgetForm').reset();
    
    // Clear validation styling
    document.getElementById('income').classList.remove('is-invalid');
    
    // Hide results & errors
    document.getElementById('budgetError').style.display = 'none';
    document.getElementById('budgetResults').style.display = 'none';
}

// Dynamically update UI on currency selection changes
window.addEventListener('currencyChange', () => {
    if (document.getElementById('budgetResults').style.display === 'block') {
        calculateBudget();
    }
});
