document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loader Animation
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, 2000);

    // 2. Audio Control
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    let isPlaying = false;

    // Try to autoplay music (browsers often block this, so we handle the promise)
    // We will let the user click to start instead to ensure it works across all browsers
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgm.pause();
            musicIcon.textContent = '🔇';
        } else {
            bgm.play().catch(e => console.log("Audio play failed:", e));
            musicIcon.textContent = '🎵';
        }
        isPlaying = !isPlaying;
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 4. Countdown Timer (January 28, 2027)
    const weddingDate = new Date("Jan 28, 2027 06:00:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minsEl.innerText = "00";
            secsEl.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    // 5. Lightbox Gallery
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = item.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // 6. RSVP Form Submission to LocalStorage
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMsg = document.getElementById('rsvp-msg');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const attendance = document.getElementById('attendance').value;

        const rsvpData = {
            name,
            guests,
            attendance,
            timestamp: new Date().toISOString()
        };

        // Get existing data or init array
        let existingRsvps = JSON.parse(localStorage.getItem('weddingRSVPs')) || [];
        existingRsvps.push(rsvpData);
        
        // Save back to local storage
        localStorage.setItem('weddingRSVPs', JSON.stringify(existingRsvps));

        // Show success message and reset form
        rsvpMsg.classList.remove('hidden');
        rsvpForm.reset();

        setTimeout(() => {
            rsvpMsg.classList.add('hidden');
        }, 5000);
    });

    // 7. Floating Jasmine Petals Generation
    const petalsContainer = document.getElementById('petals-container');
    const petalColors = ['#ffffff', '#f8f1e5', '#e6d3a8'];

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize position, size, and animation duration
        const size = Math.random() * 10 + 10; // 10px to 20px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const color = petalColors[Math.floor(Math.random() * petalColors.length)];

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}vw`;
        petal.style.backgroundColor = color;
        petal.style.animationDuration = `${duration}s`;

        petalsContainer.appendChild(petal);

        // Remove petal after animation completes
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Create a new petal every 800ms
    setInterval(createPetal, 800);

});
