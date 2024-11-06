const sliderContainer = document.querySelector('.card-slider__container');
const cards = document.querySelectorAll('.card--product');

// Get the width of the first card including margins
const cardStyles = window.getComputedStyle(cards[0]);
const cardMargin = parseFloat(cardStyles.marginInlineStart) + parseFloat(cardStyles.marginInlineEnd);
const cardWidth = cards[0].offsetWidth + cardMargin;

let currentIndex = 0;

document.querySelector('.card-slider__controls--left').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;

        cards.forEach(card => {
            card.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        });
    }
});

document.querySelector('.card-slider__controls--right').addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
        currentIndex++;

        cards.forEach(card => {
            card.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        });
    }
});
