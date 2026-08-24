document.addEventListener('DOMContentLoaded', () => {
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    let currentSubject = 'all';
    let currentType = 'all';

    // Subject Filtering
    subjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            subjectButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentSubject = button.getAttribute('data-subject');
            applyFilters();
        });
    });

    // Resource Type Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentType = button.getAttribute('data-filter');
            applyFilters();
        });
    });

    // Apply Dual Filtering Logic
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

    // Mobile Navigation Toggle
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
});
