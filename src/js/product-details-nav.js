document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll(".product-details__nav__item");
    const sections = document.querySelectorAll(".product-details__info__section");

    navItems.forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("data-section");

            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.style.display = "flex";
                } else {
                    section.style.display = "none";
                }
            });

            navItems.forEach(navItem => {
                navItem.classList.remove("product-details__nav__item--active");
            });

            this.classList.add("product-details__nav__item--active");
        });
    });
});
