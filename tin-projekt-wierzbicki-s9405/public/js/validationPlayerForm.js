

function validateForm() {
    let valid = true;
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const fileLengthMessage = document.getElementById('errorMessage-file-length').innerText;
    const emailLengthMessage = document.getElementById('errorMessage-email-length').innerText;
    const passwordLengthMessage = document.getElementById('errorMessage-password-length').innerText;
    const emailMessage = document.getElementById('errorMessage-email').innerText;
    const errorsSummaryMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummary);


    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 20)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = fileLengthMessage;
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 20)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = fileLengthMessage;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = emailLengthMessage;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = emailMessage;
    }
    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 8, 20)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = passwordLengthMessage;
    }
    if (!valid) {
        errorsSummary.innerText = errorsSummaryMessage;
    }
    return valid;
}