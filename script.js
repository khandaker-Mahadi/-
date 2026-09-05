/* ============================================
   STUDYFLOW ABOUT ME — SCRIPT
   Khandaker Mahadi | Founder & Developer
   ============================================ */

(function () {
    'use strict';

    /* --- Reduced Motion Check --- */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --- Preloader --- */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            initHeroAnimations();
        }, 1200);
    });

    /* Fallback: hide preloader after 3s regardless */
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            initHeroAnimations();
        }
    }, 3000);

    /* --- Custom Cursor (Desktop only) --- */
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            cursor.classList.add('visible');
            cursorTrail.classList.add('visible');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('visible');
            cursorTrail.classList.remove('visible');
        });

        function animateCursor() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        /* Scale cursor on interactive elements */
        document.querySelectorAll('a, button, .vision-card, .motivation-card, .extra-card, .connect-card, .skill-planet').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
                cursor.style.borderColor = 'rgba(162, 155, 254, 0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'rgba(162, 155, 254, 0.4)';
            });
        });
    }

    /* --- Particles --- */
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = prefersReducedMotion ? 0 : (window.innerWidth < 600 ? 30 : 50);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.color = Math.random() > 0.5 ? '108, 92, 231' : '0, 206, 201';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    if (PARTICLE_COUNT > 0) animateParticles();

    /* --- Navbar Scroll --- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        /* Active nav link */
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* --- Hamburger Menu --- */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* --- Scroll Reveal --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = windowHeight * 0.88;
            if (elementTop < revealPoint) {
                el.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    /* Initial check */
    setTimeout(revealOnScroll, 100);

    /* --- Hero Animations --- */
    function initHeroAnimations() {
        /* Trigger hero reveals immediately */
        document.querySelectorAll('.hero .reveal-up').forEach(el => {
            el.classList.add('revealed');
        });
    }

    /* --- Typewriter Effect --- */
    const dynamicText = document.getElementById('dynamic-text');
    const words = ['Student', 'Creator', 'Explorer', 'Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        if (!dynamicText) return;
        const currentWord = words[wordIndex];

        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(typeWriter, typeSpeed);
    }
    setTimeout(typeWriter, 1500);

    /* --- Extra Section Typing --- */
    const extraTyping = document.getElementById('extra-typing');
    const extraWords = [
        'Building the future, one line of code at a time.',
        'Not just learning — creating.',
        'Where curiosity meets creation.',
        'StudyFlow is just the beginning.'
    ];
    let extraWordIndex = 0;
    let extraCharIndex = 0;
    let extraIsDeleting = false;
    let extraTypeSpeed = 80;

    function extraTypeWriter() {
        if (!extraTyping) return;
        const currentWord = extraWords[extraWordIndex];

        if (extraIsDeleting) {
            extraTyping.textContent = currentWord.substring(0, extraCharIndex - 1);
            extraCharIndex--;
            extraTypeSpeed = 40;
        } else {
            extraTyping.textContent = currentWord.substring(0, extraCharIndex + 1);
            extraCharIndex++;
            extraTypeSpeed = 80;
        }

        if (!extraIsDeleting && extraCharIndex === currentWord.length) {
            extraTypeSpeed = 2500;
            extraIsDeleting = true;
        } else if (extraIsDeleting && extraCharIndex === 0) {
            extraIsDeleting = false;
            extraWordIndex = (extraWordIndex + 1) % extraWords.length;
            extraTypeSpeed = 300;
        }

        setTimeout(extraTypeWriter, extraTypeSpeed);
    }
    setTimeout(extraTypeWriter, 2500);

    /* --- Timeline Progress --- */
    const timelineProgress = document.getElementById('timeline-progress');
    const timeline = document.querySelector('.timeline');

    function updateTimeline() {
        if (!timelineProgress || !timeline) return;
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;

        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
            const progress = Math.min(1, Math.max(0,
                (windowHeight - timelineTop) / (windowHeight + timelineHeight)
            ));
            timelineProgress.style.height = (progress * 100) + '%';
        }
    }
    window.addEventListener('scroll', updateTimeline, { passive: true });

    /* --- Mockup Date --- */
    const mockupDate = document.getElementById('mockup-date');
    if (mockupDate) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        mockupDate.textContent = now.toLocaleDateString('en-US', options);
    }

    /* --- Mockup Bar Animation --- */
    const mockupBars = document.querySelectorAll('.mockup-stat-bar');
    const mockupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    mockupBars.forEach(bar => mockupObserver.observe(bar));

    /* --- Magnetic Buttons (Desktop) --- */
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.hero-cta, .sf-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    /* --- Smooth Scroll for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 60;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    /* --- Parallax on hero glows (Desktop only) --- */
    if (!prefersReducedMotion && window.innerWidth > 900) {
        const heroGlows = document.querySelectorAll('.hero-glow');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroGlows.forEach((glow, i) => {
                const speed = 0.03 + i * 0.01;
                glow.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }

    /* --- Vision Cards tilt on hover (Desktop) --- */
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.vision-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    /* --- Portrait Parallax on Scroll --- */
    if (!prefersReducedMotion) {
        const heroPortrait = document.querySelector('.hero-portrait-wrapper');
        const journeyPortrait = document.querySelector('.journey-portrait-img-wrap');
        const extraBanner = document.querySelector('.extra-portrait-banner');

        function portraitParallax() {
            const scrollY = window.scrollY;
            if (heroPortrait) {
                const heroOffset = scrollY * 0.08;
                heroPortrait.style.transform = `translateY(${heroOffset}px)`;
            }
            if (journeyPortrait) {
                const rect = journeyPortrait.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (rect.top - window.innerHeight / 2) * 0.04;
                    journeyPortrait.style.transform = `translateY(${offset}px)`;
                }
            }
            if (extraBanner) {
                const rect = extraBanner.parentElement.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (rect.top - window.innerHeight / 2) * 0.03;
                    extraBanner.style.transform = `translateY(${offset}px) scale(1.02)`;
                }
            }
        }
        window.addEventListener('scroll', portraitParallax, { passive: true });
    }

    /* --- Image Error Fallback --- */
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent && !parent.querySelector('.img-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'img-fallback';
                fallback.style.cssText = `
                    width:100%;height:100%;display:flex;align-items:center;justify-content:center;
                    background:linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,206,201,0.1));
                    color:rgba(255,255,255,0.3);font-size:2rem;font-family:var(--font-display);
                `;
                fallback.textContent = 'M';
                parent.appendChild(fallback);
            }
        });
    });

})();
