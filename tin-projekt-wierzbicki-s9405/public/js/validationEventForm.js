function validateForm() {
    let valid = true;
    const playerInput = document.getElementById('player');
    const playingFieldInput = document.getElementById('playingField');
    const beginTimeInput = document.getElementById('beginTime');
    const endTimeInput = document.getElementById('endTime');
    const MaxNumberOfPlayerInput = document.getElementById('MaxNumberOfPlayer');

    const errorPlayer = document.getElementById('errorPlayer');
    const errorPlayingField = document.getElementById('errorPlayingField');
    const errorBeginTime = document.getElementById('errorBeginTime');
    const errorEndTime = document.getElementById('errorEndTime');
    const errorMaxNumberOfPlayer = document.getElementById('errorMaxNumberOfPlayer');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([playerInput, playingFieldInput, beginTimeInput, endTimeInput, MaxNumberOfPlayerInput],
        [errorPlayer, errorPlayingField, errorBeginTime, errorEndTime, errorMaxNumberOfPlayer], errorsSummary);

    if (!checkRequired(playerInput.value)) {
        valid = false;
        playerInput.classList.add("error-input");
        errorPlayer.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(playingFieldInput.value)) {
        valid = false;
        playingFieldInput.classList.add("error-input");
        errorPlayingField.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(MaxNumberOfPlayerInput.value)) {
        valid = false;
        MaxNumberOfPlayerInput.classList.add("error-input");
        errorMaxNumberOfPlayer.innerText = "Pole jest wymagane";
    } else if (!checkNumber(MaxNumberOfPlayerInput.value)) {
        valid = false;
        MaxNumberOfPlayerInput.classList.add("error-input");
        errorMaxNumberOfPlayer.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(MaxNumberOfPlayerInput.value, 1, 10)) {
        valid = false;
        MaxNumberOfPlayerInput.classList.add("error-input");
        errorMaxNumberOfPlayer.innerText = "Pole powinno być liczbą w zakresie od 2 do 10";
    }

    if (!checkRequired(beginTimeInput.value)) {
        valid = false;
        beginTimeInput.classList.add("error-input");
        errorBeginTime.innerText = "Pole jest wymagane";
    }
    else if (!checkRequired(endTimeInput.value)) {
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = "Pole jest wymagane";

    } else if (!checkDateIfAfter(endTimeInput.value, beginTimeInput.value)) {
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = "Data do powinna być późniejsza niż data początku";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}