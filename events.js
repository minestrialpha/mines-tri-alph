/*
    ADD AND EDIT EVENTS IN THIS FILE.

    To create a new event:
    1. Copy one complete event block.
    2. Paste it inside the events array.
    3. Change the information.
    4. Keep the date in YYYY-MM-DD format.

    If registration is not required, use:
    registrationLink: ""
*/


const events = [
    {
        title: "Fall Kickoff",
        date: "2026-08-26",
        time: "Time TBD",
        location: "Room TBD",
        type: "Tri-Alpha Community Event",

        shortDescription:
            "Meet our new officer team, reconnect with the Tri-Alpha community, and hear what we have planned for the fall semester.",

        fullDescription:
            "Join us for Tri-Alpha’s Fall Kickoff! Meet our new officer team, connect with other first-generation students, and learn about the events and opportunities planned for the semester. We will also discuss the upcoming Career Days and ways Tri-Alpha can help you prepare.",

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

        registrationLink: ""
    }
];

/*
    The code below displays the events automatically.
    You normally do not need to edit anything below this line.
*/


function createLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

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

    return `
        <a
            class="button event-register-button"
            href="register.html"
        >
            Register for This Event
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
                    href="contact.html#mailing-list"
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

            <p class="event-details">
                ${formatFullDate(nextEvent.date)}
                · ${nextEvent.time}
                <br>
                ${nextEvent.location}
            </p>

            <p>${nextEvent.shortDescription}</p>

        <div class="event-actions">
    ${createRegistrationButton(nextEvent)}

    <a
        class="text-link"
        href="events.html"
    >
        View All Events →
    </a>
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
                <p class="event-type">${event.type}</p>

                <h3>${event.title}</h3>

                <p class="event-details">
                    ${formatFullDate(event.date)}
                    · ${event.time}
                    <br>
                    ${event.location}
                </p>

                <p>${event.fullDescription}</p>

                ${registrationButton}
            </div>
        </article>
    `;
}


function displayEventsPage() {
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
                <h3>No upcoming events have been announced yet</h3>

                <p>
                    Join our mailing list to receive the next
                    event announcement.
                </p>
            </div>
        `;
    } else {
        upcomingEventsContainer.innerHTML = upcomingEvents
            .map(event => createEventCard(event))
            .join("");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    displayNextEventOnHomePage();
    displayEventsPage();
});