// Example: DOM and BOM Event Handling
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-hero-button");
  const heroSection = document.getElementById("hero-section");

  let isHeroVisible = true;
  toggleButton.addEventListener("click", () => {
    heroSection.style.display = isHeroVisible ? "none" : "block";
    toggleButton.textContent = isHeroVisible ? "Show Hero Section" : "Hide Hero Section";
    isHeroVisible = !isHeroVisible;
  });

  const cart = [];

  function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
    }
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const cartSummary = document.getElementById("cart-summary");
    if (!cartSummary) return;

    cartSummary.innerHTML = `<h3>Shopping Cart</h3>`;
    if (cart.length === 0) {
      cartSummary.innerHTML += `<p>Your cart is empty.</p>`;
      return;
    }

    let tableHTML = `<table><thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr></thead><tbody>`;

    let totalQuantity = 0;
    let totalCost = 0;

    cart.forEach(item => {
      totalQuantity += item.quantity;
      totalCost += item.price * item.quantity;
      tableHTML += `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`;
    });

    tableHTML += `</tbody></table>`;
    cartSummary.innerHTML += tableHTML;
    cartSummary.innerHTML += `
      <p><strong>Total Items: ${totalQuantity}</strong></p>
      <p><strong>Total Cost: $${totalCost.toFixed(2)}</strong></p>
      <button id="checkout" style="padding: 10px 15px; background-color: #28a745; color: white; border: none; cursor: pointer;">Proceed to Checkout</button>
    `;
  }

  // Event delegation for Add to Cart buttons
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      const productElement = event.target.closest(".product");
      const productName = productElement.querySelector("h3").textContent;
      const productPrice = productElement.querySelector(".price").textContent.replace('$', '');
      addToCart(productName, productPrice);
      alert(`${productName} has been added to your cart.`);
    }
  });

  const cartDisplayContainer = document.createElement('div');
  cartDisplayContainer.id = 'cart-summary';
  cartDisplayContainer.style.position = 'fixed';
  cartDisplayContainer.style.top = '20px';
  cartDisplayContainer.style.right = '20px';
  cartDisplayContainer.style.background = '#fff';
  cartDisplayContainer.style.padding = '20px';
  cartDisplayContainer.style.border = '1px solid #ccc';
  cartDisplayContainer.style.zIndex = '1000';
  document.body.appendChild(cartDisplayContainer);

  const products = [
    { id: 1, name: "Floral Kurti", price: 1000, category: "Women", image: "images.jpeg" },
    { id: 2, name: "Block Print Dupatta", price: 450, category: "Women", image: "duppata.jpeg" },
    { id: 3, name: "Embroidered Bag", price: 1500, category: "Accessories", image: "bag.jpeg" },
    { id: 4, name: "Silk Saree", price: 3500, category: "Women", image: "saree.jpeg" },
    { id: 5, name: "Woolen Scarf", price: 950, category: "Accessories", image: "scarf.jpeg" },
    { id: 6, name: "Cashmere Sweater", price: 1500, category: "Women", image: "sweater.jpeg" },
    { id: 7, name: "Peacoat Jacket", price: 5000, category: "Men", image: "jacket.jpeg" },
    { id: 8, name: "Denim Jeans", price: 999, category: "Men", image: "Jeans.jpeg" },
    { id: 9, name: "Summer Dress", price: 5500, category: "Women", image: "dress.jpeg" },
    { id: 10, name: "Summer Sandals", price: 2500, category: "Accessories", image: "Sandals.jpeg" }
  ];

  function renderProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    filteredProducts.forEach(product => {
      const productElement = document.createElement("article");
      productElement.classList.add("product");
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      productList.appendChild(productElement);
    });
  }

  const categoryFilter = document.getElementById("category-filter");
  categoryFilter.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts = selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);
    renderProducts(filteredProducts);
  });

  const priceSort = document.getElementById("price-sort");
  priceSort.addEventListener("change", (event) => {
    const selectedSort = event.target.value;
    const category = categoryFilter.value;
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
    const sortedProducts = [...filteredProducts].sort((a, b) => selectedSort === "asc" ? a.price - b.price : b.price - a.price);
    renderProducts(sortedProducts);
  });

  renderProducts(products);
});