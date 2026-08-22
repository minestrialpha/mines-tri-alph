const registrationForm = document.getElementById(
    "registration-form"
);

const registrationResponse = document.getElementById(
    "registration-response"
);

const registrationSuccess = document.getElementById(
    "registration-success"
);

const registrationEventTitle = document.getElementById(
    "registration-event-title"
);

const registrationEventDate = document.getElementById(
    "registration-event-date"
);

const registrationEventTime = document.getElementById(
    "registration-event-time"
);

const registrationEventLocation = document.getElementById(
    "registration-event-location"
);

const registrationEventDescription = document.getElementById(
    "registration-event-description"
);

const registrationEventInformation = document.getElementById(
    "registration-event-information"
);

const registrationEventImageLink = document.getElementById(
    "registration-event-image-link"
);

const registrationEventImage = document.getElementById(
    "registration-event-image"
);


const eventTitleInput = document.getElementById(
    "event-title-input"
);

const eventDateInput = document.getElementById(
    "event-date-input"
);

const eventTimeInput = document.getElementById(
    "event-time-input"
);

const eventLocationInput = document.getElementById(
    "event-location-input"
);


function getOpenRegistrationEvent() {
    return getUpcomingEvents().find(
        event => event.registrationLink === "open"
    );
}


function displayRegistrationEvent() {
    const event = getOpenRegistrationEvent();

    if (!event) {
        registrationEventTitle.textContent =
            "Registration is currently closed";

        registrationEventInformation.hidden = true;

        registrationEventDescription.textContent =
            "Please check our Events page for upcoming opportunities.";

        registrationEventImageLink.hidden = true;
        registrationForm.hidden = true;

        return;
    }

    const formattedDate = formatFullDate(event.date);

    registrationEventTitle.textContent = event.title;
    registrationEventDate.textContent = formattedDate;
    registrationEventTime.textContent = event.time;
    registrationEventLocation.textContent = event.location;

    registrationEventDescription.textContent =
        event.fullDescription || event.shortDescription;


    if (event.image) {
        const imageUrl = getSiteUrl(event.image);

        registrationEventImage.addEventListener(
            "error",
            () => {
                registrationEventImageLink.hidden = true;
            }
        );

        registrationEventImage.src = imageUrl;
        registrationEventImage.alt =
            `${event.title} event poster`;

        registrationEventImageLink.href = imageUrl;
        registrationEventImageLink.hidden = false;
    } else {
        registrationEventImageLink.hidden = true;
    }


    eventTitleInput.value = event.title;
    eventDateInput.value = formattedDate;
    eventTimeInput.value = event.time;
    eventLocationInput.value = event.location;
}


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


displayRegistrationEvent();
