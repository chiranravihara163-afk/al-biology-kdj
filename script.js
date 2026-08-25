document.addEventListener('DOMContentLoaded', () => {
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    let currentSubject = 'all';
    let currentType = 'all';

    // 1. Subject Filtering
    subjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            subjectButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentSubject = button.getAttribute('data-subject');
            applyFilters();
        });
    });

    // 2. Resource Type Filtering (Notes, Video, Presentation)
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentType = button.getAttribute('data-filter');
            applyFilters();
        });
    });

    // 3. Apply Dual Filtering Logic
    function applyFilters() {
        cards.forEach(card => {
            const matchesSubject = (currentSubject === 'all') || card.classList.contains(currentSubject);
            const matchesType = (currentType === 'all') || card.classList.contains(currentType);

            if (matchesSubject && matchesType) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 4. Mobile Navigation Toggle
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // 5. Video Popup Modal Handler
    const videoBtns = document.querySelectorAll('.watch-btn');
    const videoModal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeIframe');
    const closeModal = document.querySelector('.close-modal');

    videoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const videoData = btn.getAttribute('data-video') || btn.getAttribute('data-video-url');

            if (videoData && videoData !== 'YOUR_YOUTUBE_VIDEO_ID' && videoModal && iframe) {
                e.preventDefault();
                
                let finalUrl = videoData;
                if (!videoData.includes('http')) {
                    finalUrl = `https://www.youtube.com/embed/${videoData}?autoplay=1`;
                }

                iframe.src = finalUrl;
                videoModal.style.display = 'flex';
            }
        });
    });

    if (closeModal && videoModal && iframe) {
        closeModal.addEventListener('click', () => {
            videoModal.style.display = 'none';
            iframe.src = '';
        });

        window.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                iframe.src = '';
            }
        });
    }
});
