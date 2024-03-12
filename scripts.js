window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.navbar a');
    const scrollPos = window.scrollY;

    sections.forEach(function(section) {
        var top = section.offsetTop - 500;
        var id = section.getAttribute('id');
        var activeLink = document.querySelector('.navbar a[href="#' + id + '"]');

        if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
            navLinks.forEach(function(link) {
                link.classList.remove('active1');
            });
            activeLink.classList.add('active1');
        }
    });

    var header = document.querySelector('.header');
    var menu = this.document.querySelector('.menuToggle');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1000)
    {
        header.style.padding = '3vw 4vw 3vw 3vw';
        menu.style.padding = '0vw 5vw 0 5vw';
    }
    else
    {
        if (scrollPos > 500)
        {
            header.style.padding = '0.7vw 1.4vh 0.7vw 0.7vh';
        }
        else
        {
            header.style.padding = '2vw 4vh 2vw 2vh';
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.querySelector('.menuToggle');
    var navbar = document.querySelector('.navbar');
    var menuIcon = document.querySelector('.menuIcon');
    var exitButton = document.querySelector('.exitButton');

    menuIcon.style.display = "block";

    menuToggle.addEventListener('click', function () {
        navbar.classList.toggle('collapsed');
        if (navbar.classList.contains('collapsed')) {
            menuIcon.style.display = 'none';
            exitButton.style.display = 'inline-block';
        } else {
            menuIcon.style.display = 'inline-block';
            exitButton.style.display = 'none';
        }
    });

    document.body.addEventListener('click', function (event) {
        if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
            navbar.classList.remove('collapsed');
            menuIcon.style.display = 'inline-block';
            exitButton.style.display = 'none';
        }
    });
});

var scrollToTopBtn = document.getElementById("scrollToTop");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "flex";
}

function toggleContent(element) 
{
    var content = $(element).closest('.container').find('.expContent');
    content.stop().slideToggle(750);
    $(element).toggleClass('expanded');
}

function toggleContent_Portfolio(element) 
{
    var content = $(element).closest('.container_Portfolio').find('.expContent_Portfolio');
    content.stop().slideToggle(750);
    $(element).toggleClass('expanded');
}


function toggleContent_About(element) {
    var content = $(element).closest('.container_about').find('.expContent');
    var button = $(element).closest('.container_about').find('.button1');

    content.stop().slideToggle(500);
    $(element).toggleClass('expanded');

    if ($(element).hasClass('expanded')) {
        button.text("Show Less");
    } else {
        button.text("Read More");
    }
}

function copyText(text) 
{
	navigator.clipboard.writeText(text).then(function() {alert('Text copied to clipboard: ' + text);}, function(err) {console.error('Unable to copy text: ', err);});
}

function animateAboutSection() {
    var aboutSection = document.getElementById("about");
    var aboutContent = document.querySelector(".aboutContent");
    var educationSection = document.getElementById("education");
    var portfolioSection = document.getElementById("portfolio");
    var portfolioContent = document.querySelector(".portfolioContent");
    var contactSection = document.getElementById("contact");
    var contactContent = document.querySelector(".contactContent");
    var mathSection = document.getElementById("mathematics");
    var mathContent = document.querySelector(".mathematicsContent");

    var educationOffsetTop = educationSection.offsetTop;
    var aboutOffsetTop = aboutSection.offsetTop;
    var portfolioOffSetTop = portfolioSection.offsetTop;
    var contactOffSetTop = contactSection.offsetTop;
    var mathOffSetTop = mathSection.offsetTop;

    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY;

    var check = scrollY + windowHeight - 500;

    if (check > aboutOffsetTop) 
    {
        aboutContent.classList.add("show");
    }

    if (check > educationOffsetTop)
    {
        educationSection.classList.add("show");
    }

    if (check > portfolioOffSetTop)
    {
        portfolioContent.classList.add("show");
    }

    if (check > mathOffSetTop)
    {
        mathContent.classList.add("show");
    }

    if (check > contactOffSetTop)
    {
        contactContent.classList.add("show");
    }
}

window.addEventListener("scroll", animateAboutSection);

var clicked = false;

function scrollDown(x) 
{
    if (clicked == false)
    {
        window.scrollBy({top: x, behavior: 'smooth'});
        clicked = true;
        var i = document.querySelector(".scrollPrompt");
        i.classList.add("hidden");
    }
}
