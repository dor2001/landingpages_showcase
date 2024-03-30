document.addEventListener("DOMContentLoaded", function () {
    var menu = document.getElementById("menu");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            // Scrolled down
            menu.classList.add("scrolled");
        } else {
            // At the top
            menu.classList.remove("scrolled");
        }
    });
});


var x = document.getElementById("myLinks");
var icon = document.querySelector(".fa.fa-bars");

icon.addEventListener("click", function () {
    if (x.style.display === "flex") {
        x.style.display = "none";
        icon.classList.remove("fa-solid", "fa-x");
        icon.classList.add("fa-bars");
        if (window.scrollY < 0) {
            // Scrolled down
            menu.classList.remove("scrolled");
        } else {
            menu.classList.add("scrolled");

        }
    } else {
        menu.classList.add("scrolled");
        x.style.display = "flex";
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-solid", "fa-x");
    }
});

var links = document.querySelectorAll("#myLinks a");
links.forEach(function (link) {
    link.addEventListener("click", function () {
        setTimeout(function () {
            x.style.display = "none";
            icon.classList.remove("fa-solid", "fa-x");
            icon.classList.add("fa-bars");
        }, 500);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const letters = document.querySelectorAll(".welcome h1 span");

    letters.forEach(letter => {
        letter.addEventListener("mouseover", function () {
            letter.classList.add("bouncing");
        });

        letter.addEventListener("animationend", function () {
            letter.classList.remove("bouncing");
        });
    });
});


const secText = document.querySelector(".sec-text")

const textLoad = () => {
    setTimeout(() => {
        secText.textContent = "מתכנת"
        secText.style.color = "#fff"
    }, 0)
    setTimeout(() => {
        secText.textContent = "מעצב"
        secText.style.color = "#fff"
    }, 2000)
    setTimeout(() => {
        secText.textContent = "משחק"
        secText.style.color = "#fff"
    }, 4000)
}

textLoad()
setInterval(textLoad, 6000)


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const carousel2 = document.querySelector(".carousel2");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];


        document.getElementById("left-2").addEventListener("click", function () {
            carousel2.scrollLeft -= carousel2.offsetWidth;
        });

        document.getElementById("right-2").addEventListener("click", function () {
            carousel2.scrollLeft += carousel2.offsetWidth;
        });
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
carousel2.classList.add("no-transition");
carousel2.scrollLeft = carousel.offsetWidth;
carousel2.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    carousel2.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    startScrollLeft = carousel2.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    carousel2.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
    carousel2.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    timeoutId = setTimeout(() => carousel2.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel2.addEventListener("mousedown", dragStart);
carousel2.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
carousel2.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);





(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit', function () {
        var check = true;

        if ($(name).val().trim() == '') {
            showValidate(name);
            check = false;
        }

        if ($(subject).val().trim() == '') {
            showValidate(subject);
            check = false;
        }


        if ($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check = false;
        }

        if ($(message).val().trim() == '') {
            showValidate(message);
            check = false;
        }

        return check;
    });


    $('.validate-form .input1').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);




var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');
document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});
document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});
document.addEventListener('mousedown', function () {
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
});
document.addEventListener('mouseup', function () {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
});
a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
})