document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion__item');

    accordionItems.forEach(function (item) {
        const title = item.querySelector('.accordion__item__title');

        title.addEventListener('click', function () {
            const content = item.querySelector('.accordion__item__content');
            const isOpen = item.classList.contains('accordion__item--open');

            if (!isOpen) {
                item.classList.add('accordion__item--open');
                content.style.height = content.scrollHeight + 'px';
            }
            else {
                item.classList.remove('accordion__item--open');
                content.style.height = '0';
            }
        });
    });
});
