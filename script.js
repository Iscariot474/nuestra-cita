/* =====================================
   PAGE NAVIGATION
===================================== */

function nextPage(pageNumber) {

    const currentPage =
        document.querySelector(".page.active");

    const nextPage =
        document.getElementById("page" + pageNumber);

    if (!nextPage) {
        return;
    }

    currentPage.classList.remove("active");

    setTimeout(() => {

        nextPage.classList.add("active");

    }, 50);
}


/* =====================================
   NO BUTTON 😂
===================================== */

const noButton =
    document.getElementById("noButton");

const noMessage =
    document.getElementById("noMessage");


let noAttempts = 0;


const messages = [
    "¿Segura? 🥺",
    "¿De verdad? 😭",
    "Piénsalo otra vez...",
    "Ese botón es muy pequeño 😂",
    "¿Quizás mejor YES? ❤️",
    "Casi... 😈",
    "No te voy a dejar tan fácil 😂",
    "Última oportunidad... 🥺❤️"
];


function moveNoButton() {

    noAttempts++;

    const page =
        document.getElementById("page2");

    const pageRect =
        page.getBoundingClientRect();

    const buttonRect =
        noButton.getBoundingClientRect();


    const padding = 25;


    const maxX =
        pageRect.width -
        buttonRect.width -
        padding;


    const maxY =
        pageRect.height -
        buttonRect.height -
        padding;


    const newX =
        Math.max(
            padding,
            Math.random() * maxX
        );


    const newY =
        Math.max(
            padding,
            Math.random() * maxY
        );


    noButton.style.left =
        newX + "px";

    noButton.style.top =
        newY + "px";


    if (noAttempts <= messages.length) {

        noMessage.textContent =
            messages[noAttempts - 1];

    }


    /* Make it smaller every time */

    const scale =
        Math.max(
            0.45,
            1 - (noAttempts * 0.06)
        );

    noButton.style.transform =
        `scale(${scale})`;
}


/* Desktop */

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/* Mobile */

noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    { passive: false }
);


/* =====================================
   DATE FORM
===================================== */

const dateInput =
    document.getElementById("date");


/*
   Don't allow dates in the past.
*/

const today =
    new Date();

const yyyy =
    today.getFullYear();

const mm =
    String(today.getMonth() + 1)
        .padStart(2, "0");

const dd =
    String(today.getDate())
        .padStart(2, "0");


dateInput.min =
    `${yyyy}-${mm}-${dd}`;


/* =====================================
   CONFIRM DATE
===================================== */

function confirmDate() {

    const date =
        dateInput.value;

    const location =
        document
            .getElementById("location")
            .value
            .trim();

    const error =
        document.getElementById("formError");


    /* Validation */

    if (!date) {

        error.textContent =
            "Elige un día para nuestra cita ❤️";

        return;
    }


    if (!location) {

        error.textContent =
            "¿Dónde nos vemos? 📍";

        return;
    }


    error.textContent = "";


    /* Format date */

    const formattedDate =
        formatDate(date);


    /* Put information on page 4 */

    document.getElementById(
        "confirmedDate"
    ).textContent =
        formattedDate;


    document.getElementById(
        "confirmedLocation"
    ).textContent =
        location;


    /* Save locally */

    localStorage.setItem(
        "date",
        date
    );


    localStorage.setItem(
        "location",
        location
    );


    /* Go to confirmation */

    nextPage(4);


    /* Celebration */

    setTimeout(() => {

        createConfetti();

        playCelebrationSound();

    }, 500);
}


/* =====================================
   FORMAT DATE
===================================== */

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T12:00:00"
        );


    return new Intl.DateTimeFormat(
        "es-ES",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(date);
}


/* =====================================
   CONFETTI ❤️
===================================== */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );


    container.innerHTML = "";


    const symbols = [
        "❤️",
        "💕",
        "💖",
        "✨",
        "🎉",
        "🥰"
    ];


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti-piece";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDuration =
            (2.5 + Math.random() * 3) +
            "s";


        piece.style.animationDelay =
            Math.random() * 1.5 +
            "s";


        piece.style.fontSize =
            (14 + Math.random() * 18) +
            "px";


        container.appendChild(piece);
    }
}


/* =====================================
   CELEBRATION SOUND 🎉
===================================== */

function playCelebrationSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        const audioContext =
            new AudioContext();


        const notes = [
            523.25,
            659.25,
            783.99,
            1046.50
        ];


        notes.forEach(
            (frequency, index) => {

                const oscillator =
                    audioContext.createOscillator();

                const gain =
                    audioContext.createGain();


                oscillator.type =
                    "sine";


                oscillator.frequency.value =
                    frequency;


                oscillator.connect(gain);

                gain.connect(
                    audioContext.destination
                );


                const startTime =
                    audioContext.currentTime +
                    index * 0.13;


                gain.gain.setValueAtTime(
                    0,
                    startTime
                );


                gain.gain.linearRampToValueAtTime(
                    0.18,
                    startTime + 0.03
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.001,
                    startTime + 0.55
                );


                oscillator.start(
                    startTime
                );


                oscillator.stop(
                    startTime + 0.6
                );

            }
        );

    } catch (error) {

        console.log(
            "Celebration sound unavailable."
        );

    }
}


/* =====================================
   SHARE 💌
===================================== */

function shareDate() {

    const date =
        document.getElementById(
            "confirmedDate"
        ).textContent;


    const location =
        document.getElementById(
            "confirmedLocation"
        ).textContent;


    const message =
`🎉 ¡TENEMOS UNA CITA! ❤️

📅 Date: ${date}

📍 Location: ${location}

❤️ Dress code:
Just come as you are.

Officially a date. 🥰❤️`;


    if (
        navigator.share
    ) {

        navigator.share({

            title:
                "¡Tenemos una cita! ❤️",

            text:
                message,

            url:
                window.location.href

        }).catch(() => {});

    } else {

        navigator.clipboard
            .writeText(message)
            .then(() => {

                alert(
                    "¡Confirmación copiada! ❤️"
                );

            });

    }
}
