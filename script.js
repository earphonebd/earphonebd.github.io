document.addEventListener('DOMContentLoaded', () => {
  // Product Database
  const products = {
    'p1_white': {
      title: 'AirPods Pro 2nd',
      price: '599 TK',
      regularPrice: '1,200 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_dubai_white.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'টাচ কন্ট্রোল ও প্রিমিয়াম লুক', 'দারুণ সাউন্ড কোয়ালিটি', 'ক্লিয়ার মাইক ও হাই বেস', 'ব্যাটারি: 3.5-4 ঘণ্টা', 'কেস চার্জ: 4 বার']
    },
    'p1_black': {
      title: 'AirPods Pro 2nd',
      price: '649 TK',
      regularPrice: '1,300 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_dubai_black.png',
      features: ['এডিশন: দুবাই', 'কালার: ম্যাট ব্ল্যাক', 'টাচ কন্ট্রোল ও প্রিমিয়াম লুক', 'দারুণ সাউন্ড কোয়ালিটি', 'ক্লিয়ার মাইক ও হাই বেস', 'ব্যাটারি: 3.5-4 ঘণ্টা', 'কেস চার্জ: 4 বার']
    },
    'p2_white': {
      title: 'AirPods Pro 2nd',
      price: '399 TK',
      regularPrice: '800 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_china_white.png',
      features: ['এডিশন: চায়না', 'কালার: ক্লাসিক হোয়াইট', 'টাচ কন্ট্রোল ও স্টাইলিশ লুক', 'ভালো সাউন্ড ও বাজেট ফ্রেন্ডলি', 'ব্যাটারি: 2.5-3 ঘণ্টা', 'কেস চার্জ: 4 বার']
    },
    'p2_black': {
      title: 'AirPods Pro 2nd',
      price: '449 TK',
      regularPrice: '900 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_china_black.png',
      features: ['এডিশন: চায়না', 'কালার: ম্যাট ব্ল্যাক', 'টাচ কন্ট্রোল ও স্টাইলিশ লুক', 'ভালো সাউন্ড ও বাজেট ফ্রেন্ডলি', 'ব্যাটারি: 2.5-3 ঘণ্টা', 'কেস চার্জ: 4 বার']
    },
    'p3': {
      title: 'AirPods Pro 2nd ANC',
      price: '1,190 TK',
      regularPrice: '2,500 TK',
      discount: '52% OFF',
      image: 'assets/airpod_pro_2nd_generation_premium_anc.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'নয়েজ ক্যান্সেলেশন (ANC)', 'টাচ কন্ট্রোল ও হাই বেস', 'বেটার মাইক ও ডিপ বেস', 'ব্যাটারি: 4-5 ঘণ্টা', 'কেস চার্জ: 4 বার', '1 বছরের সার্ভিস ওয়ারেন্টি']
    },
    'p4': {
      title: 'AirPods Pro 3rd ANC',
      price: '1,990 TK',
      regularPrice: '4,000 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_3rd_generation_premium_anc.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'নয়েজ ক্যান্সেলেশন (ANC)', 'টাচ কন্ট্রোল ও হাই বেস', 'বেস্ট কল কোয়ালিটি ও ডিপ বেস', 'ব্যাটারি: 5-6 ঘণ্টা', 'কেস চার্জ: 4 বার', '1 বছরের সার্ভিস ওয়ারেন্টি']
    }
  };

  // Dynamic Stock Counter Logic
  const getStockCount = (id) => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDate();
    // Use ID, day and hour to create a number that changes every few hours
    // But stays consistent for at least an hour for the same user
    let seed = (id.length + day + Math.floor(hour / 3)) % 5;
    let count = 3 + seed; // Returns 3, 4, 5, 6, or 7
    return `🔥 মাত্র ${count} টি বাকি!`;
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
      if (stockEl) {
        stockEl.textContent = getStockCount(productId);
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

      // Show warranty badge for specific models (ANC models)
      const warrantyBadge = document.getElementById('warranty-badge');
      if (warrantyBadge) {
        if (productId === 'p3' || productId === 'p4') {
          warrantyBadge.style.display = 'flex';
        } else {
          warrantyBadge.style.display = 'none';
        }
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
    const names = ["ঢাকা থেকে আবির", "চট্টগ্রাম থেকে সজীব", "সিলেট থেকে মিতু", "রাজশাহী থেকে কামাল", "খুলনা থেকে সুমন", "বরিশাল থেকে রিফাত", "গাজীপুর থেকে নাসির", "কুমিল্লা থেকে তানিয়া"];
    const salesProducts = [
      { title: "AirPods Pro 2nd", img: "assets/airpod_pro_2nd_generation_dubai_white.png" },
      { title: "AirPods Pro 2nd", img: "assets/airpod_pro_2nd_generation_dubai_black.png" },
      { title: "AirPods Pro 3rd", img: "assets/airpod_pro_3rd_generation_premium_anc.png" }
    ];

    function showNotification() {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomProduct = salesProducts[Math.floor(Math.random() * salesProducts.length)];

      document.getElementById('sales-name').innerText = randomName;
      document.getElementById('sales-desc').innerText = `এইমাত্র ${randomProduct.title} অর্ডার করেছেন`;
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

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  const speed = 100; // Lower is faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const trustSection = document.querySelector('.trust-badges');
  if (trustSection) observer.observe(trustSection);

});
