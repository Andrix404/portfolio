// Initialize all site functionality
function initializeSite() {
    // Load projects
    loadProjects();
    
    // Add hover effects to carousel items
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px color-mix(in srgb, var(--accent-color) 70%, transparent)';
        });
        
        slide.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    const heroHeading = document.querySelector('.hero h1');
    const fullText = heroHeading.textContent;
    heroHeading.textContent = '';
    let index = 0;
    
    // Create typing sound effect using existing hoverSound audio element
    const typingSound = document.getElementById('hoverSound');
    typingSound.volume = 0.3; // Set volume to 30%
    
    function typeEffect() {
        if (index < fullText.length) {
            heroHeading.textContent += fullText.charAt(index);
            // Play sound effect for each character
            if (index % 3 === 0) { // Play sound every 3 characters to avoid too much noise
                typingSound.currentTime = 0;
                typingSound.play().catch(e => console.log("Audio play error:", e));
            }
            index++;
            setTimeout(typeEffect, 80);
        }
    }
    
    // Form submission with Formspree
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get form elements
        const submitButton = this.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('form-message');
        const originalText = submitButton.textContent;
        const nameInput = this.querySelector('input[name="user_name"]');
        const emailInput = this.querySelector('input[name="user_email"]');
        const phoneInput = this.querySelector('input[name="user_phone"]');
        const messageInput = this.querySelector('textarea[name="message"]');
        
        // Clear previous messages
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
        
        // Basic validation
        if (!nameInput.value.trim()) {
            formMessage.textContent = "Please enter your name.";
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            nameInput.focus();
            return;
        }
        
        if (!emailInput.value.trim()) {
            formMessage.textContent = "Please enter your email.";
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            emailInput.focus();
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            emailInput.focus();
            return;
        }
        
        if (!messageInput.value.trim()) {
            formMessage.textContent = "Please enter your message.";
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            messageInput.focus();
            return;
        }
        
        // Show loading state
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;
        
        // Prepare form data for Formspree
        const formData = new FormData();
        formData.append("user_name", nameInput.value);
        formData.append("user_email", emailInput.value);
        formData.append("user_phone", phoneInput.value);
        formData.append("message", messageInput.value);
        
        // Send the form data using fetch to Formspree
        fetch("https://formspree.io/f/meozvpzy", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                formMessage.textContent = "Message sent successfully!";
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                this.reset();
            } else {
                // Show error message
                formMessage.textContent = "Failed to send message. Please try again later.";
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        })
        .catch(error => {
            // Show error message
            formMessage.textContent = "Failed to send message. Please try again later.";
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            console.error("Formspree error:", error);
        })
        .finally(() => {
            // Reset button state after a delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    });
    
    // Preloader
    window.addEventListener("load", () => {
        // Hide the preloader
        document.getElementById("preloader").style.display = "none";
        
        // Start the welcome animation after a short delay
        setTimeout(() => {
            const welcomeAnimation = document.getElementById("welcome-animation");
            if (welcomeAnimation) {
                // Add a final fade out effect
                setTimeout(() => {
                    welcomeAnimation.style.opacity = "0";
                    // Remove the welcome animation after fading out
                    setTimeout(() => {
                        welcomeAnimation.style.display = "none";
                        
                        // Start the hero heading typing effect
                        const heroHeading = document.querySelector('.hero h1');
                        if (heroHeading) {
                            const fullText = heroHeading.textContent;
                            heroHeading.textContent = '';
                            let index = 0;
                            
                            // Create typing sound effect using existing hoverSound audio element
                            const typingSound = document.getElementById('hoverSound');
                            typingSound.volume = 0.3; // Set volume to 30%
                            
                            function typeEffect() {
                                if (index < fullText.length) {
                                    heroHeading.textContent += fullText.charAt(index);
                                    // Play sound effect for each character
                                    if (index % 3 === 0) { // Play sound every 3 characters to avoid too much noise
                                        typingSound.currentTime = 0;
                                        typingSound.play().catch(e => console.log("Audio play error:", e));
                                    }
                                    index++;
                                    setTimeout(typeEffect, 80);
                                }
                            }
                            
                            // Start typing effect after a short delay
                            setTimeout(typeEffect, 500);
                        }
                    }, 1000);
                }, 4000); // Total animation duration
            }
        }, 500); // Delay before starting welcome animation
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            document.getElementById('clickSound').play();
        });
    });
    
    // Theme toggle
    window.toggleMode = function() {
        document.body.classList.toggle('light-mode');
        document.getElementById('clickSound').play();
    }
    
    // Color picker functionality
    function updateAccentColor(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        // Update the color picker element to reflect the new color
        document.getElementById('accent-color-picker').value = color;
    }
    
    // Event listener for color picker
    document.getElementById('accent-color-picker').addEventListener('input', function(e) {
        updateAccentColor(e.target.value);
        // Save the color to localStorage
        localStorage.setItem('accentColor', e.target.value);
        document.getElementById('clickSound').play();
    });
    
    // Load saved accent color
    window.addEventListener('DOMContentLoaded', () => {
        const savedColor = localStorage.getItem('accentColor');
        if (savedColor) {
            updateAccentColor(savedColor);
        }
    });
    
    // Scroll animation
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "fadeIn 1.5s forwards";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => {
        section.style.opacity = 0;
        observer.observe(section);
    });
    
    // Skills progress bar animation
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        progressObserver.observe(skillsSection);
    }
    
    // Custom cursor
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to cursor
    document.querySelectorAll('a, button, .project, .carousel-slide').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Sound effect
    const hoverSound = document.getElementById('hoverSound');
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
    
    // Orbit sound effect
    const orbitSound = document.getElementById('orbitSound');
    document.querySelectorAll('.orbit-icon').forEach(el => {
        el.addEventListener('mouseenter', () => {
            orbitSound.currentTime = 0;
            orbitSound.play();
        });
    });
    
    // Project card sound effect
    const projectSound = document.getElementById('projectSound');
    document.querySelectorAll('.project').forEach(el => {
        el.addEventListener('mouseenter', () => {
            projectSound.currentTime = 0;
            projectSound.play();
        });
    });
    
    // Load saved theme preference
    window.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
        }
        
        // Initialize particles.js
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ae00ff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ae00ff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 100,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    });
    
    // Load saved theme preference
    window.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
        }
    });
    
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    window.onscroll = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            if (scrollTopBtn) scrollTopBtn.style.display = "block";
        } else {
            if (scrollTopBtn) scrollTopBtn.style.display = "none";
        }
    };
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            document.getElementById('clickSound').play();
        });
    }
    
    // Start typing effect after a short delay
    setTimeout(typeEffect, 500);
}

// Expose function to global scope
window.initializeSite = initializeSite;