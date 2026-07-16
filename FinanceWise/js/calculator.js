/* =======================================================
   FINANCEWISE - FINANCIAL CALCULATORS SCRIPT
   File: js/calculator.js
   Contains: 4 calculator functions
   1. EMI Calculator
   2. Simple Interest Calculator
   3. Compound Interest Calculator
   4. 50-30-20 Budget Split Calculator
   ======================================================= */

/* -------------------------------------------------------
   HELPER: showError(id, message)
   Shows an error message in a given error div
------------------------------------------------------- */
function showError(id, message) {
    var box = document.getElementById(id);
    box.innerText = message;
    box.style.display = "block";
}

/* -------------------------------------------------------
   HELPER: hideError(id)
   Hides an error div
------------------------------------------------------- */
function hideError(id) {
    document.getElementById(id).style.display = "none";
}

/* -------------------------------------------------------
   HELPER: showResult(resultId)
   Shows the result box div
------------------------------------------------------- */
function showResult(resultId) {
    document.getElementById(resultId).style.display = "block";
}

/* =======================================================
   1. EMI CALCULATOR
   Formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
   Where:
     P = Principal (loan amount)
     r = Monthly interest rate (annual rate / 12 / 100)
     n = Number of months (years x 12)
   ======================================================= */
function calculateEMI() {

    // Hide previous error and result
    hideError("emiError");
    document.getElementById("emiResult").style.display = "none";

    // Read input values
    var principal = parseFloat(document.getElementById("emiPrincipal").value) || 0;
    var annualRate = parseFloat(document.getElementById("emiRate").value)     || 0;
    var years      = parseFloat(document.getElementById("emiYears").value)    || 0;

    // Validate inputs
    if (principal <= 0 || annualRate <= 0 || years <= 0) {
        showError("emiError", "Please fill in all fields with values greater than 0.");
        return;
    }

    // Convert annual rate to monthly rate
    // Annual 8.5% → 8.5 / 12 / 100 = 0.007083 per month
    var monthlyRate = annualRate / 12 / 100;

    // Convert years to total months
    var n = years * 12;

    // Apply EMI formula
    var emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
              (Math.pow(1 + monthlyRate, n) - 1);

    // Calculate total payment and total interest
    var totalPayment = emi * n;
    var totalInterest = totalPayment - principal;

    // Display results
    document.getElementById("emiMonthly").innerHTML =
        "<strong>Monthly EMI:</strong> $" + emi.toFixed(2);
    document.getElementById("emiTotal").innerHTML =
        "<strong>Total Payment:</strong> $" + totalPayment.toFixed(2);
    document.getElementById("emiInterest").innerHTML =
        "<strong>Total Interest Paid:</strong> $" + totalInterest.toFixed(2);

    showResult("emiResult");
}

/* =======================================================
   2. SIMPLE INTEREST CALCULATOR
   Formula: SI = (P x R x T) / 100
   Where:
     P = Principal
     R = Annual interest rate (%)
     T = Time in years
   ======================================================= */
function calculateSI() {

    hideError("siError");
    document.getElementById("siResult").style.display = "none";

    var principal = parseFloat(document.getElementById("siPrincipal").value) || 0;
    var rate      = parseFloat(document.getElementById("siRate").value)      || 0;
    var time      = parseFloat(document.getElementById("siTime").value)      || 0;

    if (principal <= 0 || rate <= 0 || time <= 0) {
        showError("siError", "Please fill in all fields with values greater than 0.");
        return;
    }

    // Simple Interest formula
    var si = (principal * rate * time) / 100;

    // Total amount = principal + interest
    var totalAmount = principal + si;

    // Display results
    document.getElementById("siInterest").innerHTML =
        "<strong>Simple Interest:</strong> $" + si.toFixed(2);
    document.getElementById("siTotal").innerHTML =
        "<strong>Total Amount (P + SI):</strong> $" + totalAmount.toFixed(2);

    showResult("siResult");
}

/* =======================================================
   3. COMPOUND INTEREST CALCULATOR
   Formula: A = P x (1 + r/n)^(n x t)
            CI = A - P
   Where:
     P = Principal
     r = Annual interest rate (as decimal, so 7% = 0.07)
     n = Number of times interest compounds per year
     t = Time in years
   ======================================================= */
function calculateCI() {

    hideError("ciError");
    document.getElementById("ciResult").style.display = "none";

    var principal  = parseFloat(document.getElementById("ciPrincipal").value)  || 0;
    var rate       = parseFloat(document.getElementById("ciRate").value)       || 0;
    var time       = parseFloat(document.getElementById("ciTime").value)       || 0;
    var frequency  = parseFloat(document.getElementById("ciFrequency").value)  || 1;

    if (principal <= 0 || rate <= 0 || time <= 0) {
        showError("ciError", "Please fill in all fields with values greater than 0.");
        return;
    }

    // Convert rate from percentage to decimal
    var r = rate / 100;

    // Apply compound interest formula
    var A = principal * Math.pow((1 + r / frequency), frequency * time);
    var ci = A - principal;

    // Display results
    document.getElementById("ciInterest").innerHTML =
        "<strong>Compound Interest Earned:</strong> $" + ci.toFixed(2);
    document.getElementById("ciTotal").innerHTML =
        "<strong>Total Amount (P + CI):</strong> $" + A.toFixed(2);

    showResult("ciResult");
}

/* =======================================================
   4. 50-30-20 BUDGET SPLIT CALCULATOR
   Rule:
     50% of income → Needs (rent, food, bills)
     30% of income → Wants (dining out, shopping)
     20% of income → Savings / Investments
   ======================================================= */
function calculateBudgetSplit() {

    hideError("budgetSplitError");
    document.getElementById("budgetSplitResult").style.display = "none";
    document.getElementById("budgetProgress").style.display    = "none";

    var income = parseFloat(document.getElementById("budgetIncome").value) || 0;

    if (income <= 0) {
        showError("budgetSplitError", "Please enter a valid monthly income greater than 0.");
        return;
    }

    // Apply 50-30-20 percentages
    var needs    = income * 0.50; // 50%
    var wants    = income * 0.30; // 30%
    var savings  = income * 0.20; // 20%

    // Display results
    document.getElementById("bNeeds").innerHTML =
        "<strong>Needs (50%):</strong>   $" + needs.toFixed(2) +
        " — Rent, food, utilities, transport";
    document.getElementById("bWants").innerHTML =
        "<strong>Wants (30%):</strong>   $" + wants.toFixed(2) +
        " — Dining, entertainment, shopping";
    document.getElementById("bSavings").innerHTML =
        "<strong>Savings (20%):</strong> $" + savings.toFixed(2) +
        " — Emergency fund, investments";

    showResult("budgetSplitResult");

    // Show the visual progress bar
    document.getElementById("budgetProgress").style.display = "block";
}
