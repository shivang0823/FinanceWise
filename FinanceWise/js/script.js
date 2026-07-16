/* =======================================================
   FINANCEWISE - SHARED SCRIPT
   Project: Personal Finance Guide (Internship Project)
   File: js/script.js
   Contains: Dark Mode Toggle + Scroll To Top Button
   ======================================================= */

// Wait for the entire HTML page to load before running scripts
document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------------------------------
       1. DARK MODE TOGGLE
       - Find the toggle button
       - When clicked, add or remove the "dark-mode" class
         on the body element
    ------------------------------------------------------- */
    var darkModeBtn = document.getElementById("darkModeToggle");

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function () {

            // Toggle adds class if missing, removes if present
            document.body.classList.toggle("dark-mode");

            // Update button label to match current state
            if (document.body.classList.contains("dark-mode")) {
                darkModeBtn.innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
                darkModeBtn.classList.remove("btn-outline-light");
                darkModeBtn.classList.add("btn-outline-warning");
            } else {
                darkModeBtn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
                darkModeBtn.classList.remove("btn-outline-warning");
                darkModeBtn.classList.add("btn-outline-light");
            }
        });
    }

    /* -------------------------------------------------------
       2. SCROLL TO TOP BUTTON
       - Show button when user scrolls down more than 200px
       - Clicking the button scrolls back to the top
    ------------------------------------------------------- */
    var scrollBtn = document.getElementById("scrollTopBtn");

    // Listen for scroll events on the window
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollBtn.style.display = "block"; // show button
        } else {
            scrollBtn.style.display = "none";  // hide button
        }
    });

    // Click handler: scroll back to the top of the page
    if (scrollBtn) {
        scrollBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // smooth scrolling animation
            });
        });
    }

}); // end DOMContentLoaded
