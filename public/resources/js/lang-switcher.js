const langOptions = document.querySelectorAll('.lang-switcher__option');

langOptions.forEach(option => {
    option.addEventListener('click', function () {
        langOptions.forEach(opt => opt.classList.remove('lang-switcher__option--active'));
        this.classList.add('lang-switcher__option--active');
    });
});