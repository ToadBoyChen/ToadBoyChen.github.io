$(document).ready(function(){
    $('section').each(function(index) {
        if (index !== 0 && !$(this).hasClass('title-animation')) {
            $(this).hide();
        }
    });
    $('ul.navbar-nav li').click(function(){
        // Show loading overlay
        $('#loading-overlay').slideDown(300);
        
        // Remove active class from all navigation items
        $('ul.navbar-nav li').removeClass('active');
        // Add active class to the clicked navigation item
        $(this).addClass('active');
        
        // Hide all sections
        $('section').hide();
        
        // Get the target section
        var targetSection = $(this).find('a').attr('href');
        
        // Show the target section after a delay (for demonstration)
        setTimeout(function() {
            // Hide loading overlay
            $('#loading-overlay').slideUp(1000);
            
            // Slide in the target section
            $(targetSection).slideDown(300);
        }, 1000); // Adjust the delay as needed
    });

    $('.navbar-brand').click(function(){
        // Show loading overlay
        $('#loading-overlay').slideDown(500);
        
        // Remove active class from all navigation items
        $('ul.navbar-nav li').removeClass('active');
        
        // Hide all sections
        $('section').hide();u
        var targetSection = $(this).attr('href');
        
        // Show the target section after a delay (for demonstration)
        setTimeout(function() {
            // Hide loading overlay
            $('#loading-overlay').slideUp(1000);
            
            // Slide in the target section
            $(targetSection).slideDown(500);
        }, 2000); // Adjust the delay as needed

    });
});

// Initialize theme indicator
let themeIndicator = 0;

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.theme-switch').forEach(function(Switch) {
        Switch.addEventListener('change', function() {
            if (themeIndicator % 2 === 0) {
                document.body.classList.add('Background-light');
                document.body.classList.remove('Background');
                document.body.classList.add('body-light');
                document.body.classList.remove('body');
                let backgroundLoad = document.querySelector('.Background-load');
                backgroundLoad.classList.add('Background-light-load');
                backgroundLoad.classList.remove('Background-load');
            } else {
                document.body.classList.add('Background');
                document.body.classList.remove('Background-light');
                document.body.classList.add('body');
                document.body.classList.remove('body-light');
                let backgroundLoad = document.querySelector('.Background-light-load');
                backgroundLoad.classList.add('Background-load');
                backgroundLoad.classList.remove('Background-light-load');
            }
            themeIndicator++;
        });
    });
});

$(document).ready(function(){
    $('ul.navbar-nav li').click(function(){
        if ($(window).width() < 768) { // Check if screen width is less than 768px (phone size)
            $('#myNavbar').collapse('hide');
        }
    });
});

function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}

  // Close the popup when clicked outside of it
window.onclick = function(event) {
    var popup = document.getElementById('popup');
    if (event.target == popup) {
      popup.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const username = 'ToadBoyChen';
    const repoName1 = 'Trader';
    const repoName2 = 'ToadBoyChen.github.io';

    const apiUrl1 = `https://api.github.com/repos/${username}/${repoName1}`;
    const apiUrl2 = `https://api.github.com/repos/${username}/${repoName2}`;

    // Function to fetch number of commits
    async function fetchCommitsCount(apiUrl) {
        const commitsUrl = `${apiUrl}/commits`;
        const response = await fetch(commitsUrl);
        const commitsData = await response.json();
        return commitsData.length;
    }

    // Fetch and display information for Repo 1
    fetch(apiUrl1)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async repoData => {
            const repoInfoElement = document.getElementById('repo-info-1');
            const commitsCount = await fetchCommitsCount(apiUrl1);

            repoInfoElement.innerHTML = `
                <h2>${repoData.name}</h2>
                <p>Description: ${repoData.description}</p>
                <p>Stars: ${repoData.stargazers_count}</p>
                <p>Forks: ${repoData.forks_count}</p>
                <p>Commits: ${commitsCount}</p>
                <p>Language: ${repoData.language}</p>
                <p><a href="${repoData.html_url}" target="_blank">${repoData.html_url}</a></p>
            `;
        })
        .catch(error => {
            console.error('Error fetching repository data:', error);
        });

    // Fetch and display information for Repo 2
    fetch(apiUrl2)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async repoData => {
            const repoInfoElement = document.getElementById('repo-info-2');
            const commitsCount = await fetchCommitsCount(apiUrl2);

            repoInfoElement.innerHTML = `
                <h2>${repoData.name}</h2>
                <p>Description: ${repoData.description}</p>
                <p>Stars: ${repoData.stargazers_count}</p>
                <p>Forks: ${repoData.forks_count}</p>
                <p>Commits: ${commitsCount}</p>
                <p>Language: ${repoData.language}</p>
                <p><a href="${repoData.html_url}" target="_blank">${repoData.html_url}</a></p>
            `;
        })
        .catch(error => {
            console.error('Error fetching repository data:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.scrollPrompt');
    const target = document.querySelector('.container-welcome-2');

    function hideButton() {
        let opacity = 1;
        const fadeOutInterval = setInterval(() => {
            opacity -= 0.02; // Adjust the decrement value for desired speed
            button.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fadeOutInterval);
                button.style.display = 'none';
            }
        }, 50); // Adjust the interval for desired smoothness
    }

    if (button && target) {
        button.addEventListener('click', () => {
            target.scrollIntoView({ behavior: 'smooth' });
            hideButton();
        });

        window.addEventListener('scroll', () => {
            const targetPosition = target.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (targetPosition <= windowHeight) {
                hideButton();
            }
        });
    } else {
        console.error('Button or target element not found');
    }
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.FLYIN-1');

    const options = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            console.log(`Target: ${entry.target}, Intersecting: ${entry.isIntersecting}`);
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once it has been animated
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
