const cache = new Map();

document.addEventListener('DOMContentLoaded', () => {
    initializeAll();
});

function initializeAll() {
    initializeNavigation();
    initializeGitHubInfo();
    initializeScrollPrompt();
    initializeIntersectionObserver();
    initializeScrollIndicator();
    initializeContactForm();
}

function initializeScrollIndicator() {
    const sections = ['welcome', 'about', 'portfolio', 'future', 'contact'];
    const sectionDots = document.querySelectorAll('.section-dot');
    const progressDots = document.querySelectorAll('.progress-dot');

    const progressDotGroups = [];
    let currentGroup = [];
    progressDots.forEach(dot => {
        currentGroup.push(dot);
        if (currentGroup.length === 3) {
            progressDotGroups.push(currentGroup);
            currentGroup = [];
        }
    });

    function updateScrollIndicator() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        sections.forEach((section, index) => {
            const currentSection = document.getElementById(section);
            if (!currentSection) return;

            const sectionTop = currentSection.offsetTop;
            const sectionHeight = currentSection.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            // Handle section dots
            if (scrollPosition >= sectionTop - windowHeight/2 && 
                scrollPosition < sectionBottom - windowHeight/2) {
                sectionDots[index]?.classList.add('active');
            } else {
                sectionDots[index]?.classList.remove('active');
            }

            // Handle progress dots
            if (index < sections.length - 1) {
                const nextSection = document.getElementById(sections[index + 1]);
                if (!nextSection) return;

                const nextSectionTop = nextSection.offsetTop;
                const totalDistance = nextSectionTop - sectionTop;
                const currentProgress = scrollPosition - sectionTop;
                const progressPercentage = currentProgress / totalDistance;

                if (progressDotGroups[index]) {
                    progressDotGroups[index].forEach((dot, dotIndex) => {
                        const dotThreshold = (dotIndex + 1) / 4;
                        
                        dot.classList.remove('active');
                        
                        if (progressPercentage <= 0) {
                            dot.style.opacity = "0";
                        } else if (progressPercentage >= 1) {
                            dot.style.opacity = "1";
                        } else if (progressPercentage < dotThreshold) {
                            dot.style.opacity = (progressPercentage / dotThreshold).toString();
                            if (Math.abs(progressPercentage - dotThreshold) < 0.1) {
                                dot.classList.add('active');
                            }
                        } else {
                            dot.style.opacity = "1";
                            if (dotIndex < 2 && progressPercentage < (dotIndex + 2) / 4) {
                                dot.classList.add('active');
                            }
                        }
                    });
                }
            }
        });
    }

    // Add scroll event listener with debounce
    window.addEventListener('scroll', debounce(() => {
        updateScrollIndicator();
    }, 100));

    // Initial update
    updateScrollIndicator();
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';

        const mailtoUrl = `mailto:toby.chen1337@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        try {
            window.location.href = mailtoUrl;
            form.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('There was an error sending your email. Please try again or use your email client directly.');
        }
    });
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('ul.navbar-nav li');
    const navBrand = document.querySelector('.navbar-brand');
    const navbar = document.getElementById('myNavbar');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => handleNavigation(e, navItems, navbar));
    });

    if (navBrand) {
        navBrand.addEventListener('click', (e) => handleBrandClick(e, navItems));
    }

    // Create a dedicated scroll handler for navigation
    window.addEventListener('scroll', debounce(() => {
        updateActiveNavOnScroll(navItems);
    }, 100));
}

function handleNavigation(e, navItems, navbar) {
    e.preventDefault();
    const targetId = e.currentTarget.querySelector('a').getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        navItems.forEach(item => item.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if (window.innerWidth < 768 && navbar) {
            navbar.classList.remove('show');
        }
    }
}

function handleBrandClick(e, navItems) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    navItems.forEach(item => item.classList.remove('active'));
}

function updateActiveNavOnScroll(navItems) {
    const sections = Array.from(document.querySelectorAll('section'));
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const correspondingNavItem = document.querySelector(
                `ul.navbar-nav li a[href="#${section.id}"]`
            )?.parentElement;
            
            if (correspondingNavItem) {
                navItems.forEach(item => item.classList.remove('active'));
                correspondingNavItem.classList.add('active');
            }
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    }
}

async function fetchAndDisplayRepoInfo(username, repoName, elementId) {
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
    const repoData = await fetchData(apiUrl);
    const commitsCount = await fetchCommitsCount(apiUrl);
    
    displayRepoInfo(repoData, commitsCount, elementId);
}

async function fetchCommitsCount(apiUrl) {
    const commitsData = await fetchData(`${apiUrl}/commits`);
    return commitsData.length;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        if (!response.ok) {
            throw new Error(`GitHub API returned status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Failed to fetch from GitHub: ${error.message}`);
    }
}

function displayRepoInfo(repoData, commitsCount, elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (!repoData || repoData.error) {
        element.innerHTML = `
            <div class="repo-error">
                <h3>Unable to Load Repository Information</h3>
                <p class="error-message">
                    ${repoData?.error || 'Could not connect to GitHub. Please try again later.'}
                </p>
                <div class="error-details">
                    <p>This could be due to:</p>
                    <ul>
                        <li>GitHub API rate limits</li>
                        <li>Network connectivity issues</li>
                        <li>Repository access restrictions</li>
                    </ul>
                </div>
                <p>You can still visit my GitHub profile directly:</p>
                <a href="https://github.com/ToadBoyChen" target="_blank" class="repo-link">Visit My GitHub Profile</a>
            </div>
        `;
        return;
    }

    try {
        const createdDate = new Date(repoData.created_at).toLocaleDateString();
        const updatedDate = new Date(repoData.updated_at).toLocaleDateString();

        const ageInDays = Math.floor((new Date() - new Date(repoData.created_at)) / (1000 * 60 * 60 * 24));
        const ageString = ageInDays > 365 
            ? `${Math.floor(ageInDays / 365)} years` 
            : `${ageInDays} days`;

        const sizeInMB = (repoData.size / 1024).toFixed(2);

        element.innerHTML = `
            <div class="repo-card">
                <div class="repo-header">
                    <h2>
                        <a href="${repoData.html_url}" target="_blank" class="repo-title">
                            ${repoData.name}
                            <svg class="external-link-icon" viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2z"/>
                                <path fill="currentColor" d="M13 0v2h6.59l-9.13 9.13 1.41 1.41 9.13-9.13v6.59h2v-10z"/>
                            </svg>
                        </a>
                    </h2>
                    ${repoData.private ? '<span class="repo-private">Private</span>' : '<span class="repo-public">Public</span>'}
                </div>

                <div class="repo-description">
                    ${repoData.description || 'No description available'}
                </div>

                <div class="repo-stats">
                    <div class="stat">
                        <span class="stat-label">Language:</span>
                        <span class="stat-value">${repoData.language || 'Not specified'}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Stars:</span>
                        <span class="stat-value">${repoData.stargazers_count}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Forks:</span>
                        <span class="stat-value">${repoData.forks_count}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Watchers:</span>
                        <span class="stat-value">${repoData.watchers_count}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Open Issues:</span>
                        <span class="stat-value">${repoData.open_issues_count}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Commits:</span>
                        <span class="stat-value">${commitsCount}</span>
                    </div>
                </div>

                <div class="repo-details">
                    <div class="detail">
                        <span class="detail-label">Size:</span>
                        <span class="detail-value">${sizeInMB} MB</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">Created:</span>
                        <span class="detail-value">${createdDate}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">Last Updated:</span>
                        <span class="detail-value">${updatedDate}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">Age:</span>
                        <span class="detail-value">${ageString}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-label">Default Branch:</span>
                        <span class="detail-value">${repoData.default_branch}</span>
                    </div>
                </div>

                <div class="repo-links">
                    <a href="${repoData.html_url}" target="_blank" class="repo-link">View on GitHub</a>
                    ${repoData.homepage ? `<a href="${repoData.homepage}" target="_blank" class="repo-link">Visit Homepage</a>` : ''}
                    <a href="${repoData.html_url}/issues" target="_blank" class="repo-link">Issues</a>
                    <a href="${repoData.html_url}/pulls" target="_blank" class="repo-link">Pull Requests</a>
                </div>
            </div>
        `;

        const containerElement = element.closest('.container-portfolio-2, .container-portfolio-3');
        if (containerElement && !containerElement.classList.contains('visible')) {
            containerElement.classList.add('visible');
        }

    } catch (error) {
        console.error('Error displaying repo info:', error);
        element.innerHTML = `
            <div class="repo-error">
                <h3>Error Displaying Repository Information</h3>
                <p class="error-message">${error.message}</p>
                <p>Please try again later or check the repository directly on GitHub:</p>
                <a href="${repoData.html_url}" target="_blank" class="repo-link">View on GitHub</a>
            </div>
        `;
    }
}

async function initializeGitHubInfo() {
    const repos = [
        { name: 'TOADTrade', elementId: 'repo-info-1' },
        { name: 'ToadBoyChen.github.io', elementId: 'repo-info-2' }
    ];

    const username = 'ToadBoyChen';

    for (const repo of repos) {
        try {
            const element = document.getElementById(repo.elementId);
            if (element) {
                // Show loading state
                element.innerHTML = `
                    <div class="repo-loading">
                        <div class="loading-spinner"></div>
                        <p>Loading repository information...</p>
                    </div>
                `;

                const apiUrl = `https://api.github.com/repos/${username}/${repo.name}`;
                const repoData = await fetchData(apiUrl);
                let commitsCount = '?';
                
                try {
                    const commitsData = await fetchData(`${apiUrl}/commits`);
                    commitsCount = commitsData.length;
                } catch (commitsError) {
                    console.warn(`Could not fetch commits for ${repo.name}:`, commitsError);
                }

                displayRepoInfo(repoData, commitsCount, repo.elementId);
                
                // Ensure the container is visible after content is loaded
                const containerElement = element.closest('.container-portfolio-2, .container-portfolio-3');
                if (containerElement) {
                    setTimeout(() => {
                        containerElement.classList.add('visible');
                    }, 100); // Small delay to ensure proper animation
                }
            }
        } catch (error) {
            console.error(`Error fetching data for ${repo.name}:`, error);
            const element = document.getElementById(repo.elementId);
            if (element) {
                element.innerHTML = `
                    <div class="repo-error">
                        <h3>GitHub Connection Error</h3>
                        <p class="error-message">${error.message}</p>
                        <div class="error-details">
                            <p>Unable to load repository information at this time.</p>
                            <p>You can visit my GitHub profile directly:</p>
                        </div>
                        <a href="https://github.com/ToadBoyChen" target="_blank" class="repo-link">Visit My GitHub Profile</a>
                    </div>
                `;
            }
        }
    }
}

function initializeScrollPrompt() {
    const button = document.querySelector('.scrollPrompt');
    const target = document.querySelector('#scroll-target');
    
    if (!button || !target) return;

    const hideButton = () => {
        button.style.transition = 'opacity 0.3s ease';
        button.style.opacity = '0';
        setTimeout(() => button.style.display = 'none', 300);
    };

    button.addEventListener('click', () => {
        target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        hideButton();
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const targetVisible = target.getBoundingClientRect().top <= window.innerHeight;
            if (targetVisible) hideButton();
        }, 100);
    });
}

function initializeIntersectionObserver() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }),
        {
            threshold: 0.1
        }
    );

    ['.container-about-1', '.container-about-2', '.container-about-3', 
        '.container-about-4', '.container-about-5', '.container-about-6', 
        '.container-portfolio-1', '.container-portfolio-2', '.container-portfolio-3', 
        '.container-contact-1', '.container-future-1 ']
        .forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                observer.observe(element);
                console.log(`Observing ${selector}`);
            } else {
                console.log(`Element not found: ${selector}`);
            }
        });
}

class ScrollIndicator {
    constructor() {
        this.sections = ['welcome', 'about', 'portfolio', 'future', 'contact'];
        this.sectionDots = document.querySelectorAll('.section-dot');
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.progressDotGroups = this.groupProgressDots();
        this.windowHeight = window.innerHeight;
        this.init();
    }

    groupProgressDots() {
        return Array.from(this.progressDots)
            .reduce((groups, dot, index) => {
                const groupIndex = Math.floor(index / 3);
                if (!groups[groupIndex]) groups[groupIndex] = [];
                groups[groupIndex].push(dot);
                return groups;
            }, []);
    }

    calculateSectionVisibility(section, scrollPosition) {
        const sectionElement = document.getElementById(section);
        if (!sectionElement) return null;

        return {
            top: sectionElement.offsetTop,
            bottom: sectionElement.offsetTop + sectionElement.offsetHeight,
            height: sectionElement.offsetHeight,
            element: sectionElement
        };
    }

    updateSectionDot(index, scrollPosition, sectionData) {
        if (!sectionData) return;
        
        const isVisible = scrollPosition >= sectionData.top - this.windowHeight/2 && 
                         scrollPosition < sectionData.bottom - this.windowHeight/2;
        
        this.sectionDots[index]?.classList.toggle('active', isVisible);
    }

    updateProgressDots(index, scrollPosition, currentSection, nextSection) {
        if (!currentSection || !nextSection || !this.progressDotGroups[index]) return;

        const totalDistance = nextSection.top - currentSection.top;
        const currentProgress = scrollPosition - currentSection.top;
        const progressPercentage = Math.max(0, Math.min(1, currentProgress / totalDistance));

        this.progressDotGroups[index].forEach((dot, dotIndex) => {
            const dotThreshold = (dotIndex + 1) / 4;
            this.updateProgressDot(dot, dotIndex, progressPercentage, dotThreshold);
        });
    }

    updateProgressDot(dot, dotIndex, progressPercentage, dotThreshold) {
        dot.classList.remove('active');
        
        if (progressPercentage <= 0) {
            dot.style.opacity = "0";
        } else if (progressPercentage >= 1) {
            dot.style.opacity = "1";
        } else {
            const opacity = progressPercentage < dotThreshold 
                ? (progressPercentage / dotThreshold)
                : 1;
            
            dot.style.opacity = opacity.toString();
            
            if (Math.abs(progressPercentage - dotThreshold) < 0.1 || 
                (dotIndex < 2 && progressPercentage < (dotIndex + 2) / 4)) {
                dot.classList.add('active');
            }
        }
    }

    update() {
        const scrollPosition = window.scrollY;

        this.sections.forEach((section, index) => {
            const currentSection = this.calculateSectionVisibility(section, scrollPosition);
            const nextSection = this.calculateSectionVisibility(this.sections[index + 1], scrollPosition);

            this.updateSectionDot(index, scrollPosition, currentSection);
            
            if (index < this.sections.length - 1) {
                this.updateProgressDots(index, scrollPosition, currentSection, nextSection);
            }
        });
    }

    init() {
        const throttledUpdate = this.throttle(this.update.bind(this), 16); // ~60fps
        window.addEventListener('scroll', throttledUpdate);
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
            throttledUpdate();
        });
        this.update();
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollIndicator();
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Initialize EmailJS
    emailjs.init("Gf2b__bF5oK1KZQgx");

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        submitBtn.classList.add('loading');

        // Safe value extraction with null checks
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const formData = {
            from_name: nameInput ? nameInput.value : '',
            reply_to: emailInput ? emailInput.value : '',
            subject: subjectInput ? subjectInput.value : '',
            message: messageInput ? messageInput.value : '',
        };

        // Log the form data to debug
        console.log('Form Data:', formData);

        emailjs.send("service_u469oso", "template_jg4z6nr", formData)
            .then(function(response) {
                console.log("SUCCESS", response);
                form.reset();
                showNotification('Message sent successfully!', 'success');
            })
            .catch(function(error) {
                console.error("FAILED", error);
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                submitBtn.classList.remove('loading');
            });
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

if ('ontouchstart' in window) {
    const container4 = document.querySelector('.container-about-4');
    if (container4) {
        container4.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });

        container4.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 700);
        });
    }
}

function initializeScrollAnimations() {
    const isMobile = window.innerWidth <= 768;

    const options = {
        root: null,
        rootMargin: isMobile ? '0px' : '-50px',
        threshold: isMobile ? 0.1 : 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    const containers = document.querySelectorAll([
        '.container-about-1', '.container-about-2', '.container-about-3',
        '.container-about-4', '.container-about-5', '.container-about-6',
        '.container-portfolio-1', '.container-portfolio-2', '.container-portfolio-3',
        '.container-contact-1', '.container-future-1'
    ].join(','));

    containers.forEach(container => observer.observe(container));
}

window.addEventListener('load', initializeScrollAnimations);
window.addEventListener('resize', debounce(() => {
    initializeScrollAnimations();
}, 250));