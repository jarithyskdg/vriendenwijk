const dropdownArrows = document.querySelectorAll('.dropdown-arrow');
const filterSections = document.querySelectorAll('.filters__section__content');

const filtersMenu = document.querySelector('.products__filter');
const offScreenFilters = document.querySelector('.off-screen-filters');
const closeFilters = document.querySelector('.off-screen-filters__close');

filterSections.forEach(section => {
    // Calculate the height of the section
    const contentHeight = section.offsetHeight;
  
    // Set the max-height of the section to its calculated height
    section.style.maxHeight = contentHeight + 'px';
});

dropdownArrows.forEach((arrow) => {
    arrow.addEventListener('click', function () {
        const content = this.parentElement.nextElementSibling;
        arrow.classList.toggle('dropdown-arrow--open');
        arrow.classList.toggle('dropdown-arrow--close');
        content.classList.toggle('filters__section__content--closed');
    });
});


// Open off-screen filters
filtersMenu.addEventListener('click', function() {
    offScreenFilters.classList.add('off-screen-filters--active');
    document.body.style.overflow = 'hidden';
});

// Close off-screen filters
closeFilters.addEventListener('click', function() {
    offScreenFilters.classList.remove('off-screen-filters--active');
    document.body.style.overflow = 'auto';
});