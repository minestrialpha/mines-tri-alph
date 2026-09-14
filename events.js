/*
    ADD AND EDIT EVENTS IN THIS FILE.

    To create a new event:
    1. Copy one complete event block.
    2. Paste it inside the events array.
    3. Change the information.
    4. Keep the date in YYYY-MM-DD format.

    If registration is not required, use:
    registrationLink: ""

    If an event does not have an image, use:
    image: ""
*/


const events = [
    {
        title: "Social Study",
        date: "2026-09-22",
        time: "4-6 PM",
        location: "EB 240",
        type: "Tri-Alpha Social & Tutoring Event",

        shortDescription:
            "Bring your homework, study with other students, and get help from current and former TAs. All Mines students are welcome!",

        fullDescription:
            "Join Tri-Alpha for a relaxed study session with peer tutoring from current and former TAs. Help will be available for ME 261, 315, 324, 441, and 471; CSCI 128, 200, 210, 220, 306, and 406; EBGN 321; Calculus I–III; Differential Equations; Linear Algebra; Probability; and more. All Mines students are welcome!",

        image: "image/SocialStudySep22.png",

        registrationLink: "open"
    },

    {
        title: "Study Social",
        date: "2026-09-22",
        time: "Time TBD",
        location: "Location TBD",
        type: "Tri-Alpha Social Event",

        shortDescription:
            "Take a break, meet other first-generation students, and get some studying done in a relaxed environment. Tentative date — stay tuned!",

        fullDescription:
            "Join Tri-Alpha for a relaxed study social where you can work alongside other first-generation students, meet new people, and take a break from studying on your own. September 22 is a tentative date, so stay tuned for confirmed details.",

        image: "",

        registrationLink: ""
    }
];


/*
    The code below displays the events automatically.
    You normally do not need to edit anything below this line.
*/


function getSiteRoot() {
    const eventsScript = document.querySelector(
        'script[src$="events.js"]'
    );

    if (!eventsScript) {
        return new URL("./", window.location.href);
    }

    return new URL("./", eventsScript.src);
}


function getSiteUrl(path) {
    return new URL(path, getSiteRoot()).href;
}


function createLocalDate(dateString) {
    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    return new Date(year, month - 1, day);
}


function formatFullDate(dateString) {
    const date = createLocalDate(dateString);

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}


function formatShortMonth(dateString) {
    const date = createLocalDate(dateString);

    return date
        .toLocaleDateString("en-US", {
            month: "short"
        })
        .toUpperCase();
}


function getDayNumber(dateString) {
    return createLocalDate(dateString).getDate();
}


function getStartOfToday() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return today;
}


function sortEventsByDate(eventList) {
    return [...eventList].sort(
        (firstEvent, secondEvent) =>
            createLocalDate(firstEvent.date) -
            createLocalDate(secondEvent.date)
    );
}


function getUpcomingEvents() {
    const today = getStartOfToday();

    return sortEventsByDate(events).filter(
        event => createLocalDate(event.date) >= today
    );
}


function getPastEvents() {
    const today = getStartOfToday();

    return sortEventsByDate(events)
        .filter(event => createLocalDate(event.date) < today)
        .reverse();
}


function createRegistrationButton(event) {
    if (!event.registrationLink) {
        return "";
    }

    const registrationUrl =
        event.registrationLink === "open"
            ? getSiteUrl("events/register/")
            : event.registrationLink;

    return `
        <a
            class="button event-register-button"
            href="${registrationUrl}"
        >
            Register for This Event
        </a>
    `;
}


function createEventImage(event) {
    if (!event.image) {
        return "";
    }

    const imageUrl = getSiteUrl(event.image);

    return `
        <a
            class="event-image-link"
            href="${imageUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open ${event.title} poster"
        >
            <img
                class="event-image-thumbnail"
                src="${imageUrl}"
                alt="${event.title} event poster"
                loading="lazy"
            >
        </a>
    `;
}


function displayNextEventOnHomePage() {
    const nextEventContainer = document.getElementById(
        "next-event-container"
    );

    if (!nextEventContainer) {
        return;
    }

    const upcomingEvents = getUpcomingEvents();

    if (upcomingEvents.length === 0) {
        nextEventContainer.innerHTML = `
            <div class="no-events-message">

                <h3>More events are coming soon</h3>

                <p>
                    Join our mailing list to receive announcements
                    about future Tri-Alpha events.
                </p>

                <a
                    class="text-link"
                    href="${getSiteUrl("contact/#mailing-list")}"
                >
                    Join Our Mailing List →
                </a>

            </div>
        `;

        return;
    }

    const nextEvent = upcomingEvents[0];

    nextEventContainer.innerHTML = `
        <div class="event-date">

            <span class="event-month">
                ${formatShortMonth(nextEvent.date)}
            </span>

            <span class="event-day">
                ${getDayNumber(nextEvent.date)}
            </span>

        </div>


        <div class="event-information">

            <p class="event-type">
                ${nextEvent.type}
            </p>

            <h3>${nextEvent.title}</h3>

            ${createEventImage(nextEvent)}

            <p class="event-details">
                ${formatFullDate(nextEvent.date)}
                · ${nextEvent.time}
                <br>
                ${nextEvent.location}
            </p>

            <p>
                ${nextEvent.shortDescription}
            </p>


            <div class="event-actions">

                ${createRegistrationButton(nextEvent)}

                <a
                    class="text-link"
                    href="${getSiteUrl("events/")}"
                >
                    View All Events →
                </a>

            </div>

        </div>
    `;
}


function createEventCard(event, isPastEvent = false) {
    const registrationButton = isPastEvent
        ? ""
        : createRegistrationButton(event);

    return `
        <article class="full-event-card">

            <div class="event-date">

                <span class="event-month">
                    ${formatShortMonth(event.date)}
                </span>

                <span class="event-day">
                    ${getDayNumber(event.date)}
                </span>

            </div>


            <div class="event-information">

                <p class="event-type">
                    ${event.type}
                </p>

                <h3>${event.title}</h3>

                ${createEventImage(event)}

                <p class="event-details">
                    ${formatFullDate(event.date)}
                    · ${event.time}
                    <br>
                    ${event.location}
                </p>

                <p>
                    ${event.fullDescription}
                </p>

                ${registrationButton}

            </div>

        </article>
    `;
}


function displayUpcomingEvents() {
    const upcomingEventsContainer = document.getElementById(
        "upcoming-events"
    );

    if (!upcomingEventsContainer) {
        return;
    }

    const upcomingEvents = getUpcomingEvents();

    if (upcomingEvents.length === 0) {
        upcomingEventsContainer.innerHTML = `
            <div class="no-events-message">

                <h3>
                    No upcoming events have been announced yet
                </h3>

                <p>
                    Join our mailing list to receive the next
                    event announcement.
                </p>

                <a
                    class="text-link"
                    href="${getSiteUrl("contact/#mailing-list")}"
                >
                    Join Our Mailing List →
                </a>

            </div>
        `;

        return;
    }

    upcomingEventsContainer.innerHTML = upcomingEvents
        .map(event => createEventCard(event))
        .join("");
}


function displayPastEvents() {
    const pastEventsContainer = document.getElementById(
        "past-events-container"
    );

    if (!pastEventsContainer) {
        return;
    }

    const pastEvents = getPastEvents();

    if (pastEvents.length === 0) {
        pastEventsContainer.innerHTML = `
            <div class="no-events-message">

                <h3>No past events to display yet</h3>

                <p>
                    Event information will appear here after
                    the event date has passed.
                </p>

            </div>
        `;

        return;
    }

    pastEventsContainer.innerHTML = pastEvents
        .map(event => createEventCard(event, true))
        .join("");
}


document.addEventListener("DOMContentLoaded", () => {
    displayNextEventOnHomePage();
    displayUpcomingEvents();
    displayPastEvents();
});
