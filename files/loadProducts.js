const productsListEl = document.getElementById('products-list');
const categorySelectEl = document.getElementById('category-select');

let allProducts = [];

function createProductItem(product) {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price}`;
    return li;
}

function renderProducts(products) {
    if (!productsListEl) return;
    productsListEl.innerHTML = '';
    
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const categoryProducts = products.filter(p => p.category === cat);
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-section';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = cat;
        categoryDiv.appendChild(categoryTitle);
        
        const ul = document.createElement('ul');
        categoryProducts.forEach(product => {
            ul.appendChild(createProductItem(product));
        });
        categoryDiv.appendChild(ul);
        
        productsListEl.appendChild(categoryDiv);
    });
}

function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelectEl.appendChild(option);
    });
}

function filterProducts() {
    const selectedCategory = categorySelectEl.value;
    const filtered = selectedCategory === 'all' ? allProducts : allProducts.filter(p => p.category === selectedCategory);
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
        console.error(error);
    }
}

if (categorySelectEl) {
    categorySelectEl.addEventListener('change', filterProducts);
}

window.addEventListener('DOMContentLoaded', loadProducts);