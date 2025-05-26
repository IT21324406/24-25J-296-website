// Navigation and UI Elements
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    // Add scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Add back to top button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    // Toggle mobile menu with animation
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate menu items
        const menuItems = navLinks.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            if (navLinks.classList.contains('active')) {
                item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
            } else {
                item.style.animation = '';
            }
        });
    });

    // Handle dropdowns on mobile with animation
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Animate dropdown items
                const items = menu.querySelectorAll('li');
                items.forEach((item, index) => {
                    if (dropdown.classList.contains('active')) {
                        item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
                    } else {
                        item.style.animation = '';
                    }
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Enhanced scroll handling
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Show/hide back to top button
        if (currentScroll > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Enhanced navbar behavior
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Enhanced Hero Section Interactive Elements
    const elements = document.querySelectorAll('.element');
    const connectionLines = document.querySelector('.connection-lines');
    
    // Add mouse move effect to elements with improved performance
    elements.forEach(element => {
        let isHovered = false;
        
        element.addEventListener('mouseenter', () => {
            isHovered = true;
            element.style.zIndex = '10';
        });
        
        element.addEventListener('mouseleave', () => {
            isHovered = false;
            element.style.zIndex = '1';
            element.style.transform = 'translate(0, 0)';
        });
        
        element.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            element.style.transform = `
                translate(${deltaX * 15}px, ${deltaY * 15}px)
                rotateX(${deltaY * 10}deg)
                rotateY(${deltaX * -10}deg)
                scale(1.1)
            `;
        });
        
        // Add click effect with ripple
        element.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            element.appendChild(ripple);
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
    
    // Enhanced parallax effect for connection lines
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });
    
    function updateParallax() {
        targetX += (mouseX - targetX) * 0.1;
        targetY += (mouseY - targetY) * 0.1;
        
        if (connectionLines) {
            connectionLines.style.transform = `
                translate(${targetX * 30}px, ${targetY * 30}px)
                rotate(${targetX * 5}deg)
            `;
        }
        
        requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
    
    // Add scroll-based animations
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = window.innerHeight;
        const progress = Math.min(scrolled / maxScroll, 1);
        
        if (hero) {
            hero.style.opacity = 1 - progress;
            hero.style.transform = `translateY(${progress * 50}px)`;
        }
    });
    
    // Add scroll indicator click handler with smooth scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#literature-survey');
            if (nextSection) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Enhanced form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Form submission with animation
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Send data to server
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We will get back to you soon.</p>
                `;
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>${error.message}</p>
            `;
            contactForm.appendChild(errorMessage);
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Remove messages after 3 seconds
            setTimeout(() => {
                const messages = contactForm.querySelectorAll('.success-message, .error-message');
                messages.forEach(msg => msg.remove());
            }, 3000);
        }
    });
}

// Enhanced section animations
const sections = document.querySelectorAll('.section');

// Add hover effect to technology icons
document.querySelectorAll('.tech-item i').forEach(icon => {
    icon.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    icon.addEventListener('mouseout', function() {
        this.style.transform = '';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Chatbot functionality
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendMessage = document.getElementById('sendMessage');

// Typing animation
function typeMessage(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add typing indicator
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot', 'typing');
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typingDiv;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Toggle chatbot window with animation
chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    chatbotWindow.style.animation = 'slideIn 0.3s ease-out';
});

closeChatbot.addEventListener('click', () => {
    chatbotWindow.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
        chatbotWindow.classList.remove('active');
    }, 300);
});

// Send message function with animations
function sendChatbotMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        // Add user message with animation
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user');
        chatbotMessages.appendChild(userMessageDiv);
        typeMessage(userMessageDiv, message);
        chatbotInput.value = '';

        // Show typing indicator
        const typingIndicator = addTypingIndicator();

        // Simulate bot response with delay
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('message', 'bot');
            chatbotMessages.appendChild(botMessageDiv);
            typeMessage(botMessageDiv, botResponse);
        }, 1500);
    }
}

// Send message on button click
sendMessage.addEventListener('click', sendChatbotMessage);

// Send message on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatbotMessage();
    }
});

// Enhanced bot response logic with more interactive features
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return '👋 Hello! I\'m your friendly ReactiveWeb assistant. How can I help you today?';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
        return '📧 You can reach us at reactiveweb@gmail.com\nWe typically respond within 24 hours!';
    } else if (lowerMessage.includes('help')) {
        return '🤖 I can help you with:\n\n• Contact information\n• General inquiries\n• Technical support\n• Project details\n\nWhat would you like to know?';
    } else if (lowerMessage.includes('thank')) {
        return '😊 You\'re welcome! Is there anything else I can help you with?';
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        return '👋 Goodbye! Have a great day! Feel free to chat again if you need anything.';
    } else if (lowerMessage.includes('project') || lowerMessage.includes('research')) {
        return '🔬 Our project focuses on developing an intelligent chatbot system. Would you like to know more about our research objectives or methodology?';
    } else if (lowerMessage.includes('team')) {
        return '👥 We have a dedicated team of researchers and developers working on this project. Would you like to know more about our team members?';
    } else {
        return '🤔 I\'m not sure I understand. Could you please rephrase your question? I\'m here to help with information about our project, team, or contact details.';
    }
}

// Add hover effect to chatbot button
chatbotButton.addEventListener('mouseover', () => {
    chatbotButton.style.transform = 'scale(1.1) rotate(5deg)';
});

chatbotButton.addEventListener('mouseout', () => {
    chatbotButton.style.transform = 'scale(1) rotate(0deg)';
}); 