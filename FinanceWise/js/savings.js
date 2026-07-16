/* =======================================================
   FINANCEWISE - SAVINGS GOAL PLANNER SCRIPT
   File: js/savings.js
   Purpose: Calculate months to reach savings goal and
            display a Bootstrap progress bar
   ======================================================= */

/* -------------------------------------------------------
   calculateSavings()
   - Reads goal amount and monthly saving from the form
   - Divides goal by monthly saving to get months needed
   - Animates a progress bar
   - Shows an estimated date of completion
------------------------------------------------------- */
function calculateSavings() {

    // Hide previous error
    var errorBox = document.getElementById("savingsError");
    errorBox.style.display = "none";
    errorBox.innerText = "";

    // Step 1: Read form values
    var goalName     = document.getElementById("goalName").value.trim();
    var goalAmount   = parseFloat(document.getElementById("goalAmount").value)   || 0;
    var monthlySave  = parseFloat(document.getElementById("monthlySaving").value) || 0;

    // Step 2: Validate inputs
    if (goalAmount <= 0) {
        errorBox.innerText = "Please enter a valid goal amount greater than 0.";
        errorBox.style.display = "block";
        return;
    }

    if (monthlySave <= 0) {
        errorBox.innerText = "Please enter a valid monthly saving amount greater than 0.";
        errorBox.style.display = "block";
        return;
    }

    if (monthlySave > goalAmount) {
        errorBox.innerText = "Monthly saving cannot be greater than the total goal amount.";
        errorBox.style.display = "block";
        return;
    }

    // Step 3: Calculate months required
    // If goal = $2000 and you save $200/month, months = 2000 / 200 = 10
    var monthsNeeded = Math.ceil(goalAmount / monthlySave);
    // Math.ceil rounds UP so we don't underestimate

    // Step 4: Calculate estimated completion date
    var today = new Date(); // today's date
    var completionDate = new Date();
    // Add monthsNeeded months to today's date
    completionDate.setMonth(today.getMonth() + monthsNeeded);

    // Format date as "Month Year"
    var monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    var formattedDate = monthNames[completionDate.getMonth()] + " " + completionDate.getFullYear();

    // Step 5: Update DOM with results
    document.getElementById("displayGoalName").innerText   = goalName || "Your Goal";
    document.getElementById("displayGoalAmount").innerText = "$" + goalAmount.toFixed(2);
    document.getElementById("displayMonths").innerText     = monthsNeeded + " months";
    document.getElementById("displayDate").innerText       = formattedDate;
    document.getElementById("displayMonthly").innerText    = "$" + monthlySave.toFixed(2);

    // Step 6: Animate the progress bar
    // We start the bar at a small percentage to show it has started
    // The bar grows over time if the user tracks their goal month by month
    // For now, we set it to a "starting point" of around 5% - 20%
    var startPercent = Math.min(Math.round((monthlySave / goalAmount) * 100), 100);

    var progressBar = document.getElementById("savingsProgress");
    progressBar.style.width = startPercent + "%";
    progressBar.setAttribute("aria-valuenow", startPercent);

    document.getElementById("progressPercent").innerText = startPercent + "% (Month 1)";

    // Step 7: Show completion message
    var completionMsg = document.getElementById("completionMessage");
    if (monthsNeeded <= 6) {
        completionMsg.className = "alert alert-success mt-3";
        completionMsg.innerHTML =
            '<i class="bi bi-emoji-smile me-2"></i>' +
            '<strong>Excellent!</strong> You can reach your goal of <strong>$' + goalAmount.toFixed(2) + '</strong>' +
            ' in just <strong>' + monthsNeeded + ' months</strong> by saving $' + monthlySave.toFixed(2) + ' per month. ' +
            'Estimated date: <strong>' + formattedDate + '</strong>.';
    } else if (monthsNeeded <= 24) {
        completionMsg.className = "alert alert-info mt-3";
        completionMsg.innerHTML =
            '<i class="bi bi-info-circle me-2"></i>' +
            '<strong>Good plan!</strong> You will reach your goal in <strong>' + monthsNeeded + ' months</strong> ' +
            '(around <strong>' + formattedDate + '</strong>). Stay consistent with your monthly savings!';
    } else {
        completionMsg.className = "alert alert-warning mt-3";
        completionMsg.innerHTML =
            '<i class="bi bi-exclamation-triangle me-2"></i>' +
            '<strong>Long-term goal.</strong> It will take <strong>' + monthsNeeded + ' months</strong> ' +
            '(about ' + Math.floor(monthsNeeded / 12) + ' years) to reach your goal. ' +
            'Consider increasing your monthly saving to get there faster.';
    }

    // Step 8: Show results section
    document.getElementById("savingsResults").style.display = "block";
    document.getElementById("savingsResults").scrollIntoView({ behavior: "smooth" });
}

/* -------------------------------------------------------
   resetSavings()
   - Clears form fields
   - Hides result section
------------------------------------------------------- */
function resetSavings() {
    document.getElementById("goalName").value     = "";
    document.getElementById("goalAmount").value   = "";
    document.getElementById("monthlySaving").value = "";

    document.getElementById("savingsResults").style.display = "none";
    document.getElementById("savingsError").style.display   = "none";

    // Reset the progress bar back to 0
    var progressBar = document.getElementById("savingsProgress");
    if (progressBar) {
        progressBar.style.width = "0%";
    }
}
