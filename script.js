/* =====================================
   PAGE NAVIGATION
===================================== */

function nextPage(pageNumber) {

    const currentPage =
        document.querySelector(".page.active");

    const targetPage =
        document.getElementById(
            "page" + pageNumber
        );


    if (!targetPage) {

        console.error(
            "Page not found:",
            pageNumber
        );

        return;
    }


    if (currentPage) {
        currentPage.classList.remove("active");
    }


    targetPage.classList.add("active");


    /*
       Scroll back to the top just in case
       the browser has moved the viewport.
    */

    window.scrollTo(0, 0);
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
    "Ese botón no funciona 😂",
    "¿Quizás mejor YES? ❤️",
    "Casi... 😈",
    "No te voy a dejar tan fácil 😂",
    "¡Vamos, di que sí! 🥺❤️"
];


function moveNoButton(event) {

    if (event) {
        event.preventDefault();
    }

    noAttempts++;


    /*
       Change the button to fixed positioning
       the first time she tries to click it.
    */

    noButton.classList.add("running");


    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    const padding = 20;


    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;


    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;


    const newX =
        padding +
        Math.random() *
        Math.max(1, maxX - padding);


    const newY =
        padding +
        Math.random() *
        Math.max(1, maxY - padding);


    noButton.style.left =
        newX + "px";

    noButton.style.top =
        newY + "px";


    /*
       Change the message.
    */

    const messageIndex =
        Math.min(
            noAttempts - 1,
            messages.length - 1
        );


    noMessage.textContent =
        messages[messageIndex];


    /*
       Make NO progressively smaller.
    */

    const scale =
        Math.max(
            0.45,
            1 - noAttempts * 0.06
        );


    noButton.style.transform =
        `scale(${scale})`;
}


/*
   Desktop:
   move when mouse gets close.
*/

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/*
   Mobile:
   move when she touches it.
*/

noButton.addEventListener(
    "touchstart",
    moveNoButton,
    {
        passive: false
    }
);


/*
   Also prevent an actual click.
*/

noButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveNoButton(event);

    }
);


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

    const dateInput =
        document.getElementById("date");

    const locationInput =
        document.getElementById("location");

    const error =
        document.getElementById("formError");


    const date =
        dateInput.value;

    const location =
        locationInput.value.trim();


    /*
       Validate date
    */

    if (!date) {

        error.textContent =
            "Elige un día para nuestra cita ❤️";

        dateInput.focus();

        return;
    }


    /*
       Validate location
    */

    if (!location) {

        error.textContent =
            "¿Dónde nos vemos? 📍";

        locationInput.focus();

        return;
    }


    /*
       Everything is valid
    */

    error.textContent = "";


    /*
       Format date
    */

    const formattedDate =
        formatDate(date);


    /*
       Put the selected information
       onto Page 4.
    */

    document.getElementById(
        "confirmedDate"
    ).textContent =
        formattedDate;


    document.getElementById(
        "confirmedLocation"
    ).textContent =
        location;


    /*
       Save locally.
    */

    localStorage.setItem(
        "date",
        date
    );

    localStorage.setItem(
        "location",
        location
    );


    /*
       GO TO PAGE 4 ❤️
    */

    nextPage(4);


    /*
       Start celebration shortly
       after the page appears.
    */

    setTimeout(
        function () {

            createConfetti();

            playCelebrationSound();

        },
        300
    );
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
