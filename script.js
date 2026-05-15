document.addEventListener('DOMContentLoaded', () => {
  // Product Database
  const products = {
    'p1_white': {
      title: 'AirPods Pro 2nd Gen (Dubai) - White',
      price: '600 TK',
      image: 'assets/product_white.png'
    },
    'p1_black': {
      title: 'AirPods Pro 2nd Gen (Dubai) - Black',
      price: '650 TK',
      image: 'assets/product_black.png'
    },
    'p2_white': {
      title: 'AirPods Pro 2nd Gen (China) - White',
      price: '400 TK',
      image: 'assets/product_white.png'
    },
    'p2_black': {
      title: 'AirPods Pro 2nd Gen (China) - Black',
      price: '450 TK',
      image: 'assets/product_black.png'
    },
    'p3': {
      title: 'AirPods Pro 2nd Gen ANC (Dubai) - Black',
      price: '1200 TK',
      image: 'assets/product_black.png'
    },
    'p4': {
      title: 'AirPods Pro 3rd Gen ANC (Dubai) - White',
      price: '2000 TK',
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
});
