const registrationForm = document.getElementById(
    "registration-form"
);

const registrationResponse = document.getElementById(
    "registration-response"
);

const registrationSuccess = document.getElementById(
    "registration-success"
);

let registrationWasSubmitted = false;


registrationForm.addEventListener("submit", () => {
    registrationWasSubmitted = true;

    const submitButton = registrationForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Registering...";
});


registrationResponse.addEventListener("load", () => {
    if (!registrationWasSubmitted) {
        return;
    }

    registrationForm.hidden = true;
    registrationSuccess.hidden = false;

    registrationSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});