function toggleText() {
    var text = document.querySelector('.product-details__info__text');
    text.classList.toggle('product-details__info__text--open');

    var link = document.querySelector('a');
    if (text.classList.contains('product-details__info__text--open')) {
        link.textContent = 'Show Less';
    } else {
        link.textContent = 'Show More';
    }
}
