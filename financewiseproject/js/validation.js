// validation.js - Contact Form Validation Logic

function validateContact() {
    // Select elements
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const successAlert = document.getElementById('contactSuccess');

    // Parse values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    // Helper: Mark field valid/invalid
    const setFieldStatus = (element, valid) => {
        if (valid) {
            element.classList.remove('is-invalid');
            element.classList.add('is-valid');
        } else {
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
            isValid = false;
        }
    };

    // 1. Name Validation (at least 3 characters)
    setFieldStatus(nameInput, name.length >= 3);

    // 2. Email Validation (regex pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFieldStatus(emailInput, emailRegex.test(email));

    // 3. Phone Validation (optional; if entered, must be 7-15 digits)
    if (phone.length > 0) {
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
        setFieldStatus(phoneInput, phoneRegex.test(phone));
    } else {
        // Optional field, if empty it's valid
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
    }

    // 4. Subject Validation (at least 4 characters)
    setFieldStatus(subjectInput, subject.length >= 4);

    // 5. Message Validation (at least 20 characters)
    setFieldStatus(messageInput, message.length >= 20);

    // Show success alert or keep it hidden
    if (isValid) {
        successAlert.style.display = 'block';
        successAlert.scrollIntoView({ behavior: 'smooth' });

        // Reset form inputs after brief delay
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            // Remove validation classes
            [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        }, 3000);
    } else {
        successAlert.style.display = 'none';
    }
}
