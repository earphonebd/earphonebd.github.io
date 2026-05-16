document.addEventListener('DOMContentLoaded', () => {
  // --- Global Toast Logic ---
  window.showToast = (msg) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${msg}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.5s';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  };

  // Product Database
  const products = {
    'p1_white': {
      title: 'AirPods Pro 2nd',
      price: '599 TK',
      regularPrice: '1,200 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_dubai_white.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'টাচ কন্ট্রোল ও প্রিমিয়াম লুক', 'দারুণ সাউন্ড কোয়ালিটি', 'ক্লিয়ার মাইক ও হাই বেস', 'ব্যাটারি: 3.5-4 ঘণ্টা', 'কেস চার্জ: 4 বার'],
      reviews: [
        { name: "Sajid Hasan", text: "প্রোডাক্ট অনেক ভালো হয়েছে। Sound quality is amazing! 💯" },
        { name: "Arifur Rahman", text: "চার্জ অনেক ভালো টিকে। Delivery ও খুব ফাস্ট ছিল।" },
        { name: "Muna Ahmed", text: "খুব সুন্দর এবং ক্লিয়ার সাউন্ড। রিকমেন্ডেড!" },
        { name: "Joy Kumar", text: "প্যাকেজিং টা দারুণ ছিল। একদম প্রিমিয়াম ফিল।" },
        { name: "Nazmul Haque", text: "দাম অনুযায়ী সেরা কোয়ালিটি। ৫ দিন হলো চালাচ্ছি।" },
        { name: "Sifat Ullah", text: "পপ-আপ অ্যানিমেশন একদম আসলটার মতো। সাউন্ড অনেক ক্লিয়ার।" },
        { name: "Mitu Akter", text: "অনেক ভয় পেয়েছিলাম, কিন্তু হাতে পাওয়ার পর সব ভয় দূর হয়েছে।" },
        { name: "Hridoy Khan", text: "২ দিনেই হাতে পেয়েছি। ফাস্ট ডেলিভারি আর ভালো প্রোডাক্ট।" },
        { name: "Sultana Razia", text: "সাদা রং টা দেখতে খুব সুন্দর। ক্লিয়ার সাউন্ড।" },
        { name: "Anwar Hossain", text: "ভালোই সার্ভিস দিচ্ছে। বাসের মাঝেও গান শোনা যায়।" }
      ]
    },
    'p1_black': {
      title: 'AirPods Pro 2nd',
      price: '649 TK',
      regularPrice: '1,300 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_dubai_black.png',
      features: ['এডিশন: দুবাই', 'কালার: ম্যাট ব্ল্যাক', 'টাচ কন্ট্রোল ও প্রিমিয়াম লুক', 'দারুণ সাউন্ড কোয়ালিটি', 'ক্লিয়ার মাইক ও হাই বেস', 'ব্যাটারি: 3.5-4 ঘণ্টা', 'কেস চার্জ: 4 বার'],
      reviews: [
        { name: "Mahbub Alom", text: "ম্যাট ব্ল্যাক কালারটা জাস্ট অসাধারণ! প্রিমিয়াম ফিল দেয়।" },
        { name: "Tanvir Ahmed", text: "একদম হুবহু অরিজিনাল এর মত। বেস খুব জোস!" },
        { name: "Imran Hossain", text: "কালো রং টা অনেক গর্জিয়াস। কানে খুব ভালো ফিট হয়।" },
        { name: "Srabonti Akter", text: "উপহার দেওয়ার জন্য কিনেছিলাম, সে খুব পছন্দ করেছে।" },
        { name: "Rifat Hasan", text: "অরিজিনাল এর সাথে কোনো পার্থক্য নেই বললেই চলে।" },
        { name: "Sumon Das", text: "বেস কোয়ালিটি অনেক জোস। যারা গান শুনতে ভালোবাসেন তাদের জন্য বেস্ট।" },
        { name: "Farhana Islam", text: "অনেকদিন পর ভালো একটা জিনিস পেলাম। ধন্যবাদ।" },
        { name: "Jasim Uddin", text: "প্যাকিং টা খুব ভালো ছিল। কালারটা খুব সুন্দর।" },
        { name: "Rina Begum", text: "সাউন্ড কোয়ালিটি নিয়ে কোনো অভিযোগ নেই।" },
        { name: "Tariqul Islam", text: "৫-৬ ঘণ্টা ব্যাকআপ পাচ্ছি অনায়াসে।" }
      ]
    },
    'p2_white': {
      title: 'AirPods Pro 2nd',
      price: '399 TK',
      regularPrice: '800 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_china_white.png',
      features: ['এডিশন: চায়না', 'কালার: ক্লাসিক হোয়াইট', 'টাচ কন্ট্রোল ও স্টাইলিশ লুক', 'ভালো সাউন্ড ও বাজেট ফ্রেন্ডলি', 'ব্যাটারি: 2.5-3 ঘণ্টা', 'কেস চার্জ: 4 বার'],
      reviews: [
        { name: "Samiul Islam", text: "বাজেট অনুযায়ী অনেক ভালো। পপ-আপ অ্যানিমেশন কাজ করে।" },
        { name: "Rakib Hasan", text: "কম দামে এর থেকে ভালো আর কিছু হয় না। ডেলিভারি ফাস্ট ছিল।" },
        { name: "Priya Ghosh", text: "বেশি টাকা খরচ করতে না চাইলে এটা বেস্ট অপশন।" },
        { name: "Ashikur Rahman", text: "১ সপ্তাহ হলো ব্যবহার করছি, কোনো সমস্যা নেই।" },
        { name: "Niloy Das", text: "লুকিং টা একদম অরিজিনাল এর মত।" },
        { name: "Sonia Akter", text: "সস্তায় ভালো জিনিস। সাউন্ড কোয়ালিটি ও মোটামুটি ভালো।" },
        { name: "Fahim Ahmed", text: "বাজেট ফ্রেন্ডলি প্রোডক্ট। গিফট দেওয়ার জন্য দারুণ।" },
        { name: "Ayesha Khatun", text: "১ দিনেই ডেলিভারি পেয়েছি। ধন্যবাদ ইয়ারফোন বিডি।" },
        { name: "Zubair Hossain", text: "টাচ কন্ট্রোল গুলো ভালো কাজ করে।" },
        { name: "Nasrin Sultana", text: "দাম অনুযায়ী এটা অনেক প্রিমিয়াম।" }
      ]
    },
    'p2_black': {
      title: 'AirPods Pro 2nd',
      price: '449 TK',
      regularPrice: '900 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_2nd_generation_china_black.png',
      features: ['এডিশন: চায়না', 'কালার: ম্যাট ব্ল্যাক', 'টাচ কন্ট্রোল ও স্টাইলিশ লুক', 'ভালো সাউন্ড ও বাজেট ফ্রেন্ডলি', 'ব্যাটারি: 2.5-3 ঘণ্টা', 'কেস চার্জ: 4 বার'],
      reviews: [
        { name: "Farhan Ahmed", text: "প্যাকিং খুব ভালো ছিল। কালারটা খুব সুন্দর।" },
        { name: "Imran Khan", text: "অবিশ্বাস্য সাউন্ড এই দামে! অনেক ভালো সার্ভিস।" },
        { name: "Sayed Ali", text: "খুব দ্রুত হাতে পেয়েছি। কোয়ালিটি ও অনেক ভালো।" },
        { name: "Mitu Akter", text: "অল্প দামে ভালো একটা জিনিস পেলাম।" },
        { name: "Nayeem Islam", text: "ভালোই সার্ভিস দিচ্ছে।" },
        { name: "Shamim Reza", text: "কালো রং টা ম্যাট ফিনিশ, দেখতে খুব সুন্দর লাগে।" },
        { name: "Lata Mondal", text: "চার্জ ভালোই থাকে। সাউন্ড একদম ক্লিয়ার।" },
        { name: "Kamrul Hasan", text: "কম বাজেটে সেরা চয়েস।" },
        { name: "Rehana Parvin", text: "পণ্যটি সত্যিই দারুণ। চেক করে নিতে পেরেছি।" },
        { name: "Saiful Bari", text: "ধন্যবাদ Earphone BD!" }
      ]
    },
    'p3': {
      title: 'AirPods Pro 2nd ANC',
      price: '1,190 TK',
      regularPrice: '2,500 TK',
      discount: '52% OFF',
      image: 'assets/airpod_pro_2nd_generation_premium_anc.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'নয়েজ ক্যান্সেলেশন (ANC)', 'টাচ কন্ট্রোল ও হাই বেস', 'বেটার মাইক ও ডিপ বেস', 'ব্যাটারি: 4-5 ঘণ্টা', 'কেস চার্জ: 4 বার', '1 বছরের সার্ভিস ওয়ারেন্টি'],
      reviews: [
        { name: "Sadia Afrin", text: "ANC ফিচারটা দারুণ কাজ করে। বাসের শব্দের মধ্যেও গান ক্লিয়ার শোনা যায়।" },
        { name: "Hasan Mahamud", text: "প্রিমিয়াম কোয়ালিটি। সাউন্ড এর বেইজ টা অনেক ক্লিন।" },
        { name: "Rubel Ahmed", text: "নয়েজ ক্যান্সেলেশন টা অসাধারণ। একদম শান্তিতে গান শোনা যায়।" },
        { name: "Faria Islam", text: "মাইক অনেক ক্লিয়ার, কথা বলতে কোনো সমস্যা হয় না।" },
        { name: "Kamal Uddin", text: "সরাসরি বলতে গেলে পয়সা উসুল প্রোডাক্ট।" },
        { name: "Tanvir Hossain", text: "১ বছরের ওয়ারেন্টি থাকায় নিশ্চিন্তে কেনা যায়। সার্ভিস খুব ভালো।" },
        { name: "Moushumi Akter", text: "অরিজিনাল এর সাথে কোনো পার্থক্য পাইনি। বেস্ট।" },
        { name: "Saidur Rahman", text: "খুব প্রিমিয়াম লুক। কানে দিয়ে বসে থাকলে বাইরের শব্দ আসে না বললেই চলে।" },
        { name: "Nitu Das", text: "সাউন্ড কোয়ালিটি এবং বিল্ড কোয়ালিটি দুটোই দারুণ।" },
        { name: "Abir Hasan", text: "এটাই খুঁজছিলাম অনেকদিন। অনেক ধন্যবাদ।" }
      ]
    },
    'p4': {
      title: 'AirPods Pro 3rd ANC',
      price: '1,990 TK',
      regularPrice: '4,000 TK',
      discount: '50% OFF',
      image: 'assets/airpod_pro_3rd_generation_premium_anc.png',
      features: ['এডিশন: দুবাই', 'কালার: ক্লাসিক হোয়াইট', 'নয়েজ ক্যান্সেলেশন (ANC)', 'টাচ কন্ট্রোল ও হাই বেস', 'বেস্ট কল কোয়ালিটি ও ডিপ বেস', 'ব্যাটারি: 5-6 ঘণ্টা', 'কেস চার্জ: 4 বার', '1 বছরের সার্ভিস ওয়ারেন্টি'],
      reviews: [
        { name: "Jahidul Islam", text: "এখন পর্যন্ত আমার কেনা সেরা ইয়ারফোন। একদম অরিজিনাল এর মত ফিল।" },
        { name: "Rumana Akter", text: "সাউন্ড এবং কল কোয়ালিটি দুটোই টপ লেভেল। ধন্যবাদ Earphone BD!" },
        { name: "Mustakim Billah", text: "হাই-এন্ড কোয়ালিটি। যারা বেস্ট টা চান তারা এটা নিতে পারেন।" },
        { name: "Sumaiya Jahan", text: "ব্যাটারি ব্যাকআপ অনেক ভালো, ৫-৬ ঘণ্টা অনায়াসে চলে।" },
        { name: "Niaz Mahmud", text: "অসাধারণ এক্সপেরিয়েন্স। ANC টা নেক্সট লেভেল।" },
        { name: "Fahim Faisal", text: "কল কোয়ালিটি খুব ভালো। বাইক চালানোর সময় ও ক্লিয়ার কথা বলা যায়।" },
        { name: "Sharmin Shila", text: "প্রোডাক্ট টি হাতে পাওয়ার পর আমি অবাক হয়ে গেছি। জাস্ট অসাম!" },
        { name: "Rafiqul Islam", text: "দুবাই ভেরিয়েন্ট টা আসলেও প্রিমিয়াম। ওয়ারেন্টি ও আছে।" },
        { name: "Tisha Akter", text: "সেরা সাউন্ড বেইজ। গান শোনার মজাটাই আলাদা।" },
        { name: "Imran Chowdhury", text: "সবাইকে রিকমেন্ড করছি এটা নেওয়ার জন্য।" }
      ]
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
  let productId = urlParams.get('product');
  
  // Fallback to first product if none specified (prevents empty "Product Title" issue)
  if (!productId && (document.getElementById('product-title') || document.getElementById('orderForm'))) {
    productId = 'p1_white';
  }

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

      // Update reviews
      const reviewList = document.getElementById('review-list');
      if (reviewList && product.reviews) {
        reviewList.innerHTML = product.reviews.map(rev => `
          <div class="review-item">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <strong style="display: block; font-size: 1.1rem;">${rev.name}</strong>
              <div class="verified-badge">
                ভেরিফাইড কাস্টমার <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${rev.text}</p>
          </div>
        `).join('');
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
    }
  }

  // --- Order Page Logic ---
  let currentProductPrice = 0;
  let currentQty = 1;
  let currentShipping = 29;

  window.updateQty = (change) => {
    currentQty = Math.max(1, currentQty + change);
    const qtyEl = document.getElementById('summary-qty');
    if (qtyEl) qtyEl.innerText = currentQty;
    calculateTotals();
  };

  window.updateShipping = (area) => {
    const options = document.querySelectorAll('.shipping-option');
    if (options.length === 0) return;
    
    options.forEach(opt => opt.classList.remove('selected'));
    
    if (area === 'inside') {
      options[0].classList.add('selected');
      currentShipping = 29;
      document.getElementById('shipping-label').innerText = 'ঢাকার ভেতরে';
    } else {
      options[1].classList.add('selected');
      currentShipping = 49;
      document.getElementById('shipping-label').innerText = 'ঢাকার বাইরে';
    }
    document.getElementById('summary-shipping').innerText = `৳${currentShipping}`;
    calculateTotals();
  };

  function calculateTotals() {
    const subtotal = currentProductPrice * currentQty;
    const total = subtotal + currentShipping;
    
    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    const btnTotalEl = document.getElementById('btn-total');
    
    if (subtotalEl) subtotalEl.innerText = `৳${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.innerText = `৳${total.toLocaleString()}`;
    if (btnTotalEl) btnTotalEl.innerText = `৳${total.toLocaleString()}`;
  }

  if (productId && products[productId]) {
    const product = products[productId];
    currentProductPrice = parseInt(product.price.replace(/[^0-9]/g, ''));
    
    const summaryImg = document.getElementById('summary-img');
    if (summaryImg) {
      summaryImg.src = product.image;
      document.getElementById('summary-title').textContent = product.title;
      document.getElementById('summary-price').textContent = `৳${currentProductPrice.toLocaleString()}`;
      calculateTotals();
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
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
    }
  });

  // Order Form Submit
  // Global Error Catcher for Debugging
  window.onerror = function(msg, url, line) {
    if (typeof showToast === 'function') showToast("Error: " + msg);
    return false;
  };

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

  // --- Product Page Tabs & Reviews ---
  window.switchTab = (tabName) => {
    // Buttons
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.innerText.includes(tabName === 'features' ? 'বিশেষত্ব্য' : 'রিভিউ')) {
        btn.classList.add('active');
      }
    });

    // Content
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');
  };

  window.addReview = () => {
    const name = document.getElementById('rev-name').value;
    const text = document.getElementById('rev-text').value;

    if (!name || !text) {
      showToast('দয়া করে আপনার নাম এবং মতামত লিখুন।');
      return;
    }

    const reviewList = document.getElementById('review-list');
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
      <strong style="display: block; margin-bottom: 5px;">${name}</strong>
      <p style="font-size: 0.95rem; color: var(--text-secondary);">${text}</p>
    `;
    
    reviewList.prepend(newReview);
    document.getElementById('rev-name').value = '';
    document.getElementById('rev-text').value = '';
    showToast('ধন্যবাদ! আপনার রিভিউটি যুক্ত হয়েছে।');
  };

  // --- Hero Text Rotation ---
  const heroTexts = ["প্রিমিয়াম সাউন্ড", "সেরা কোয়ালিটি", "বাজেট ফ্রেন্ডলি", "স্মার্ট ফিচার"];
  let heroIndex = 0;
  const heroEl = document.getElementById('dynamic-hero-text');
  
  if (heroEl) {
    setInterval(() => {
      heroEl.style.opacity = 0;
      setTimeout(() => {
        heroIndex = (heroIndex + 1) % heroTexts.length;
        heroEl.innerText = heroTexts[heroIndex];
        heroEl.style.opacity = 1;
      }, 300);
    }, 3000);
  }

  // --- Dynamic Reviews ---
  const reviews = [
    { name: "Sajid Hasan", text: "প্রোডাক্ট অনেক ভালো হয়েছে। Sound quality is amazing! 💯", color: "#6b7280" },
    { name: "Arifur Rahman", text: "চার্জ অনেক ভালো টিকে। Delivery ও খুব ফাস্ট ছিল।", color: "#3b82f6" },
    { name: "Tanim Islam", text: "Mic quality অনেক clear. এই price এ honestly best!", color: "#8b5cf6" },
    { name: "Mahbub Alom", text: "অরিজিনাল প্রোডাক্ট পেয়েছি। ধন্যবাদ ইয়ারফোন বিডি!", color: "#10b981" },
    { name: "Tanvir Ahmed", text: "একদম হুবহু অরিজিনাল এর মত। বেস খুব জোস!", color: "#f59e0b" },
    { name: "Samiul Islam", text: "ডেলিভারি ম্যান অনেক হেল্পফুল ছিল। পপ-আপ অ্যানিমেশন কাজ করে।", color: "#ef4444" },
    { name: "Rakib Hasan", text: "দাম অনুযায়ী অনেক প্রিমিয়াম। ৫ দিন হলো চালাচ্ছি, কোনো সমস্যা পাইনি।", color: "#ec4899" },
    { name: "Farhan Ahmed", text: "প্যাকিং খুব ভালো ছিল। প্রিমিয়াম একটা ফিল আছে।", color: "#6366f1" },
    { name: "Imran Khan", text: "অবিশ্বাস্য সাউন্ড এই দামে! অনেক ভালো সার্ভিস। ⭐⭐⭐⭐⭐", color: "#4f46e5" },
    { name: "Sadia Afrin", text: "আমার দেখা সেরা অনলাইন শপ। ৩ দিনে ডেলিভারি পেয়েছি।", color: "#db2777" },
    { name: "Hasan Mahamud", text: "সাউন্ড কোয়ালিটি খুব জোস, প্রিমিয়াম প্যাকিং।", color: "#059669" },
    { name: "Jahidul Islam", text: "সব থেকে বড় কথা হলো পপ-আপ অ্যানিমেশন টা একদম আসল এর মত।", color: "#2563eb" },
    { name: "Rumana Akter", text: "অনেক ভয় পেয়েছিলাম যে ফেক প্রোডাক্ট পাবো কি না, কিন্তু হাতে পাওয়ার পর সব ভয় দূর হয়েছে।", color: "#7c3aed" },
    { name: "Sazzad Hossain", text: "ক্লিয়ার সাউন্ড আর ব্যাটারি ব্যাকআপ অসাধারণ। recommended!", color: "#ea580c" },
    { name: "Anisur Rahman", text: "পণ্যটি সত্যিই দারুণ। ক্যাশ অন ডেলিভারিতে চেক করে নিতে পেরেছি।", color: "#16a34a" },
    { name: "Maimuna Khatun", text: "অনেক সুন্দর লুকিং। আমি আমার ফ্রেন্ডদের ও সাজেস্ট করবো। 😍", color: "#be185d" },
    { name: "Fahim Faisal", text: "অল্প বাজেটে সেরা চয়েস হতে পারে এটি। ব্যাটারি ৩-৪ ঘণ্টা অনায়াসেই যায়।", color: "#475569" },
    { name: "Tarek Aziz", text: "সাউন্ড এর বেইজ টা অনেক ক্লিন। ধন্যবাদ Earphone BD!", color: "#0891b2" },
    { name: "Shariful Islam", text: "১ বছর ওয়ারেন্টি থাকায় নিশ্চিন্তে কেনা যায়। সার্ভিস খুব ভালো।", color: "#4338ca" },
    { name: "Shumon Rezwan", text: "ডেলিভারি খুব ফাস্ট ছিল। ২ দিনেই হাতে পেয়েছি। ধন্যবাদ!", color: "#15803d" }
  ];

  const reviewContainer = document.getElementById('reviews-container');
  if (reviewContainer) {
    function updateReviews() {
      const shuffled = [...reviews].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      const brandReplies = [
        "ফিডব্যাক এর জন্য ধন্যবাদ! আমরা সবসময় সেরা কোয়ালিটি দেওয়ার চেষ্টা করি। 😊",
        "আপনার মূল্যবান মতামতের জন্য ধন্যবাদ। আমাদের সাথেই থাকুন। ❤️",
        "আমরা খুশি যে আপনি প্রোডাক্টটি পছন্দ করেছেন! সেরা সার্ভিস দেওয়াই আমাদের লক্ষ্য। 🙌",
        "ধন্যবাদ! আমরা এভাবেই সারা বাংলাদেশে কোয়ালিটি নিশ্চিত করে আসছি। 🚚",
        "আপনাদের এই ভালোবাসাই আমাদের এগিয়ে যাওয়ার প্রেরণা। ধন্যবাদ! ✨"
      ];
      const randomReply = brandReplies[Math.floor(Math.random() * brandReplies.length)];
      
      let html = '';
      selected.forEach((rev, index) => {
        html += `
          <div class="message-bubble message-received" style="animation: fadeInUp 0.5s ease forwards; animation-delay: ${index * 0.2}s; opacity: 0;">
            <div class="message-header">
              <div class="avatar" style="background-color: ${rev.color}">${rev.name.charAt(0)}</div>
              <strong style="font-size: 0.9rem;">${rev.name}</strong>
            </div>
            ${rev.text}
          </div>
        `;
        if (index === 0) {
          html += `
            <div class="message-bubble message-sent" style="animation: fadeInUp 0.5s ease forwards; animation-delay: 0.4s; opacity: 0;">
              <strong style="font-size: 0.8rem; display: block; margin-bottom: 5px; color: rgba(255,255,255,0.9);">Earphone BD</strong>
              ${randomReply}
            </div>
          `;
        }
      });
      reviewContainer.innerHTML = html;
    }

    updateReviews();
    setInterval(updateReviews, 8000);
  }

});
