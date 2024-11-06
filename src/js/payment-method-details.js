const bancontactCheckbox = document.getElementById('bancontact');
const paymentDetails = document.querySelector('.payment__form__input__details');

bancontactCheckbox.addEventListener('change', function () {
    if (this.checked) {
        paymentDetails.style.display = 'flex';
        paymentDetails.style.maxHeight = 'initial';
        paymentDetails.style.overflow = 'visible';
    } else {
        paymentDetails.style.display = 'none';
        paymentDetails.style.maxHeight = '0';
        paymentDetails.style.overflow = 'hidden';
    }
});