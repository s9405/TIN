function validateForm() {
    let valid = true;
    const nameInput = document.getElementById('name');
    const adressInput = document.getElementById('adress');
    const cloackroomInput = document.getElementById('cloackroom');

    const errorName = document.getElementById('errorName');
    const errorAdress = document.getElementById('errorAdress');
    const errorCloackroom = document.getElementById('errorCloackroom');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nameInput, adressInput, cloackroomInput], [errorName, errorAdress, errorCloackroom], errorsSummary);

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 20)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(adressInput.value)) {
        valid = false;
        adressInput.classList.add("error-input");
        errorAdress.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(adressInput.value, 2, 20)) {
        valid = false;
        adressInput.classList.add("error-input");
        errorAdress.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(cloackroomInput.value)) {
        valid = false;
        cloackroomInput.classList.add("error-input");
        errorCloackroom.innerText = "Pole jest wymagane";
    } else if (!checkCloackroom(cloackroomInput.value)) {
        valid = false;
        cloackroomInput.classList.add("error-input");
        errorCloackroom.innerText = "Pole powinno zawierać TAK lub NIE";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;

}