const productsListEl = document.getElementById('products-list');

function createProductItem(product) {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price}`;
    return li;
}

function renderProducts(products) {
    if (!productsListEl) return;
    productsListEl.innerHTML = '';
    products.forEach(product => {
        productsListEl.appendChild(createProductItem(product));
    });
}

async function loadProducts() {
    try {
        const response = await fetch('./product.json');
        if (!response.ok) throw new Error('Failed to load products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error(error);
    }
}


window.addEventListener('DOMContentLoaded', loadProducts);