function validateForm() {
    let valid = true;
    const nameInput = document.getElementById('name');
    const adressInput = document.getElementById('adress');
    const cloackroomInput = document.getElementById('cloackroom');

    const errorName = document.getElementById('errorName');
    const errorAdress = document.getElementById('errorAdress');
    const errorCloackroom = document.getElementById('errorCloackroom');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const fileLengthMessage = document.getElementById('errorMessage-file-length').innerText;
    const cloackroomMessage = document.getElementById('errorMessage-cloackroom').innerText;
    const errorsSummaryMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([nameInput, adressInput, cloackroomInput], [errorName, errorAdress, errorCloackroom], errorsSummary);

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    } else if (!checkTextLengthRange(nameInput.value, 2, 20)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = fileLengthMessage;
    }

    if (!checkRequired(adressInput.value)) {
        valid = false;
        adressInput.classList.add("error-input");
        errorAdress.innerText = reqMessage;
    } else if (!checkTextLengthRange(adressInput.value, 2, 20)) {
        valid = false;
        adressInput.classList.add("error-input");
        errorAdress.innerText = fileLengthMessage;
    }

    if (!checkRequired(cloackroomInput.value)) {
        valid = false;
        cloackroomInput.classList.add("error-input");
        errorCloackroom.innerText = reqMessage;
    } else if (!checkCloackroom(cloackroomInput.value)) {
        valid = false;
        cloackroomInput.classList.add("error-input");
        errorCloackroom.innerText = cloackroomMessage;
    }

    if (!valid) {
        errorsSummary.innerText = errorsSummaryMessage;
    }
    return valid;

}