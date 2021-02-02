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

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const numberMessage = document.getElementById('errorMessage-number').innerText;
    const numberRangeMessage = document.getElementById('errorMessage-number-range').innerText;
    const endTimeMessage = document.getElementById('errorMessage-end-time').innerText
    const errorsSummaryMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([playerInput, playingFieldInput, beginTimeInput, endTimeInput, MaxNumberOfPlayerInput],
        [errorPlayer, errorPlayingField, errorBeginTime, errorEndTime, errorMaxNumberOfPlayer], errorsSummary);

    if (!checkRequired(playerInput.value)) {
        valid = false;
        playerInput.classList.add("error-input");
        errorPlayer.innerText = reqMessage;
    }

    if (!checkRequired(playingFieldInput.value)) {
        valid = false;
        playingFieldInput.classList.add("error-input");
        errorPlayingField.innerText = reqMessage;
    }

    if (!checkRequired(MaxNumberOfPlayerInput.value)) {
        valid = false;
        MaxNumberOfPlayerInput.classList.add("error-input");
        errorMaxNumberOfPlayer.innerText = reqMessage;
    } else if (!checkNumber(MaxNumberOfPlayerInput.value)) {
        valid = false;
        MaxNumberOfPlayerInput.classList.add("error-input");
        errorMaxNumberOfPlayer.innerText = numberMessage; 
    } else if (!checkNumberRange(MaxNumberOfPlayerInput.value, 1, 10)) {
        valid = false;
        MaxNumberOfPlayerInput.classList.add("error-input");
        errorMaxNumberOfPlayer.innerText = numberRangeMessage;
    }

    if (!checkRequired(beginTimeInput.value)) {
        valid = false;
        beginTimeInput.classList.add("error-input");
        errorBeginTime.innerText = reqMessage;
    }
    else if (!checkRequired(endTimeInput.value)) {
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = reqMessage;

    } else if (!checkDateIfAfter(endTimeInput.value, beginTimeInput.value)) {
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = endTimeMessage;
    }

    if (!valid) {
        errorsSummary.innerText = errorsSummaryMessage;
    }
    return valid;
}