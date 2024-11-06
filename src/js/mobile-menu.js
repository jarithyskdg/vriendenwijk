const hamburgerMenu = document.querySelector('.navbar__menu-icon');
const offScreenMenu = document.querySelector('.off-screen-menu');
const closeButton = document.querySelector('.off-screen-menu__close');

// Open off-screen menu
hamburgerMenu.addEventListener('click', function() {
    offScreenMenu.classList.add('off-screen-menu--active');
    document.body.style.overflow = 'hidden';
});

// Close off-screen menu
closeButton.addEventListener('click', function() {
    offScreenMenu.classList.remove('off-screen-menu--active');
    document.body.style.overflow = 'auto';
});