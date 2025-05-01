
const plantProducts = [
  { name: "Wandering jew plant ", url: "/cards/hanging.html" },
  { name: "Betal leaf", url: "/cards/hanging.html" },
  { name: "Rugmini Plant", url: "/cards/indoor.html" },
  { name: "Peacelily Plant", url: "/cards/indoor.html" },



    { name: "Aloe Vera", url: "/cards/medicine.html" },
    { name: "Yarrow", url: "/cards/flowering.html" },
    { name: "African Daisy", url: "/cards/flowering.html" },
    { name: "Amaryllis", url: "/cards/flowering.html" },
    { name: "African Lily", url: "/cards/flowering.html" },
    { name: "Strawberries", url: "/cards/hanging.html" },
    { name: "Petunia", url: "/cards/hanging.html" },
    { name: "Moss Rose", url: "/cards/hanging.html" },
    { name: "Bachelors Button", url: "/cards/hanging.html" },
    { name: "Snake Plant", url: "/cards/indoor.html" },
    { name: "Tulsi", url: "/cards/medicine.html" },
    { name: "Rosemary", url: "/cards/medicine.html" },
    { name: "Peppermint", url: "/cards/medicine.html" }
  ];
  
  function handleSearch(query) {
    const resultsBox = document.getElementById('search-results');
    const trimmedQuery = query.trim().toLowerCase();
  
    if (!trimmedQuery) {
      resultsBox.innerHTML = '';
      resultsBox.style.display = 'none';
      return;
    }
  
    const filtered = plantProducts.filter(plant =>
      plant.name.toLowerCase().includes(trimmedQuery)
    );
  
    if (filtered.length > 0) {
      resultsBox.innerHTML = filtered
        .map(item =>
          `<a href="${item.url}" class="search-result-link">${item.name}</a>`
        )
        .join('');
      resultsBox.style.display = 'block';
    } else {
      resultsBox.innerHTML = '<div>No results found</div>';
      resultsBox.style.display = 'block';
    }
  }
  





function searchFromNavbar() {
  const query = document.getElementById('navSearchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.plant-card');
  const noResults = document.getElementById('no-results');
  let found = false;

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.style.display = 'block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.style.display = found ? 'none' : 'block';
  }
}



/* cart */
/* cart */

let shoppingCart = [];

// Add to Cart
function addToCart(name, price) {
  const existingItem = shoppingCart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    shoppingCart.push({ name, price, quantity: 1 });
  }
  updateCart();
  showCartNotification(`${name} has been added to your cart!`);

  setTimeout(() => {
    cartModal.style.display = 'none';
  }, 1000);
}

// Remove Item
function removeFromCart(index) {
  shoppingCart.splice(index, 1);
  updateCart();
}

// Increase Quantity
function increaseQuantity(index) {
  shoppingCart[index].quantity += 1;
  updateCart();
}

// Decrease Quantity
function decreaseQuantity(index) {
  if (shoppingCart[index].quantity > 1) {
    shoppingCart[index].quantity -= 1;
  } else {
    removeFromCart(index);
  }
  updateCart();
}

// Update Cart Display
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  if (!cartItemsContainer || !cartCount || !cartTotal) return;

  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  shoppingCart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${item.name} - ₹${item.price.toFixed(2)}</span>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
    totalItems += item.quantity;
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;

  persistCart();
}

// Toggle Cart Modal
function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Checkout Button - From Cart
function checkout() {
  if (shoppingCart.length === 0) {
    alert("Your cart is empty. Add some plants first!");
    return;
  }

  localStorage.setItem('cart', JSON.stringify(shoppingCart));
  window.location.href = 'billing.html'; // Update path if needed
}

// Complete Payment - From Billing Page
function completePayment() {
  const selectedOption = document.querySelector('input[name="payment"]:checked');
  if (!selectedOption) {
    alert("Please select a payment method.");
    return;
  }

  alert("Order placed successfully! 🌿 Thank you for shopping with us.");

  // Clear cart from both localStorage and memory
  localStorage.removeItem('cart');
  shoppingCart = [];

  // Optional: Redirect to homepage
  window.location.href = 'index.html'; // Change to your homepage if needed
}

// Show Cart Notification
function showCartNotification(message) {
  let notification = document.getElementById('cart-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = '#fff';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 1500);
}

// Persist Cart to localStorage
function persistCart() {
  localStorage.setItem('cart', JSON.stringify(shoppingCart));
}

// Load Cart from localStorage on Page Load
window.addEventListener('DOMContentLoaded', () => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  if (storedCart.length > 0) {
    shoppingCart = storedCart;
    updateCart();
  }
});




// Your existing function from billing page
function loadCart() {
  const container = document.getElementById('cart-summary');
  const totalDisplay = document.getElementById('cart-total');
  container.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price.toFixed(2)}</span>
    `;
    total += item.price;
    container.appendChild(div);
  });

  totalDisplay.textContent = `Total: ₹${total.toFixed(2)}`;
}





/* user name after log in*/

  document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const navLogin = document.getElementById('nav-login');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    const userDropdown = document.getElementById('user-dropdown');
    const logoutLink = document.getElementById('logout-link');

    if (user && user.firstName) {
      // Hide login, show user's name
      navLogin.style.display = 'none';
      userMenu.style.display = 'block';
      userName.textContent = user.firstName;

      // Toggle dropdown on click
      userName.addEventListener('click', function () {
        userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
      });

      // Logout function
      logoutLink.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('loggedInUser');
        window.location.reload();
      });
    } else {
      // Show login if no user
      navLogin.style.display = 'block';
      userMenu.style.display = 'none';
    }
  });



