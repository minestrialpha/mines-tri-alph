const contactForm = document.getElementById("contact-form");

const contactResponse = document.getElementById(
    "contact-response"
);

const contactSuccess = document.getElementById(
    "contact-success"
);

let contactWasSubmitted = false;


contactForm.addEventListener("submit", () => {
    contactWasSubmitted = true;

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
});


contactResponse.addEventListener("load", () => {
    if (!contactWasSubmitted) {
        return;
    }

    contactForm.hidden = true;
    contactSuccess.hidden = false;

    contactSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});