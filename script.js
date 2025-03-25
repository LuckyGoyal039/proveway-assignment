document.addEventListener('DOMContentLoaded', () => {
    const productOptions = document.querySelectorAll('.product-option');
    const addToCartButton = document.querySelector('.add-to-cart');
    const totalPriceElement = document.querySelector('.total-price');

    let selectedOption = null;
    let selectedProducts = [];

    productOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (selectedOption) {
                selectedOption.classList.remove('selected');
            }

            option.classList.add('selected');
            selectedOption = option;

            const units = option.dataset.units;
            updateTotalPrice(units);
        });
    });

    const allSelects = document.querySelectorAll('select');
    allSelects.forEach(select => {
        select.addEventListener('change', validateSelections);
    });

    function validateSelections() {
        const selectedOptionUnits = selectedOption ? 
            parseInt(selectedOption.dataset.units) : 0;

        selectedProducts = [];

        const selectionGroups = selectedOption ? 
            selectedOption.querySelectorAll('.unit-selections') : [];

        let allSelected = true;
        selectionGroups.forEach((group, index) => {
            const sizeSelect = group.querySelector('.size-select');
            const colorSelect = group.querySelector('.color-select');

            if (sizeSelect.value === '' || colorSelect.value === '') {
                allSelected = false;
            } else {
                selectedProducts.push({
                    unit: index + 1,
                    size: sizeSelect.value,
                    color: colorSelect.value
                });
            }
        });

        addToCartButton.disabled = !(selectedOption && allSelected);
        addToCartButton.style.opacity = allSelected ? '1' : '0.5';
        addToCartButton.style.cursor = allSelected ? 'pointer' : 'not-allowed';
    }

    function updateTotalPrice(units) {
        let total = '0.00';
        switch(units) {
            case '1':
                total = '10.00';
                break;
            case '2':
                total = '18.00';
                break;
            case '3':
                total = '24.00';
                break;
        }
        totalPriceElement.textContent = `Total: $${total} USD`;
    }

    addToCartButton.addEventListener('click', () => {
        if (selectedProducts.length > 0) {
            console.log('Selected Products:', selectedProducts);
            alert('Products added to cart!');
        }
    });
});