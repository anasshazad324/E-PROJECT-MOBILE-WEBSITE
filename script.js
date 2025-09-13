// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('show');
    });
  }

  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevSlide = document.querySelector('.prev-slide');
  const nextSlide = document.querySelector('.next-slide');
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  if (slides.length > 0) {
    // Auto slide change every 5 seconds
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);

    // Manual slide controls
    if (prevSlide && nextSlide) {
      prevSlide.addEventListener('click', () => showSlide(currentSlide - 1));
      nextSlide.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
  }

  // Product Image Thumbnail Switching
  const mainProductImage = document.getElementById('mainProductImage');
  const thumbnails = document.querySelectorAll('.thumbnail');

  if (mainProductImage && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Change main image
        const newSrc = this.querySelector('img').src.replace('-thumb', '-large');
        mainProductImage.src = newSrc;
      });
    });
  }

  // Product Color Selection
  const colorOptions = document.querySelectorAll('.color-option');
  if (colorOptions.length > 0) {
    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }

  // Product Storage Selection
  const storageOptions = document.querySelectorAll('.storage-option');
  if (storageOptions.length > 0) {
    storageOptions.forEach(option => {
      option.addEventListener('click', function() {
        storageOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }

  // Quantity Selector
  const quantityMinus = document.querySelector('.quantity-minus');
  const quantityPlus = document.querySelector('.quantity-plus');
  const quantityInput = document.querySelector('.quantity-control input');

  if (quantityMinus && quantityPlus && quantityInput) {
    quantityMinus.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      if (value > parseInt(quantityInput.min)) {
        quantityInput.value = value - 1;
      }
    });

    quantityPlus.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      if (value < parseInt(quantityInput.max)) {
        quantityInput.value = value + 1;
      }
    });
  }

  // Product Tabs
  const tabHeaders = document.querySelectorAll('.tabs-header li');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabHeaders.length > 0 && tabPanes.length > 0) {
    tabHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Update active tab header
        tabHeaders.forEach(h => h.classList.remove('active'));
        this.classList.add('active');
        
        // Update active tab pane
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  // Checkout Steps Navigation
  const continueToPayment = document.getElementById('continueToPayment');
  const continueToReview = document.getElementById('continueToReview');
  const backToShipping = document.getElementById('backToShipping');
  const backToPayment = document.getElementById('backToPayment');
  const checkoutForms = document.querySelectorAll('.checkout-form');
  const steps = document.querySelectorAll('.step');

  function showCheckoutStep(stepIndex) {
    checkoutForms.forEach(form => form.classList.remove('active'));
    checkoutForms[stepIndex].classList.add('active');
    
    steps.forEach(step => step.classList.remove('active'));
    steps[stepIndex].classList.add('active');
  }

  if (continueToPayment) {
    continueToPayment.addEventListener('click', function(e) {
      e.preventDefault();
      showCheckoutStep(1);
    });
  }

  if (continueToReview) {
    continueToReview.addEventListener('click', function(e) {
      e.preventDefault();
      showCheckoutStep(2);
    });
  }

  if (backToShipping) {
    backToShipping.addEventListener('click', function(e) {
      e.preventDefault();
      showCheckoutStep(0);
    });
  }

  if (backToPayment) {
    backToPayment.addEventListener('click', function(e) {
      e.preventDefault();
      showCheckoutStep(1);
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item h3');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      item.addEventListener('click', function() {
        this.parentElement.classList.toggle('active');
      });
    });
  }

  // Price Range Slider
  const priceSlider = document.getElementById('priceRange');
  if (priceSlider) {
    priceSlider.addEventListener('input', function() {
      const minPrice = document.querySelector('.price-values span:first-child');
      const maxPrice = document.querySelector('.price-values span:last-child');
      maxPrice.textContent = '$' + this.value;
    });
  }

  // Cart Item Removal
  const removeButtons = document.querySelectorAll('.remove-item');
  if (removeButtons.length > 0) {
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.closest('.cart-item').remove();
        updateCartTotal();
      });
    });
  }

  // Quantity Changes in Cart
  const quantityControls = document.querySelectorAll('.quantity-control');
  if (quantityControls.length > 0) {
    quantityControls.forEach(control => {
      const minus = control.querySelector('.quantity-minus');
      const plus = control.querySelector('.quantity-plus');
      const input = control.querySelector('input');
      
      minus.addEventListener('click', function() {
        let value = parseInt(input.value);
        if (value > parseInt(input.min)) {
          input.value = value - 1;
          updateCartTotal();
        }
      });
      
      plus.addEventListener('click', function() {
        let value = parseInt(input.value);
        if (value < parseInt(input.max)) {
          input.value = value + 1;
          updateCartTotal();
        }
      });
      
      input.addEventListener('change', function() {
        updateCartTotal();
      });
    });
  }

  // Update Cart Total
  function updateCartTotal() {
    let subtotal = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
      const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
      const quantity = parseInt(item.querySelector('.quantity-control input').value);
      const itemSubtotal = price * quantity;
      
      item.querySelector('.cart-item-subtotal').textContent = '$' + itemSubtotal.toFixed(2);
      subtotal += itemSubtotal;
    });
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = '$' + subtotal.toFixed(2);
    document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = '$' + tax.toFixed(2);
    document.querySelector('.grand-total span:last-child').textContent = '$' + total.toFixed(2);
  }

  // Initialize cart total
  updateCartTotal();

  // Add to Cart Animation
  const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          let count = parseInt(cartCount.textContent);
          cartCount.textContent = count + 1;
          cartCount.classList.add('animate');
          
          // Remove animation class after animation completes
          setTimeout(() => {
            cartCount.classList.remove('animate');
          }, 500);
        }
        
        // Show added to cart message
        alert('Product added to cart!');
      });
    });
  }

  // Live Chat Toggle
  const liveChat = document.getElementById('live-chat');
  if (liveChat) {
    liveChat.addEventListener('click', function(e) {
      if (e.target.classList.contains('chat-toggle-btn')) {
        const chatBox = this.querySelector('.chat-box');
        chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
      }
    });
  }
});

// cart.js - Additional cart functionality
function initializeCart() {
  // Load cart from localStorage if available
  if (localStorage.getItem('cart')) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    updateCartUI(cart);
  }
}

function addToCart(product) {
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI(cart);
}

function updateCartUI(cart) {
  // Update cart count in header
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
      cartCount.style.display = 'flex';
    } else {
      cartCount.style.display = 'none';
    }
  }
  
  // Update cart page if we're on it
  if (document.querySelector('.cart-items')) {
    renderCartItems(cart);
  }
}

function renderCartItems(cart) {
  const cartItemsContainer = document.querySelector('.cart-items');
  if (!cartItemsContainer) return;
  
  // Clear existing items
  const header = cartItemsContainer.querySelector('.cart-header');
  cartItemsContainer.innerHTML = '';
  if (header) cartItemsContainer.appendChild(header);
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    return;
  }
  
  // Render each cart item
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-product">
        <img src="${item.image}" alt="${item.name}">
        <div class="product-details">
          <h3>${item.name}</h3>
          <div class="product-variants">
            <span>Color: ${item.color}</span>
            <span>Storage: ${item.storage}</span>
          </div>
        </div>
      </div>
      <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      <div class="cart-item-quantity">
        <div class="quantity-control">
          <button class="quantity-minus"><i class="fas fa-minus"></i></button>
          <input type="number" value="${item.quantity}" min="1">
          <button class="quantity-plus"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
      <div class="cart-item-remove">
        <button class="remove-item"><i class="fas fa-times"></i></button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  // Add event listeners to new elements
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
      const productName = this.closest('.cart-item').querySelector('h3').textContent;
      removeFromCart(productName);
    });
  });
  
  document.querySelectorAll('.quantity-control').forEach(control => {
    const minus = control.querySelector('.quantity-minus');
    const plus = control.querySelector('.quantity-plus');
    const input = control.querySelector('input');
    
    minus.addEventListener('click', function() {
      let value = parseInt(input.value);
      if (value > 1) {
        input.value = value - 1;
        updateCartQuantity(input);
      }
    });
    
    plus.addEventListener('click', function() {
      let value = parseInt(input.value);
      input.value = value + 1;
      updateCartQuantity(input);
    });
    
    input.addEventListener('change', function() {
      updateCartQuantity(input);
    });
  });
  
  updateCartSummary(cart);
}

function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI(cart);
}

function updateCartQuantity(input) {
  const productName = input.closest('.cart-item').querySelector('h3').textContent;
  const newQuantity = parseInt(input.value);
  
  let cart = JSON.parse(localStorage.getItem('cart'));
  const item = cart.find(item => item.name === productName);
  
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI(cart);
  }
}

function updateCartSummary(cart) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = '$' + subtotal.toFixed(2);
  document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = '$' + tax.toFixed(2);
  document.querySelector('.grand-total span:last-child').textContent = '$' + total.toFixed(2);
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', initializeCart);

const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    // Clear previous errors
    [name, email, subject, message].forEach(field => field.classList.remove("error"));
    [nameError, emailError, subjectError, messageError].forEach(errorDiv => errorDiv.textContent = "");

    // Name validation
    if (name.value.trim() === "") {
      name.classList.add("error");
      nameError.textContent = "Name is required.";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.value.trim() === "") {
      email.classList.add("error");
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      email.classList.add("error");
      emailError.textContent = "Enter a valid email.";
      isValid = false;
    }

    // Subject validation
    if (subject.value === "") {
      subject.classList.add("error");
      subjectError.textContent = "Please select a subject.";
      isValid = false;
    }

    // Message validation
    if (message.value.trim() === "") {
      message.classList.add("error");
      messageError.textContent = "Message is required.";
      isValid = false;
    }

    // If all valid, submit or show success (can be customized)
    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  

// ---------- Hamburger Menu ----------
document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});
