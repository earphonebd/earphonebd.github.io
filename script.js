document.addEventListener('DOMContentLoaded', () => {
  // --- Global Toast Logic ---
  window.showToast = (msg) => {
    const container = document.getElementById('toast-container');
    if (!container) {
      // Create toast container if it doesn't exist
      const newContainer = document.createElement('div');
      newContainer.id = 'toast-container';
      newContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 3000; display: flex; flex-direction: column; gap: 10px;';
      document.body.appendChild(newContainer);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${msg}</span>
    `;
    document.getElementById('toast-container').appendChild(toast);
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
      edition: 'Dubai Edition',
      color: 'Classic White',
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
      edition: 'Dubai Edition',
      color: 'Classic Black',
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
      edition: 'China Edition',
      color: 'Classic White',
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
      edition: 'China Edition',
      color: 'Classic Black',
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
      edition: 'Dubai Premium ANC',
      color: 'Classic White',
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
      edition: 'Dubai Premium ANC',
      color: 'Classic White',
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
              <strong style="font-size: 1.1rem;">${rev.name}</strong>
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
  window.orderItems = [];
  let currentShipping = 49;

  // --- District & Thana Data ---
  const bdLocations = {
    "কক্সবাজার": [
      "উখিয়া",
      "কক্সবাজার সদর",
      "কুতুবদিয়া",
      "চকরিয়া",
      "টেকনাফ",
      "পেকুয়া",
      "মহেশখালী",
      "রামু"
    ],
    "কিশোরগঞ্জ": [
      "অষ্টগ্রাম",
      "ইটনা",
      "কটিয়াদী",
      "করিমগঞ্জ",
      "কিশোরগঞ্জ সদর",
      "কুলিয়ারচর",
      "তাড়াইল",
      "নিকলী",
      "পাকুন্দিয়া",
      "বাজিতপুর",
      "ভৈরব",
      "মিঠামইন",
      "হোসেনপুর"
    ],
    "কুড়িগ্রাম": [
      "উলিপুর",
      "কুড়িগ্রাম সদর",
      "চিলমারী",
      "নাগেশ্বরী",
      "ফুলবাড়ী",
      "ভুরুঙ্গামারী",
      "রাজারহাট",
      "রাজিবপুর",
      "রৌমারী"
    ],
    "কুমিল্লা": [
      "কুমিল্লা সদর",
      "কুমিল্লা সদর দক্ষিণ",
      "চান্দিনা",
      "চৌদ্দগ্রাম",
      "তিতাস",
      "দাউদকান্দি",
      "দেবিদ্বার",
      "নাঙ্গলকোট",
      "বরুড়া",
      "বুড়িচং",
      "ব্রাহ্মণপাড়া",
      "মনোহরগঞ্জ",
      "মনোহরগঞ্জ",
      "মুরাদনগর",
      "মেঘনা",
      "লাকসাম",
      "হোমনা"
    ],
    "কুষ্টিয়া": [
      "কুমারখালী",
      "কুষ্টিয়া সদর",
      "খোকসা",
      "দৌলতপুর",
      "ভেড়ামারা",
      "মিরপুর"
    ],
    "খাগড়াছড়ি": [
      "খাগড়াছড়ি সদর",
      "দিঘীনালা",
      "পানছড়ি",
      "মহালছড়ি",
      "মাটিরাঙ্গা",
      "মানিকছড়ি",
      "রামগড়",
      "লক্ষ্মীছড়ি"
    ],
    "খুলনা": [
      "কয়রা",
      "ডুমুরিয়া",
      "তেরখাদা",
      "দাকোপ",
      "দিঘলিয়া",
      "পাইকগাছা",
      "ফুলতলা",
      "বটিয়াঘাটা",
      "রূপসা"
    ],
    "গাইবান্ধা": [
      "গাইবান্ধা সদর",
      "গোবিন্দগঞ্জ",
      "পলাশবাড়ী",
      "ফুলছড়ি",
      "সাঘাটা",
      "সাদুল্লাপুর",
      "সুন্দরগঞ্জ"
    ],
    "গাজীপুর": [
      "কাপাসিয়া",
      "কালিয়াকৈর",
      "কালীগঞ্জ",
      "গাজীপুর সদর",
      "টঙ্গী",
      "শ্রীপুর"
    ],
    "গোপালগঞ্জ": [
      "কাশিয়ানী",
      "কোটালীপাড়া",
      "গোপালগঞ্জ সদর",
      "টুংগীপাড়া",
      "মুকসুদপুর"
    ],
    "চট্টগ্রাম": [
      "আনোয়ারা",
      "চন্দনাইশ",
      "পটিয়া",
      "ফটিকছড়ি",
      "বাঁশখালী",
      "বোয়ালখালী",
      "মীরসরাই",
      "রাউজান",
      "রাঙ্গুনিয়া",
      "লোহাগড়া",
      "সন্দ্বীপ",
      "সাতকানিয়া",
      "সীতাকুন্ড",
      "হাটহাজারী"
    ],
    "চাঁদপুর": [
      "কচুয়া",
      "চাঁদপুর সদর",
      "ফریدগঞ্জ",
      "মতলব উত্তর",
      "মতলব দক্ষিণ",
      "শাহরাস্তি",
      "হাইমচর",
      "হাজীগঞ্জ"
    ],
    "চাঁপাইনবাবগঞ্জ": [
      "গোমস্তাপুর",
      "নবাবগঞ্জ সদর",
      "নাচোল",
      "ভোলাহাট",
      "শিবগঞ্জ"
    ],
    "চুয়াডাঙ্গা": [
      "আলমডাঙ্গা",
      "চুয়াডাঙ্গা সদর",
      "জীবননগর",
      "দামুড়হুদা"
    ],
    "জয়পুরহাট": [
      "আক্কেলপুর",
      "কালাই",
      "ক্ষেতলাল",
      "জয়পুরহাট সদর",
      "পাঁচবিবি"
    ],
    "জামালপুর": [
      "ইসলামপুর",
      "জামালপুর সদর",
      "দেওয়ানগঞ্জ",
      "নারুন্দি পুলিশ আইসি",
      "বকশীগঞ্জ",
      "মাদারগঞ্জ",
      "মেলান্দহ",
      "সরিষাবাড়ী"
    ],
    "ঝালকাঠি": [
      "কাঠালিয়া",
      "ঝালকাঠি সদর",
      "নলছিটি",
      "রাজাপুর"
    ],
    "ঝিনাইদহ": [
      "কালীগঞ্জ",
      "কোটচাঁদপুর",
      "ঝিনাইদহ সদর",
      "মহেশপুর",
      "শৈলকুপা",
      "হরিণাকুণ্ড"
    ],
    "টাঙ্গাইল": [
      "কালিহাতী",
      "গোপালপুর",
      "ঘাটাইল",
      "টাঙ্গাইল সদর",
      "দেলদুয়ার",
      "ধনবাড়ী",
      "নাগরপুর",
      "বাসাইল",
      "ভুয়াপুর",
      "মধুপুর",
      "মির্জাপুর",
      "সখিপুর"
    ],
    "ঠাকুরগাঁও": [
      "ঠাকুরগাঁও সদর",
      "পীরগঞ্জ",
      "বালিয়াডাঙ্গী",
      "রাণীশংকৈল",
      "হরিপুর"
    ],
    "ঢাকা": [
      "আদাবর",
      "উত্তরা",
      "কেরাণীগঞ্জ",
      "ক্যান্টনমেন্ট",
      "খিলগাঁও",
      "গুলশান",
      "তেজগাঁও",
      "দোহার",
      "ধানমন্ডি",
      "ধামরাই",
      "নবাবগঞ্জ",
      "নিউ মার্কেট",
      "পল্লবী",
      "বাড্ডা",
      "মতিঝিল",
      "মিরপুর",
      "মোহাম্মদপুর",
      "যাত্রাবাড়ী",
      "রমনা",
      "শাহবাগ",
      "সবুজবাগ",
      "সাভার"
    ],
    "দিনাজপুর": [
      "কাহারোল",
      "খানসামা",
      "ঘোড়াঘাট",
      "চিরিরবন্দর",
      "দিনাজপুর সদর",
      "নবাবগঞ্জ",
      "পার্বতীপুর",
      "ফুলবাড়ী",
      "বিরল",
      "বিরামপুর",
      "বীরগঞ্জ",
      "বোচাগঞ্জ",
      "হাকিমপুর"
    ],
    "নওগাঁ": [
      "আত্রাই",
      "ধামইরহাট",
      "নওগাঁ সদর",
      "নিয়ামতপুর",
      "পত্নিতলা",
      "পোরশা",
      "বদলগাছী",
      "মহাদেবপুর",
      "মান্দা",
      "রাণীনগর",
      "সাপাহার"
    ],
    "নড়াইল": [
      "কালিয়া",
      "নড়াইল সদর",
      "লোহাগড়া"
    ],
    "নরসিংদী": [
      "নরসীংদী সদর",
      "পলাশ",
      "বেলাবো",
      "মনোহরদী",
      "রায়পুরা",
      "শিবপুর"
    ],
    "নাটোর": [
      "নাটোর সদর",
      "বড়াইগ্রাম",
      "বাগাতিপাড়া",
      "লালপুর"
    ],
    "নারায়ণগঞ্জ": [
      "আড়াইহাজার",
      "নারায়ণগঞ্জ সদর",
      "বন্দর",
      "রূপগঞ্জ",
      "সিদ্ধিরগঞ্জ",
      "সোনারগাঁ"
    ],
    "নীলফামারী": [
      "কিশোরগঞ্জ",
      "জলঢাকা",
      "ডিমলা",
      "ডোমার",
      "নীলফামারী সদর",
      "সৈয়দপুর"
    ],
    "নেত্রকোণা": [
      "আটপাড়া",
      "কলমাকান্দা",
      "কেন্দুয়া",
      "খালিয়াজুরী",
      "দুর্গাপুর",
      "নেত্রকোণা সদর",
      "পূর্বধলা",
      "বারহাট্টা",
      "মদন",
      "মোহনগঞ্জ"
    ],
    "নোয়াখালী": [
      "কবিরহাট",
      "কোম্পানীগঞ্জ",
      "চাটখিল",
      "নোয়াখালী সদর",
      "বেগমগঞ্জ",
      "সুবর্ণচর",
      "সেনবাগ",
      "সোনাইমুড়ী",
      "হাতিয়া"
    ],
    "পঞ্চগড়": [
      "আটোয়ারী",
      "তেতুলিয়া",
      "দেবীগঞ্জ",
      "পঞ্চগড় সদর",
      "বোদা"
    ],
    "পটুয়াখালী": [
      "কলাপাড়া",
      "গলাচিপা",
      "দশমিনা",
      "দুমকি",
      "পটুয়াখালী সদর",
      "বাউফল",
      "মির্জাগঞ্জ",
      "রাঙ্গাবালী"
    ],
    "পাবনা": [
      "আটঘরিয়া",
      "ঈশ্বরদী",
      "চাটমোহর",
      "পাবনা সদর",
      "ফরিদপুর",
      "বেড়া",
      "ভাঙ্গুড়া",
      "সাঁথিয়া",
      "সুজানগর"
    ],
    "পিরোজপুর": [
      "কাউখালী",
      "জিয়ানগর",
      "নাজিরপুর",
      "নেছারাবাদ",
      "পিরোজপুর সদর",
      "ভান্ডারিয়া",
      "মঠবাড়ীয়া"
    ],
    "ফরিদপুর": [
      "আলফাডাঙ্গা",
      "চরভদ্রাসন",
      "নগরকান্দা",
      "ফরিদপুর সদর",
      "বোয়ালমারী",
      "ভাঙ্গা",
      "মধুখালী",
      "সদরপুর",
      "সালথা"
    ],
    "ফেনী": [
      "ছাগলনাইয়া",
      "দাগনভূঞা",
      "পরশুরাম",
      "ফুলগাজী",
      "ফেনী সদর",
      "সোনাগাজী"
    ],
    "বগুড়া": [
      "আদমদিঘি",
      "কাহালু",
      "গাবতলী",
      "দুপচাঁচিয়া",
      "ধুনট",
      "নন্দীগ্রাম",
      "বগুড়া সদর",
      "শাহজাহানপুর",
      "শিবগঞ্জ",
      "শেরপুর",
      "সারিয়াকান্দি",
      "সোনাতলা"
    ],
    "বরগুনা": [
      "আমতলী",
      "তালতলি",
      "পাথরঘাটা",
      "বরগুনা সদর",
      "বামনা",
      "বেতাগী"
    ],
    "বরিশাল": [
      "আগৈলঝাড়া",
      "উজিরপুর",
      "গৌরনদী",
      "বরিশাল সদর",
      "বাকেরগঞ্জ",
      "বানারীপাড়া",
      "বাবুগঞ্জ",
      "মুলাদী",
      "মেহেন্দিগঞ্জ",
      "হিজলা"
    ],
    "বাগেরহাট": [
      "কচুয়া",
      "চিতলমারী",
      "ফকিরহাট",
      "বাগেরহাট সদর",
      "মোংলা",
      "মোড়েলগঞ্জ",
      "মোল্লাহাট",
      "রামপাল",
      "শরণখোলা"
    ],
    "বান্দরবান": [
      "আলীকদম",
      "থানচি",
      "নাইক্ষ্যংছড়ি",
      "বান্দরবান সদর",
      "রুমা",
      "রোয়াংছড়ি",
      "লামা"
    ],
    "ব্রাহ্মণবাড়িয়া": [
      "আখাউড়া",
      "আশুগঞ্জ",
      "কসবা",
      "নবীনগর",
      "নাসিরনগর",
      "বাঞ্ছারামপুর",
      "বিজয়নগর",
      "ব্রাহ্মণবাড়িয়া সদর",
      "শাহবাজপুর টাউন",
      "সরাইল"
    ],
    "ভোলা": [
      "চরফ্যাশন",
      "তজুমদ্দিন",
      "দৌলতখান",
      "বোরহানউদ্দিন",
      "ভোলা সদর",
      "মনপুরা",
      "লালমোহন"
    ],
    "ময়মনসিংহ": [
      "ঈশ্বরগঞ্জ",
      "গফরগাঁও",
      "গৌরীপুর",
      "ত্রিশাল",
      "ধোবাউড়া",
      "নান্দাইল",
      "ফুলপুর",
      "ফুলবাড়ীয়া",
      "ভালুকা",
      "ময়মনসিংহ সদর",
      "মুক্তাগাছা",
      "হালুয়াঘাট"
    ],
    "মাগুরা": [
      "মাগুরা সদর",
      "মোহাম্মদপুর",
      "শালিখা",
      "শ্রীপুর"
    ],
    "মাদারীপুর": [
      "কালকিনি",
      "মাদারীপুর সদর",
      "রাজৈর",
      "শিবচর"
    ],
    "মানিকগঞ্জ": [
      "ঘিওর",
      "দৌলতপুর",
      "মানিকগঞ্জ সদর",
      "শিবালয়",
      "সাটুরিয়া",
      "সিঙ্গাইর",
      "হরিরামপুর"
    ],
    "মুন্সিগঞ্জ": [
      "গজারিয়া",
      "টংগীবাড়ি",
      "মুন্সীগঞ্জ সদর",
      "লৌহজং",
      "শ্রীনগর",
      "সিরাজদিখান"
    ],
    "মেহেরপুর": [
      "গাংনী",
      "মুজিবনগর",
      "মেহেরপুর সদর"
    ],
    "মৌলভীবাজার": [
      "কমলগঞ্জ",
      "কুলাউড়া",
      "জুড়ী",
      "বড়লেখা",
      "মৌলভীবাজার সদর",
      "রাজনগর",
      "শ্রীমঙ্গল"
    ],
    "যশোর": [
      "অভয়নগর",
      "কেশবপুর",
      "চৌগাছা",
      "ঝিকরগাছা",
      "বাঘারপাড়া",
      "মণিরামপুর",
      "যশোর সদর",
      "শার্শা"
    ],
    "রংপুর": [
      "কাউনিয়া",
      "গংগাচড়া",
      "তারাগঞ্জ",
      "পীরগঞ্জ",
      "পীরগাছা",
      "বদরগঞ্জ",
      "মিঠাপুকুর",
      "রংপুর সদর"
    ],
    "রাঙ্গামাটি": [
      "কাউখালী",
      "কাপ্তাই",
      "জুরাছড়ি",
      "নানিয়ারচর",
      "বরকল",
      "বাঘাইছড়ি",
      "বিলাইছড়ি",
      "রাঙ্গামাটি সদর",
      "রাজস্থলী",
      "লংগদু"
    ],
    "রাজবাড়ী": [
      "কালুখালী",
      "গোয়ালন্দ",
      "পাংশা",
      "বালিয়াকান্দি",
      "রাজবাড়ী সদর"
    ],
    "রাজশাহী": [
      "গোদাগাড়ী",
      "চারঘাট",
      "তানোর",
      "দুর্গাপুর",
      "পবা",
      "পুঠিয়া",
      "বাগমারা",
      "বাঘা",
      "মোহনপুর"
    ],
    "লক্ষ্মীপুর": [
      "কমলনগর",
      "রামগঞ্জ",
      "রামগতি",
      "রায়পুর",
      "লক্ষ্মীপুর সদর"
    ],
    "লালমনিরহাট": [
      "আদিতমারী",
      "কালীগঞ্জ",
      "পাটগ্রাম",
      "লালমনিরহাট সদর",
      "হাতীবান্ধা"
    ],
    "শরীয়তপুর": [
      "গোসাইরহাট",
      "জাজিরা",
      "ডামুড্যা",
      "নড়িয়া",
      "ভেদরগঞ্জ",
      "শরীয়তপুর সদর"
    ],
    "শেরপুর": [
      "ঝিনাইগাতী",
      "নকলা",
      "নালিতাবাড়ী",
      "শেরপুর সদর",
      "শ্রীবরদী"
    ],
    "সাতক্ষীরা": [
      "আশাশুনি",
      "কলারোয়া",
      "কালীগঞ্জ",
      "তালা",
      "দেবহাটা",
      "শ্যামনগর",
      "সাতক্ষীরা সদর"
    ],
    "সিরাজগঞ্জ": [
      "উল্লাপাড়া",
      "কাজীপুর",
      "কামারখন্দ",
      "চৌহালি",
      "তাড়াশ",
      "বেলকুচি",
      "রায়গঞ্জ",
      "শাহজাদপুর",
      "সিরাজগঞ্জ সদর"
    ],
    "সিলেট": [
      "কানাইঘাট",
      "কোম্পানীগঞ্জ",
      "গোয়াইনঘাট",
      "গোলাপগঞ্জ",
      "জকিগঞ্জ",
      "জৈন্তাপুর",
      "দক্ষিণ সুরমা",
      "নবীগঞ্জ",
      "ফেঞ্চুগঞ্জ",
      "বালাগঞ্জ",
      "বিয়ানীবাজার",
      "বিশ্বনাথ",
      "সিলেট সদর"
    ],
    "সুনামগঞ্জ": [
      "ছাতক",
      "জগন্নাথপুর",
      "জামালগঞ্জ",
      "তাহিরপুর",
      "দিরাই",
      "দোয়ারাবাজার",
      "ধর্মপাশা",
      "বিশ্বম্ভরপুর",
      "শান্তিগঞ্জ",
      "শাল্লা",
      "সুনামগঞ্জ সদর"
    ],
    "হবিগঞ্জ": [
      "আজমিরীগঞ্জ",
      "চুনারুঘাট",
      "নবীগঞ্জ",
      "বানিয়াচং",
      "বাহুবল",
      "মাধবপুর",
      "লাখাই",
      "শায়েস্তাগঞ্জ",
      "হবিগঞ্জ সদর"
    ]
  };

  const initOrderPage = () => {
    // Populate Districts
    const distSelect = document.getElementById('district-select');
    const thanaSelect = document.getElementById('thana-select');
    
    if (distSelect) {
      Object.keys(bdLocations).sort().forEach(dist => {
        const opt = document.createElement('option');
        opt.value = dist;
        opt.textContent = dist;
        distSelect.appendChild(opt);
      });

      distSelect.addEventListener('change', (e) => {
        const district = e.target.value;
        // Update Thanas
        thanaSelect.innerHTML = '<option value="" disabled selected>উপজেলা নির্বাচন করুন</option>';
        if (bdLocations[district]) {
          bdLocations[district].sort().forEach(thana => {
            const opt = document.createElement('option');
            opt.value = thana;
            opt.textContent = thana;
            thanaSelect.appendChild(opt);
          });
        }
        // Auto-update Shipping
        if (district === "Dhaka" || district === "ঢাকা") {
          window.updateShipping('inside');
        } else {
          window.updateShipping('outside');
        }
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const directProductId = urlParams.get('product') || urlParams.get('id');

    if (directProductId && products[directProductId]) {
      // Direct Buy Single Product
      const product = products[directProductId];
      orderItems = [{
        id: directProductId,
        title: product.title,
        price: parseInt(product.price.replace(/[^0-9]/g, '')),
        image: product.image,
        qty: 1,
        edition: product.edition || "Not Specified",
        color: product.color || "Not Specified"
      }];
    } else {
      // Load from Cart
      try {
        orderItems = JSON.parse(localStorage.getItem('earphone_bd_cart')) || [];
      } catch (e) { orderItems = []; }
    }
    renderOrderReview();
  };

  window.updateOrderQty = (index, change) => {
    orderItems[index].qty = Math.max(1, orderItems[index].qty + change);
    renderOrderReview();
  };

  window.removeOrderItem = (index) => {
    orderItems.splice(index, 1);
    if (orderItems.length === 0) {
      window.location.href = 'index.html';
      return;
    }
    renderOrderReview();
  };

  function renderOrderReview() {
    const container = document.getElementById('order-items-container');
    if (!container) return;

    let html = '';
    let subtotal = 0;

    orderItems.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      html += `
        <div class="order-item-card">
          <img src="${item.image}" alt="${item.title}" class="order-item-img">
          <div class="order-item-info">
            <h4>${item.title}</h4>
            <div class="order-item-controls">
              <div class="item-qty-selector">
                <button class="qty-btn" onclick="window.updateOrderQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="window.updateOrderQty(${index}, 1)">+</button>
              </div>
              <span class="order-item-price">৳${itemTotal.toLocaleString()}</span>
            </div>
          </div>
          <button class="remove-btn" onclick="window.removeOrderItem(${index})">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
    calculateOrderTotals(subtotal);
  }

  function calculateOrderTotals(subtotal) {
    const total = subtotal + currentShipping;
    
    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    const mobileStickyTotal = document.getElementById('mobile-sticky-total');
    
    if (subtotalEl) subtotalEl.innerText = `৳${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.innerText = `৳${total.toLocaleString()}`;
    if (mobileStickyTotal) mobileStickyTotal.innerText = `৳${total.toLocaleString()}`;
  }

  window.updateShipping = (area) => {
    const options = document.querySelectorAll('.delivery-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    if (area === 'inside') {
      if (options[0]) options[0].classList.add('selected');
      currentShipping = 29;
    } else {
      if (options[1]) options[1].classList.add('selected');
      currentShipping = 49;
    }
    
    const summaryShipping = document.getElementById('summary-shipping');
    if (summaryShipping) summaryShipping.innerText = `৳${currentShipping}`;
    
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    calculateOrderTotals(subtotal);
  };

  // Initial Run
  initOrderPage();

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
        item.classList.toggle('active');
      });
    }
  });

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
      window.showToast('দয়া করে আপনার নাম এবং মতামত লিখুন।');
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
    window.showToast('ধন্যবাদ! আপনার রিভিউটি যুক্ত হয়েছে।');
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

  // --- Customer Reviews Screenshot Slider ---
  const initReviewsSlider = () => {
    const slider = document.getElementById('reviews-slider');
    const dots = document.querySelectorAll('.review-dot');
    const prevBtn = document.getElementById('review-prev');
    const nextBtn = document.getElementById('review-next');
    
    if (!slider || dots.length === 0) return;
    
    let current = 0;
    const totalSlides = dots.length;
    let autoSlideInterval;
    
    const showSlide = (index) => {
      dots.forEach(dot => dot.classList.remove('active'));
      
      current = (index + totalSlides) % totalSlides;
      slider.style.transform = `translateX(-${current * 100}%)`;
      dots[current].classList.add('active');
    };
    
    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        showSlide(current + 1);
      }, 4000); // Slide every 4 seconds
    };
    
    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    };
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(current - 1);
        startAutoSlide();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(current + 1);
        startAutoSlide();
      });
    }
    
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startAutoSlide();
      });
    });
    
    startAutoSlide();
    
    // Pause auto slide on hover or touch interactions
    const sliderWrapper = document.querySelector('.reviews-slider-wrapper');
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
      sliderWrapper.addEventListener('mouseleave', startAutoSlide);
      sliderWrapper.addEventListener('touchstart', stopAutoSlide, { passive: true });
      sliderWrapper.addEventListener('touchend', startAutoSlide, { passive: true });
    }
  };
  
  initReviewsSlider();

  // Hero Slider Logic (Horizontal Slide)
  const initHeroSlider = () => {
    const slider = document.querySelector('.hero-slider');
    const dots = document.querySelectorAll('.dot');
    if (!slider || dots.length === 0) return;

    let current = 0;

    const showSlide = (n) => {
      dots.forEach(d => d.classList.remove('active'));
      
      current = (n + dots.length) % dots.length;
      slider.style.transform = `translateX(-${current * 100}%)`;
      dots[current].classList.add('active');
    };

    // Auto slide every 5 seconds
    let timer = setInterval(() => showSlide(current + 1), 5000);

    // Manual control
    window.currentSlide = (n) => {
      clearInterval(timer);
      showSlide(n);
      timer = setInterval(() => showSlide(current + 1), 5000);
    };
  };

  initHeroSlider();

  // --- Cart System Logic ---
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('earphone_bd_cart')) || [];
  } catch (e) {
    console.error("Cart loading failed:", e);
    cart = [];
  }

  window.updateCartUI = function() {
    try {
      const badge = document.querySelector('.cart-badge');
      if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.innerText = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
      }

      const container = document.getElementById('cart-items-container');
      const totalEl = document.getElementById('cart-drawer-total');
      
      if (container) {
        if (cart.length === 0) {
          container.innerHTML = '<div class="empty-cart-msg">আপনার কার্ট খালি আছে।</div>';
          if (totalEl) totalEl.innerText = '৳0';
        } else {
          let html = '';
          let total = 0;
          cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            html += `
              <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                  <h4>${item.title}</h4>
                  <div class="cart-item-controls">
                    <div class="cart-item-qty">
                      <button class="qty-btn" onclick="window.updateCartItemQty(${index}, -1)">-</button>
                      <span class="qty-val">${item.qty}</span>
                      <button class="qty-btn" onclick="window.updateCartItemQty(${index}, 1)">+</button>
                    </div>
                    <div class="cart-item-price-calc">
                      x ৳${item.price.toLocaleString()} = <b>৳${itemTotal.toLocaleString()}</b>
                    </div>
                  </div>
                </div>
                <div class="remove-item-icon" onclick="window.removeFromCart(${index})">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
              </div>
            `;
          });
          container.innerHTML = html;
          if (totalEl) totalEl.innerText = `৳${total.toLocaleString()}`;
        }
      }
      localStorage.setItem('earphone_bd_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Cart UI update failed:", e);
    }
  }

  window.addToCart = (id) => {
    const product = products[id];
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        id: id,
        title: product.title,
        price: parseInt(product.price.replace(/[^0-9]/g, '')),
        image: product.image,
        qty: 1,
        edition: product.edition || "Not Specified",
        color: product.color || "Not Specified"
      });
    }

    window.updateCartUI();
    window.showToast('প্রোডাক্টটি সফলভাবে কার্টে যোগ করা হয়েছে।');
  };

  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
  };

  window.updateCartItemQty = (index, change) => {
    cart[index].qty = Math.max(1, cart[index].qty + change);
    updateCartUI();
  };

  window.openCart = function() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
  };

  window.closeCart = function() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  };

  // Event Listeners for Cart Toggle
  const cartBtn = document.querySelector('.cart-btn');
  const closeBtn = document.getElementById('close-cart');
  const overlay = document.getElementById('cart-overlay');

  if (cartBtn) cartBtn.addEventListener('click', (e) => { e.preventDefault(); window.openCart(); });
  if (closeBtn) closeBtn.addEventListener('click', window.closeCart);
  if (overlay) overlay.addEventListener('click', window.closeCart);

  // Account Button Listener
  const accountBtn = document.querySelector('.header-action-item[title="My Account"]');
  if (accountBtn) {
    accountBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast('একাউন্ট ফিচারটি শীঘ্রই আসছে!');
    });
  }

  // Initialize UI
  updateCartUI();
});
