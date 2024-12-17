document.addEventListener('DOMContentLoaded', function() {
    // Initialize YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // YouTube Video Players
    let player1, player2;
    window.onYouTubeIframeAPIReady = function() {
        player1 = new YT.Player('video1', {
            height: '315',
            width: '560',
            videoId: '4OTWSw8BKek?',
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'rel': 0
            }
        });

        player2 = new YT.Player('video2', {
            height: '315',
            width: '560',
            videoId: '6nlJV15vDZI?',
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'rel': 0
            }
        });
    }

    // Services Carousel
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.service-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentSlide = 0;
    const slidesToShow = 3;
    const totalSlides = slides.length;

    function updateCarousel() {
        const slideWidth = carousel.clientWidth / slidesToShow;
        carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % (totalSlides - slidesToShow + 1);
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Client Logo Carousel
    const clientTrack = document.querySelector('.client-track');
    const clientLogos = document.querySelectorAll('.client-logo');
    
    // Clone logos for infinite scroll
    clientLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clientTrack.appendChild(clone);
    });

    // Pause animation on hover
    clientTrack.addEventListener('mouseenter', () => {
        clientTrack.style.animationPlayState = 'paused';
    });

    clientTrack.addEventListener('mouseleave', () => {
        clientTrack.style.animationPlayState = 'running';
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        } catch (error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        }
    });

    // Responsive handling
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});