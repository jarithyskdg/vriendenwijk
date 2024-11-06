// Get the modal element
var modal = document.getElementById('ageCheckModal');

// Function to open the modal
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'initial'; // Allow scrolling
}

// Open the modal when the page is loaded
window.addEventListener('load', openModal);

// Get both buttons inside the modal
var youngerThan18Btn = document.getElementById('youngerThan18');
var olderThan18Btn = document.getElementById('olderThan18');

// Event listener to close the modal when either button is clicked
youngerThan18Btn.addEventListener('click', closeModal);
olderThan18Btn.addEventListener('click', closeModal);
