// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('#cursor');
const follower = document.querySelector('#cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth interpolation
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    follower.style.transform = `translate3d(${followerX - 10}px, ${followerY - 10}px, 0)`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Magnetic Effect for Buttons and Links
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(this, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });

        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(4)`;
        cursor.style.opacity = "0.1";
    });

    elem.addEventListener('mouseleave', function() {
        gsap.to(this, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1)`;
        cursor.style.opacity = "1";
    });
});

// Hero Entrance Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from('.hero-image', {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: "expo.out"
    })
    .from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1.5")
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
    }, "-=1")
    .from('.btn', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
    }, "-=0.8")
    .from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
    }, "-=1");
});

// Scroll Reveal Animations
const revealItems = document.querySelectorAll('.reveal-item');

revealItems.forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
    });
});

// Floating Parallax Effect for Hero Image
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) * 0.02;
    const y = (e.clientY - window.innerHeight / 2) * 0.02;

    gsap.to('.hero-image', {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
    });
});

// Project Card Hover Depth
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.05;

        gsap.to(card.querySelector('.project-image'), {
            x: x,
            y: y,
            scale: 1.15,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.project-image'), {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});
