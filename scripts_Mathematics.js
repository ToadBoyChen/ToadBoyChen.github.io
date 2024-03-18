function toggleContent(element) 
{
    var content = $(element).closest('.container-pdf').find('.expContent');
    content.stop().slideToggle(750);
    $(element).toggleClass('expanded');
}


const scrollPos = window.scrollY;
var header = document.querySelector('.header');
var menu = this.document.querySelector('.menuToggle');

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

if (screenHeight <= 500)
{
    header.style.padding = '4vh 2vh 4vh 1vh';
    menu.style.padding = '0vw 8vw 0 1vw';
}
else if (screenWidth <= 1000)
{
    header.style.padding = '3vw 4vw 3vw 3vw';
    menu.style.padding = '1vw 5vw 1 5vw';
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

window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    var menu = this.document.querySelector('.menuToggle');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenHeight <= 500)
    {
        header.style.padding = '4vh 2vh 4vh 1vh';
        menu.style.padding = '0vw 8vw 0 1vw';
    }
    else if (screenWidth <= 1000)
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