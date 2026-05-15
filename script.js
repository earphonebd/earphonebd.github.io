document.addEventListener('DOMContentLoaded', () => {
  // Product Database
  const products = {
    'p1_white': {
      title: 'AirPods Pro 2nd Gen (Dubai) - White',
      price: '599 TK',
      image: 'assets/product_white.png'
    },
    'p1_black': {
      title: 'AirPods Pro 2nd Gen (Dubai) - Black',
      price: '649 TK',
      image: 'assets/product_black.png'
    },
    'p2_white': {
      title: 'AirPods Pro 2nd Gen (China) - White',
      price: '399 TK',
      image: 'assets/product_white.png'
    },
    'p2_black': {
      title: 'AirPods Pro 2nd Gen (China) - Black',
      price: '449 TK',
      image: 'assets/product_black.png'
    },
    'p3': {
      title: 'AirPods Pro 2nd Gen ANC (Dubai) - White',
      price: '1,190 TK',
      image: 'assets/product_white.png'
    },
    'p4': {
      title: 'AirPods Pro 3rd Gen ANC (Dubai) - White',
      price: '1,990 TK',
      image: 'assets/product_white.png'
    }
  };

  // URL Parameter parsing for Order Page
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  if (productId && products[productId]) {
    // Auto select product in dropdown
    const productSelect = document.getElementById('productSelect');
    if (productSelect) {
      productSelect.value = productId;
    }

    // Show Visual Order Summary
    const orderSummary = document.getElementById('orderSummary');
    if (orderSummary) {
      orderSummary.style.display = 'block';
      document.getElementById('summaryImage').src = products[productId].image;
      document.getElementById('summaryTitle').textContent = products[productId].title;
      document.getElementById('summaryPrice').textContent = products[productId].price;
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Order Form Submit
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks for your order! Our team will contact you shortly to confirm the delivery.');
      orderForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- FOMO Sales Notifications ---
  const notification = document.getElementById('sales-notification');
  if (notification) {
    const names = ["Abir from Dhaka", "Sajib from Chittagong", "Mitu from Sylhet", "Kamal from Rajshahi", "Sumon from Khulna", "Rifat from Barisal", "Nasir from Gazipur", "Tania from Comilla"];
    const salesProducts = [
      { title: "AirPods Pro 2nd Gen", img: "assets/product_white.png" },
      { title: "AirPods Pro 2nd Gen", img: "assets/product_black.png" },
      { title: "AirPods Pro 3rd Gen", img: "assets/product_white.png" }
    ];

    function showNotification() {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomProduct = salesProducts[Math.floor(Math.random() * salesProducts.length)];

      document.getElementById('sales-name').innerText = randomName;
      document.getElementById('sales-desc').innerText = `Just bought ${randomProduct.title}`;
      document.getElementById('sales-img').src = randomProduct.img;

      notification.classList.add('active');

      setTimeout(() => {
        notification.classList.remove('active');
      }, 5000); // Show for 5 seconds
    }

    // Show first notification after 5 seconds
    setTimeout(() => {
      showNotification();
      // Then repeat every 20-40 seconds
      setInterval(showNotification, Math.floor(Math.random() * 20000) + 20000);
    }, 5000);
  }
});
