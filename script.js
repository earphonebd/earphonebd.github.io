document.addEventListener('DOMContentLoaded', () => {
  // Product Database
  const products = {
    'p1_white': {
      title: 'AirPods Pro 2nd Gen',
      price: '599 TK',
      regularPrice: '1,200 TK',
      discount: '50% OFF',
      stock: '🔥 মাত্র ৪ টি বাকি!',
      image: 'assets/product_white.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'দারুণ সাউন্ড কোয়ালিটি', 'ক্লিয়ার মাইক ও প্রিমিয়াম লুক', 'ব্যাটারি: ৩.৫-৪ ঘণ্টা', 'কেস চার্জ: ৩ বার']
    },
    'p1_black': {
      title: 'AirPods Pro 2nd Gen',
      price: '649 TK',
      regularPrice: '1,300 TK',
      discount: '50% OFF',
      stock: '🔥 মাত্র ৩ টি বাকি!',
      image: 'assets/product_black.png',
      features: ['এডিশন: দুবাই', 'কালার: ম্যাট ব্ল্যাক', 'দারুণ সাউন্ড কোয়ালিটি', 'ক্লিয়ার মাইক ও প্রিমিয়াম লুক', 'ব্যাটারি: ৩.৫-৪ ঘণ্টা', 'কেস চার্জ: ৩ বার']
    },
    'p2_white': {
      title: 'AirPods Pro 2nd Gen',
      price: '399 TK',
      regularPrice: '800 TK',
      discount: '50% OFF',
      stock: '🔥 মাত্র ৭ টি বাকি!',
      image: 'assets/product_white.png',
      features: ['এডিশন: চায়না', 'কালার: ক্লাসিক হোয়াইট', 'ভালো সাউন্ড ও স্টাইলিশ লুক', 'বাজেট ফ্রেন্ডলি', 'ব্যাটারি: ২.৫-৩ ঘণ্টা', 'কেস চার্জ: ২-৩ বার']
    },
    'p2_black': {
      title: 'AirPods Pro 2nd Gen',
      price: '449 TK',
      regularPrice: '900 TK',
      discount: '50% OFF',
      stock: '🔥 মাত্র ৫ টি বাকি!',
      image: 'assets/product_black.png',
      features: ['এডিশন: চায়না', 'কালার: ম্যাট ব্ল্যাক', 'ভালো সাউন্ড ও স্টাইলিশ লুক', 'বাজেট ফ্রেন্ডলি', 'ব্যাটারি: ২.৫-৩ ঘণ্টা', 'কেস চার্জ: ২-৩ বার']
    },
    'p3': {
      title: 'AirPods Pro 2nd Gen ANC',
      price: '1,190 TK',
      regularPrice: '2,500 TK',
      discount: '52% OFF',
      stock: '🔥 মাত্র ২ টি বাকি!',
      image: 'assets/product_white.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'নয়েজ ক্যান্সেলেশন (ANC)', 'বেটার মাইক ও ডিপ বেস', 'ব্যাটারি: ৪-৫ ঘণ্টা', 'কেস চার্জ: ৩-৪ বার']
    },
    'p4': {
      title: 'AirPods Pro 3rd Gen ANC',
      price: '1,990 TK',
      regularPrice: '4,000 TK',
      discount: '50% OFF',
      stock: '🔥 স্টক প্রায় শেষ!',
      image: 'assets/product_white.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'নয়েজ ক্যান্সেলেশন (ANC)', 'বেস্ট কল কোয়ালিটি ও ডিপ বেস', 'ব্যাটারি: ৫-৬ ঘণ্টা', 'কেস চার্জ: ৪ বার পর্যন্ত']
    }
  };

  // URL Parameter parsing for Product/Order Page
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  if (productId && products[productId]) {
    const product = products[productId];

    // --- Product Details Page Injection ---
    const pTitle = document.getElementById('product-title');
    if (pTitle) {
      pTitle.textContent = product.title;
      document.getElementById('product-img').src = product.image;
      document.getElementById('product-price').textContent = product.price;
      
      const regularPriceEl = document.getElementById('product-regular-price');
      if (regularPriceEl && product.regularPrice) {
        regularPriceEl.textContent = `Regular: ${product.regularPrice}`;
      }
      
      const discountEl = document.getElementById('product-discount');
      if (discountEl && product.discount) {
        discountEl.textContent = product.discount;
      }
      
      const stockEl = document.getElementById('product-stock');
      if (stockEl && product.stock) {
        stockEl.textContent = product.stock;
      }
      
      const featuresList = document.getElementById('product-features');
      if (featuresList && product.features) {
        featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
      }

      // Update Buy Now button link
      const buyNowBtn = document.getElementById('buy-now-btn');
      if (buyNowBtn) {
        buyNowBtn.href = `order.html?product=${productId}`;
      }

      // Populate summary on the same page (if order form is present)
      const summaryImg = document.getElementById('summary-img');
      if (summaryImg) {
        summaryImg.src = product.image;
        document.getElementById('summary-title').textContent = product.title;
        document.getElementById('summary-price').textContent = product.price;
      }
    }

    // --- Legacy Order Page Injection (if still exists) ---
    const summaryTitle = document.getElementById('summaryTitle');
    if (summaryTitle) {
      document.getElementById('summaryImage').src = product.image;
      summaryTitle.textContent = product.title;
      document.getElementById('summaryPrice').textContent = product.price;
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
