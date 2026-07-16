/* =======================================================
   FINANCEWISE - CONTACT FORM VALIDATION
   File: js/validation.js
   Purpose: Validate all fields in the contact form
            and show Bootstrap is-invalid / is-valid borders
   ======================================================= */

/* -------------------------------------------------------
   validateContact()
   - Called when the "Send Message" button is clicked
   - Checks each field individually
   - Adds is-invalid class if field fails
   - Adds is-valid class if field passes
   - Shows success message when ALL fields are valid
------------------------------------------------------- */
function validateContact() {

    // Track if all fields are valid using a flag variable
    var isFormValid = true;

    /* ---- 1. Validate: Full Name ---- */
    var nameInput = document.getElementById("contactName");
    var nameValue = nameInput.value.trim(); // .trim() removes spaces

    if (nameValue.length < 3) {
        // Mark as invalid: show red border
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        isFormValid = false;
    } else {
        // Mark as valid: show green border
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }

    /* ---- 2. Validate: Email ---- */
    var emailInput = document.getElementById("contactEmail");
    var emailValue = emailInput.value.trim();

    // A simple regex to check email format: must have @ and a dot after it
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        isFormValid = false;
    } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }

    /* ---- 3. Validate: Phone (optional but checked if filled) ---- */
    var phoneInput = document.getElementById("contactPhone");
    var phoneValue = phoneInput.value.trim();

    if (phoneValue.length > 0) {
        // If user has typed something, check it is a valid phone number
        // Allow digits, spaces, dashes, plus sign — length 7 to 15
        var phonePattern = /^[0-9\s\-\+]{7,15}$/;

        if (!phonePattern.test(phoneValue)) {
            phoneInput.classList.add("is-invalid");
            phoneInput.classList.remove("is-valid");
            isFormValid = false;
        } else {
            phoneInput.classList.remove("is-invalid");
            phoneInput.classList.add("is-valid");
        }
    } else {
        // Empty phone is fine (it is optional)
        phoneInput.classList.remove("is-invalid");
        phoneInput.classList.remove("is-valid");
    }

    /* ---- 4. Validate: Subject ---- */
    var subjectInput = document.getElementById("contactSubject");
    var subjectValue = subjectInput.value.trim();

    if (subjectValue.length < 4) {
        subjectInput.classList.add("is-invalid");
        subjectInput.classList.remove("is-valid");
        isFormValid = false;
    } else {
        subjectInput.classList.remove("is-invalid");
        subjectInput.classList.add("is-valid");
    }

    /* ---- 5. Validate: Message ---- */
    var messageInput = document.getElementById("contactMessage");
    var messageValue = messageInput.value.trim();

    if (messageValue.length < 20) {
        messageInput.classList.add("is-invalid");
        messageInput.classList.remove("is-valid");
        isFormValid = false;
    } else {
        messageInput.classList.remove("is-invalid");
        messageInput.classList.add("is-valid");
    }

    /* ---- 6. Check overall form validity ---- */
    if (isFormValid) {
        // All fields passed: show success message
        document.getElementById("contactSuccess").style.display = "block";

        // Scroll to the success message
        document.getElementById("contactSuccess").scrollIntoView({ behavior: "smooth" });

        // Optional: Clear form fields after 3 seconds
        setTimeout(function () {
            clearContactForm();
        }, 3000);

    } else {
        // At least one field failed: make sure success is hidden
        document.getElementById("contactSuccess").style.display = "none";
    }
}

/* -------------------------------------------------------
   clearContactForm()
   - Resets all fields to empty
   - Removes validation classes
------------------------------------------------------- */
function clearContactForm() {
    var fields = ["contactName", "contactEmail", "contactPhone", "contactSubject", "contactMessage"];

    // Loop through each field and clear it
    for (var i = 0; i < fields.length; i++) {
        var field = document.getElementById(fields[i]);
        field.value = "";
        field.classList.remove("is-valid");
        field.classList.remove("is-invalid");
    }

    // Hide success message
    document.getElementById("contactSuccess").style.display = "none";
}
