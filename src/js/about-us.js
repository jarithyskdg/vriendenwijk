document.addEventListener("DOMContentLoaded", function() {
    const leftArrow = document.querySelector('.about-us--team__content__arrow--left');
    const rightArrow = document.querySelector('.about-us--team__content__arrow--right');

    const contentBodies = document.querySelectorAll('.about-us--team__content__body');
    const teamImages = document.querySelectorAll('.about-us--team__img');

    let currentIndex = 1; // Starting from the middle content

    // Function to show the content at a given index
    const showContent = index => {
        contentBodies.forEach(content => {
            content.classList.remove('about-us--team__content__body--active');
        });
        teamImages.forEach(image => {
            image.classList.remove('about-us--team__img--active');
        });
        contentBodies[index].classList.add('about-us--team__content__body--active');
        teamImages[index].classList.add('about-us--team__img--active');
    };

    // Show initial content
    showContent(currentIndex);

    // Event listener for the left arrow
    leftArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = contentBodies.length - 1;
        }
        showContent(currentIndex);
    });

    // Event listener for the right arrow
    rightArrow.addEventListener('click', function() {
        if (currentIndex < contentBodies.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        showContent(currentIndex);
    });
});
