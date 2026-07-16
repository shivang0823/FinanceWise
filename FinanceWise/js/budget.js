/* =======================================================
   FINANCEWISE - BUDGET PLANNER SCRIPT
   File: js/budget.js
   Purpose: Calculate budget, expenses and savings
   ======================================================= */

/* -------------------------------------------------------
   calculateBudget()
   - Reads values from the form fields
   - Adds up all expenses
   - Subtracts expenses from income to get savings
   - Displays results in the result section
------------------------------------------------------- */
function calculateBudget() {

    // Hide any previous error message
    document.getElementById("budgetError").style.display = "none";

    // Step 1: Read the income value from the input field
    // parseFloat converts the text string to a decimal number
    // || 0 means "use 0 if the field is empty"
    var income = parseFloat(document.getElementById("income").value) || 0;

    // Validate: Income must be entered
    if (income <= 0) {
        document.getElementById("budgetError").style.display = "block";
        return; // stop the function here
    }

    // Step 2: Read each expense field
    var rent          = parseFloat(document.getElementById("rent").value)          || 0;
    var food          = parseFloat(document.getElementById("food").value)          || 0;
    var transport     = parseFloat(document.getElementById("transport").value)     || 0;
    var entertainment = parseFloat(document.getElementById("entertainment").value) || 0;
    var other         = parseFloat(document.getElementById("other").value)         || 0;

    // Step 3: Add all expenses together
    var totalExpenses = rent + food + transport + entertainment + other;

    // Step 4: Calculate remaining balance (savings)
    var savings = income - totalExpenses;

    // Step 5: Display the main summary cards
    document.getElementById("resultIncome").innerText   = "$" + income.toFixed(2);
    document.getElementById("resultExpenses").innerText = "$" + totalExpenses.toFixed(2);
    document.getElementById("resultSavings").innerText  = "$" + savings.toFixed(2);

    // Step 6: Fill the expense breakdown table
    document.getElementById("tRent").innerText      = "$" + rent.toFixed(2);
    document.getElementById("tFood").innerText      = "$" + food.toFixed(2);
    document.getElementById("tTransport").innerText = "$" + transport.toFixed(2);
    document.getElementById("tEntertain").innerText = "$" + entertainment.toFixed(2);
    document.getElementById("tOther").innerText     = "$" + other.toFixed(2);

    // Step 7: Change savings card color based on positive/negative balance
    var savingsCard  = document.getElementById("savingsCard");
    var savingsAlert = document.getElementById("savingsAlert");
    var savingsTitle = document.getElementById("resultSavings");

    if (savings >= 0) {
        // Good: you are saving money
        savingsCard.className = "card text-center border-success";
        savingsTitle.className = "card-title fw-bold text-success";
        savingsAlert.innerHTML =
            '<div class="alert alert-success">' +
            '<i class="bi bi-emoji-smile me-2"></i>' +
            'Great job! You are saving <strong>$' + savings.toFixed(2) + '</strong> this month.' +
            '</div>';
    } else {
        // Warning: expenses exceed income
        savingsCard.className = "card text-center border-danger";
        savingsTitle.className = "card-title fw-bold text-danger";
        savingsAlert.innerHTML =
            '<div class="alert alert-danger">' +
            '<i class="bi bi-exclamation-triangle me-2"></i>' +
            'Warning! Your expenses exceed your income by <strong>$' + Math.abs(savings).toFixed(2) + '</strong>. Consider cutting back.' +
            '</div>';
    }

    // Step 8: Show the results section (it is hidden by default)
    document.getElementById("budgetResults").style.display = "block";

    // Smooth scroll to results
    document.getElementById("budgetResults").scrollIntoView({ behavior: "smooth" });
}

/* -------------------------------------------------------
   resetBudget()
   - Clears all form fields
   - Hides the results section
------------------------------------------------------- */
function resetBudget() {
    // Clear each input field one by one
    document.getElementById("income").value        = "";
    document.getElementById("rent").value          = "";
    document.getElementById("food").value          = "";
    document.getElementById("transport").value     = "";
    document.getElementById("entertainment").value = "";
    document.getElementById("other").value         = "";

    // Hide results and error
    document.getElementById("budgetResults").style.display = "none";
    document.getElementById("budgetError").style.display   = "none";
}
