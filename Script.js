var scrollPrompts = {'Welcome': $('.scrollPromptWelcome'),'About': $('.scrollPromptAbout')};
var flyContainers = $('.flyContainer0, .flyContainer1, .flyContainer2');
var textBubbles = $('.textBubble');
var UsrPos = "Welcome";
var bubbleInfoVisible = false;
var infoShown = false;
const screenWidth  = window.screen.width;
const screenHeight = window.screen.height;
let bubbles;



window.onload = function() 
{
    const bubbles = document.querySelectorAll('.bubbles');

    const conWidth = 1700;
    const conHeight = 1200;

    function getRandomPosition() 
    {
        let x, y;
        
        do 
        {
            x = Math.random() * conWidth;
            y = Math.random() * conHeight;
        } 

        while (x < 0 || x > conWidth || y < 0 || y > conHeight);

        return { x, y };
    }

    function move(bubble) 
    {
        let speedx = 2.0;
        let speedy = 2.0;

        let { x, y } = getRandomPosition();

        bubble.style.transition = 'left 2s, top 2s';
        bubble.style.left = x + 'px';
        bubble.style.top = y + 'px';

        function animate() 
        {
            const currentX = parseFloat(bubble.style.left) || x;
            const currentY = parseFloat(bubble.style.top) || y;

            let newX = currentX + speedx;
            let newY = currentY + speedy;

            if (newX <= 0 || newX >= conWidth - bubble.clientWidth) 
            {
                speedx = -speedx;
                newX = Math.max(0, Math.min(conWidth - bubble.clientWidth, newX));
            }

            if (newY <= 0 || newY >= conHeight - bubble.clientHeight) 
            {
                speedy = -speedy;
                newY = Math.max(0, Math.min(conHeight - bubble.clientHeight, newY));
            }

            bubble.style.left = newX + 'px';
            bubble.style.top = newY + 'px';

            requestAnimationFrame(animate);
        }

        animate();
    }

    setTimeout
        (
            function() 
            {
                bubbles.forEach(move);
            }, 100
        );
};

function highlightText(containerID) 
{
    const container = document.querySelector(`#${containerID}`);
    let toHighlight = [];

    switch (containerID) 
    {
        case 'highlighter0':
            toHighlight = ['Mathematics enthusiast', 'personal resume', 'proficiency in computer science', 'personal interest', 'cyber security', 'web development', 'Thank you for visiting'];
            break;
        case 'highlighter1':
            toHighlight = ['first-year Mathematics student', 'national-level kickboxer', 'longtime programmer', 'genuine passion for programming', 'enthusiastic mathematician'];
            break;
        case 'highlighter2':
            toHighlight = ['receive regular updates', 'mathematical database', 'front-end programmer and designer', 'engaging interface'];
            break;
        case 'highlighter3':
            toHighlight = ['strong foundation in Programming', 'Cryptography', 'contribute actively', 'experience in the field'];
            break;
        case 'highlighter4':
            toHighlight = ['broaden my horizon', 'cyber security specialist', 'continuous optimistic outlook', 'cyber security specialist', 'competing in boxing', 'approachable character', 'work alone or in groups']
            break;
        default:
            toHighlight = [];
            break;
    }

    toHighlight.forEach
    (   
        word => 
        {
            const regex = new RegExp(`\\b${word}\\b`);
            container.innerHTML = container.innerHTML.replace(regex, `<span class="highlighted">${word}</span>`);
        }
    );
}

function resetText(containerId) 
{
    const container = document.getElementById(containerId);

    container.querySelectorAll('.highlighted').forEach
    (
        span => 
        {
            span.classList.add('resetting');
            span.addEventListener
            (
                'animationend', function () 
                    {
                        span.parentNode.replaceChild(document.createTextNode(span.textContent), span);
                    }
            );
        }
    );
}

function calculateContainerSize() 
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

function showTextBubble(id)
 {
    $('#' + id).css({ display: "block", animation: "flyIn 1s forwards" });
}

function hideTextBubble(id) 
{
    $('#' + id).css({ animation: "flyOut 1s forwards" });
}

function expandHeader(id, element) 
{
    $('#' + id).css({ display: "block", animation: "flyIn 1s forwards" });

    var content = $(element).closest('.aboutContainer').find('.expContent');
    content.stop().slideToggle(500);
    $(element).toggleClass('expanded');
}

function collapseHeader(id, element) 
{
    $('#' + id).css({ animation: "flyOut 1s forwards" });

    var content = $(element).closest('.aboutContainer').find('.expContent');
    content.stop().slideToggle(500);
    $(element).toggleClass('expanded');
}

$(document).ready
(
    function() 
    {
        calculateContainerSize();

        flyContainers.css({ 'opacity': '1', 'visibility': 'visible' });
        flyContainers.animate({ 'margin-bottom': '10vh' }, 1000);
        textBubbles.css('display', 'none');

        const yOffset = window.scrollY;

        $(window).on
        (
            'scroll', function() 
            {
                $('.background0').css('background-position-y', -yOffset * 0.1 + 'px');

                const scrollPos = $(this).scrollTop();
                const fadeStart = 0.5 * windowHeight;

                if (UsrPos === "Welcome") 
                {
                    if (scrollPos >= fadeStart) 
                    {
                        scrollPrompts['Welcome'].fadeOut(10);
                        $('.gotoButtonWelcome').css({ 'visibility': 'visible', 'opacity': '1' }).animate({ 'opacity': '1' }, 10);
                    } 
                    else 
                    {
                        scrollPrompts['Welcome'].fadeIn(10);
                        $('.gotoButtonWelcome').css({ 'visibility': 'hidden', 'opacity': '0' }).animate({ 'opacity': '0' }, 10);
                    }
                } 
                else if (UsrPos === "About") 
                {
                    if (infoShown == false)
                    {
                        if (scrollPos >= fadeStart * 2) 
                        {
                            $('.infoBox').css({ 'visibility': 'visible', 'opacity': '1' });
                            infoShown = true;
                        } 
                        else 
                        {
                            $('.infoBox').css({ 'visibility': 'hidden', 'opacity': '0' });
                        }
                    }

                    if (scrollPos >= fadeStart * 2) 
                    {
                        scrollPrompts['About'].fadeOut(10);
                        $('.gotoButtonAbout').css({ 'visibility': 'visible', 'opacity': '1' }).animate({ 'opacity': '1' }, 10);
                    } 
                    else 
                    {
                        scrollPrompts['About'].fadeIn(10);
                        $('.gotoButtonAbout').css({ 'visibility': 'hidden', 'opacity': '0' }).animate({ 'opacity': '0' }, 10);
                    }
                } 
                else 
                {
                    $('.gotoButtonContact').css({ 'visibility': 'visible', 'opacity': '1' }).animate({ 'opacity': '1' }, 10);
                }
            }
        );
    }
);

function hideInfoBox() 
{
    $('.infoBox').css({ 'visibility': 'hidden', 'opacity': '0' });
}

function scrollDown(x) 
{
    window.scrollBy({top: x, behavior: 'smooth'});
}

function showInfo(bubble) 
{
    const bubbleInfo = document.getElementById('bubbleInfo');
    const closeButton = document.getElementById('closeButton');
    const info = getBubbleInformation(bubble.textContent);
    bubbleInfo.textContent = info;
    bubbleInfo.style.position = 'absolute';
    bubbleInfo.style.left = '-100%';
    bubbleInfo.style.display = 'block';
    closeButton.style.display = 'inline';
    bubbleInfo.style.left = '50%';
}

function hideInfo() 
{
    const bubbleInfo = document.getElementById('bubbleInfo');
    const closeButton = document.getElementById('closeButton');
    bubbleInfo.style.animation = 'flyOut 0.5s forwards';
    closeButton.style.animation = 'fadeOut 0.5s forwards';
	
    function onAnimationEnd() 
	{
        bubbleInfo.style.display = 'none';
        closeButton.style.display = 'none';
        bubbleInfo.removeEventListener('animationend', onAnimationEnd);
        closeButton.removeEventListener('animationend', onAnimationEnd);
        bubbleInfo.style.animation = '';
        closeButton.style.animation = '';
    }
	
    bubbleInfo.addEventListener('animationend', onAnimationEnd);
    closeButton.addEventListener('animationend', onAnimationEnd);

    bubbleInfoVisible = false;
}

function getBubbleInformation(bubbleText) 
{
    const bubbleInfoMap = 
    {
        'Punctuality': 'Ability to consistently arrive ahead of scheduled events or shifts, meet deadlines, and communicate effectively in case of timing issues.',
        'Leadership': 'Led a team at Heriot-Watt University through a graded academic discussion on an academic paper.',
        'Encryption': 'Extensive study and practical understanding of common encryption algorithms like RSA, hands-on experience with openssl and key exchange methods.',
        'Public Speaking': 'Presented both as part of a group and individually at Heriot-Watt University.',
        'Mathematics': 'Current undergraduate in Mathematics, driven by a continuous passion for learning.',
        'Fundraising': 'Successfully organized a fundraising project in school to raise funds for "African Adventures".',
        'Programming': 'Personal interest and commitment to coding during free time.',
        'Problem Solving': 'Equipped with problem-solving tools through ongoing studies in Mathematics.',
        'Team Work': 'Collaborative experiences in teams across college, Herriot Watt University, and school.',
    };

    return bubbleInfoMap[bubbleText] || '';
}

function showSection(sectionId) 
{
    var section = $('#' + sectionId);

    if (section.css('display') !== 'none') 
    {

    } 
    else 
    {
        $('section').hide();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        section.css('opacity', 0).slideDown(1000).animate({ opacity: 1 }, { queue: false, duration: 'slow' });
        UsrPos = sectionId;
    }
}

function toggleContent(element) 
{
    hideInfoBox();
    var content = $(element).closest('.hoverContainer').find('.expContent');
    content.stop().slideToggle(350);
    $(element).toggleClass('expanded');
}

function copyText(text) 
{
	navigator.clipboard.writeText(text).then(function() {alert('Text copied to clipboard: ' + text);}, function(err) {console.error('Unable to copy text: ', err);});
}