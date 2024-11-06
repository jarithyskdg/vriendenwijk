document.addEventListener("DOMContentLoaded", function () {
    //Bestsellers image slider

    // Selecting DOM elements for previous and next buttons, and images
    const bestsellerPrevButton = document.querySelector('.bestseller-slider--prev');
    const bestsellerNextButton = document.querySelector('.bestseller-slider--next');
    const bestsellerImages = document.querySelectorAll('.bestseller-slider-img');

    // Initializing the index of the currently active image
    let bestsellerCurrentIndex = Math.floor(bestsellerImages.length / 2);

    // Function to show images with appropriate positioning and scaling
    function showBestsellerImage(index) {
        bestsellerImages.forEach((image, i) => {
            // Calculate the position and scale for each image
            let position = getBestsellerPosition(index, i, bestsellerImages.length);
            let scale = getBestsellerScale(position, index, i);

            // Calculate the translation value based on the number of images
            let translatePercentage = 100 / (bestsellerImages.length - 1);
            let translateValue = (i - index) * translatePercentage;

            // Apply transform styles to each image based on its position and scale
            image.style.transform = `translateX(${translateValue}%) scale(${scale})`;
        });
    }

    // Function to calculate the position of an image relative to the active image
    function getBestsellerPosition(activeIndex, imageIndex, totalImages) {
        let distance = Math.abs(imageIndex - activeIndex);
        let position = imageIndex - activeIndex;

        // Ensure cyclic behavior by adjusting the position if it's beyond halfway
        if (distance > totalImages / 2) {
            position = activeIndex > imageIndex ? totalImages - activeIndex + imageIndex : -(totalImages - imageIndex + activeIndex);
        }

        return position;
    }

    // Function to determine the scale of an image based on its position
    function getBestsellerScale(position, index, i) {
        const minScale = 0.75;
        const maxScale = 1.25;

        // Calculate the scale based on the position relative to the middle
        let scale = maxScale - Math.abs(position) * 0.25;

        // Ensure the scale doesn't go below the minimum value
        if ((index === bestsellerImages.length - 1 && i === 0) || (index === 0 && i === bestsellerImages.length - 1)) {
            return 0.75; // Maintain 0.75 scale for the outermost images when cycling
        }

        return scale < minScale ? minScale : scale;
    }

    // Function to handle displaying the next image in the slider
    function showNextBestsellerImage() {
        bestsellerCurrentIndex = (bestsellerCurrentIndex + 1) % bestsellerImages.length; // Move to the next index cyclically
        showBestsellerImage(bestsellerCurrentIndex); // Show the updated images
    }

    // Function to handle displaying the previous image in the slider
    function showPrevBestsellerImage() {
        bestsellerCurrentIndex = (bestsellerCurrentIndex - 1 + bestsellerImages.length) % bestsellerImages.length; // Move to the previous index cyclically
        showBestsellerImage(bestsellerCurrentIndex); // Show the updated images
    }

    // Attach event listeners to the previous and next buttons
    bestsellerNextButton.addEventListener('click', showNextBestsellerImage); // Clicking next shows the next image
    bestsellerPrevButton.addEventListener('click', showPrevBestsellerImage); // Clicking prev shows the previous image

    // Initially position images based on the currentIndex
    showBestsellerImage(bestsellerCurrentIndex);



    //Newcomers image slider

    // Selecting DOM elements for previous and next buttons, and images
    const newcomerPrevButton = document.querySelector('.newcomer-slider--prev');
    const newcomerNextButton = document.querySelector('.newcomer-slider--next');
    const newcomerImages = document.querySelectorAll('.newcomer-slider-img');

    // Initializing the index of the currently active image
    let newcomerCurrentIndex = Math.floor(newcomerImages.length / 2);

    // Function to show images with appropriate positioning and scaling
    function showNewcomerImage(index) {
        newcomerImages.forEach((image, i) => {
            // Calculate the position and scale for each image
            let position = getNewcomerPosition(index, i, newcomerImages.length);
            let scale = getNewcomerScale(position, index, i);

            // Calculate the translation value based on the number of images
            let translatePercentage = 100 / (newcomerImages.length - 1);
            let translateValue = (i - index) * translatePercentage;

            // Apply transform styles to each image based on its position and scale
            image.style.transform = `translateX(${translateValue}%) scale(${scale})`;
        });
    }

    // Function to calculate the position of an image relative to the active image
    function getNewcomerPosition(activeIndex, imageIndex, totalImages) {
        let distance = Math.abs(imageIndex - activeIndex);
        let position = imageIndex - activeIndex;

        // Ensure cyclic behavior by adjusting the position if it's beyond halfway
        if (distance > totalImages / 2) {
            position = activeIndex > imageIndex ? totalImages - activeIndex + imageIndex : -(totalImages - imageIndex + activeIndex);
        }

        return position;
    }

    // Function to determine the scale of an image based on its position
    function getNewcomerScale(position, index, i) {
        const minScale = 0.75;
        const maxScale = 1.25;

        // Calculate the scale based on the position relative to the middle
        let scale = maxScale - Math.abs(position) * 0.25;

        // Ensure the scale doesn't go below the minimum value
        if ((index === newcomerImages.length - 1 && i === 0) || (index === 0 && i === newcomerImages.length - 1)) {
            return 0.75; // Maintain 0.75 scale for the outermost images when cycling
        }

        return scale < minScale ? minScale : scale;
    }

    // Function to handle displaying the next image in the slider
    function showNextNewcomerImage() {
        newcomerCurrentIndex = (newcomerCurrentIndex + 1) % newcomerImages.length; // Move to the next index cyclically
        showNewcomerImage(newcomerCurrentIndex); // Show the updated images
    }

    // Function to handle displaying the previous image in the slider
    function showPrevNewcomerImage() {
        newcomerCurrentIndex = (newcomerCurrentIndex - 1 + newcomerImages.length) % newcomerImages.length; // Move to the previous index cyclically
        showNewcomerImage(newcomerCurrentIndex); // Show the updated images
    }

    // Attach event listeners to the previous and next buttons
    newcomerNextButton.addEventListener('click', showNextNewcomerImage); // Clicking next shows the next image
    newcomerPrevButton.addEventListener('click', showPrevNewcomerImage); // Clicking prev shows the previous image

    // Initially position images based on the currentIndex
    showNewcomerImage(newcomerCurrentIndex);
});
