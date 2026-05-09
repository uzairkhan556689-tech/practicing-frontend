const productsListEl = document.getElementById('products-list');
const categorySelectEl = document.getElementById('category-select');

let allProducts = [];

function createProductItem(product) {
    const li = document.createElement('li');
    li.className = 'product-item';

    const image = document.createElement('img');
    image.src = product.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
    image.alt = product.name;
    image.addEventListener('error', () => {
        image.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
    });

    const info = document.createElement('div');
    info.className = 'product-info';

    const title = document.createElement('h3');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price.toFixed(2)}`;

    const snippet = document.createElement('p');
    snippet.className = 'snippet';
    snippet.textContent = product.description;

    const detailButton = document.createElement('button');
    detailButton.type = 'button';
    detailButton.className = 'detail-button';
    detailButton.textContent = 'View Details';

    const detail = document.createElement('div');
    detail.className = 'product-detail';
    detail.innerHTML = `
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p>${product.description}</p>
    `;

    // detailButton.addEventListener('click', () => {
    //     const visible = detail.classList.toggle('visible');
    //     detailButton.textContent = visible ? 'Hide Details' : 'View Details';
    // });

    info.appendChild(title);
    info.appendChild(price);
    info.appendChild(snippet);
    info.appendChild(detailButton);
    info.appendChild(detail);

    li.appendChild(image);
    li.appendChild(info);

    return li;
}

function renderProducts(products) {
    if (!productsListEl) return;

    productsListEl.innerHTML = '';
    const categories = [...new Set(products.map(product => product.category))];

    categories.forEach(category => {
        const categoryProducts = products.filter(product => product.category === category);
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-section';

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;

        const ul = document.createElement('ul');
        categoryProducts.forEach(product => {
            ul.appendChild(createProductItem(product));
        });

        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(ul);
        productsListEl.appendChild(categoryDiv);
    });
}

function populateCategories(products) {
    if (!categorySelectEl) return;

    const categories = [...new Set(products.map(product => product.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelectEl.appendChild(option);
    });
}

function filterProducts() {
    const selectedCategory = categorySelectEl.value;
    const filtered = selectedCategory === 'all'
        ? allProducts
        : allProducts.filter(product => product.category === selectedCategory);

    renderProducts(filtered);
}

async function loadProducts() {
    try {
        const response = await fetch('./product.json');
        if (!response.ok) throw new Error('Failed to load products');

        allProducts = await response.json();
        populateCategories(allProducts);
        renderProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

if (categorySelectEl) {
    categorySelectEl.addEventListener('change', filterProducts);
}

window.addEventListener('DOMContentLoaded', loadProducts);
