(() => {
  "use strict";

  const Store = window.EarphoneBdStoreData;
  const storage = Store.STORAGE_KEYS;
  const state = {
    products: Store.getProducts(), settings: Store.getSettings(), coupons: Store.getCoupons(),
    cart: readArray(storage.cart), wishlist: readArray(storage.wishlist).map(Number),
    category: "সব", search: "", sort: "featured", promo: localStorage.getItem(storage.promo) || "",
    checkoutDistrict: "", attribution: captureAttribution()
  };

  const elements = Object.fromEntries([
    "announcementBar","announcementText","announcementClose","siteHeader","searchToggle","searchPanel","globalSearch","searchSubmit","menuButton","mobileNav",
    "categoryTabs","sortSelect","productGrid","productResultText","emptyState","clearFilters","productCardTemplate","cartButton","wishlistButton","cartCount","wishlistCount",
    "backdrop","cartDrawer","wishlistDrawer","cartItems","wishlistItems","cartFooter","cartSubtotal","cartDelivery","cartDiscount","cartTotal","discountRow","shippingMessage",
    "shippingProgressLabel","shippingProgressBar","promoInput","applyPromo","promoMessage","checkoutButton","quickViewModal","quickViewContent","checkoutModal","checkoutForm",
    "checkoutItems","checkoutSubtotal","checkoutDelivery","checkoutTotal","successModal","orderNumber","continueShopping","newsletterForm","newsletterEmail","toastContainer","currentYear",
    "mobileOrderButton","mobileOrderBar","heroOffer","facebookLink","messengerLink","whatsappLink","supportPhoneLink","metaDomainVerification","deliveryEstimate","checkoutTitle","districtSelect","upazilaSelect"
  ].map(id => [id, document.getElementById(id)]));

  function readArray(key) { try { const v = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(v) ? v : []; } catch { return []; } }
  function escapeHTML(value) { return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
  function safeImage(value) { const text = String(value || "").trim(); if (!text || /^javascript:/i.test(text)) return ""; return escapeHTML(text); }
  function money(value) { const amount = Math.round(Number(value) || 0); return `${state.settings.currency || "৳"}${new Intl.NumberFormat("bn-BD").format(amount)}`; }
  function bnNumber(value) { return new Intl.NumberFormat("bn-BD").format(Number(value) || 0); }
  function activeProducts() { return state.products.filter(p => p.active !== false); }
  function getProduct(id) { return state.products.find(p => Number(p.id) === Number(id) && p.active !== false); }
  function saveShoppingState() { localStorage.setItem(storage.cart, JSON.stringify(state.cart)); localStorage.setItem(storage.wishlist, JSON.stringify(state.wishlist)); localStorage.setItem(storage.promo, state.promo); }

  function captureAttribution() {
    const params = new URLSearchParams(location.search);
    const current = { source: params.get("utm_source") || "direct", medium: params.get("utm_medium") || "", campaign: params.get("utm_campaign") || "", content: params.get("utm_content") || "", term: params.get("utm_term") || "", fbclid: params.get("fbclid") || "", landingPage: location.href, capturedAt: new Date().toISOString() };
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(storage.attribution) || "{}"); } catch { saved = {}; }
    const merged = { firstTouch: saved.firstTouch || current, lastTouch: current };
    localStorage.setItem(storage.attribution, JSON.stringify(merged));
    return merged;
  }

  function initMetaPixel() {
    const pixelId = String(state.settings.metaPixelId || "").trim();
    if (!/^\d{5,25}$/.test(pixelId) || window.fbq) return;
    const f = window; const b = document; const e = "script";
    f.fbq = function(){ f.fbq.callMethod ? f.fbq.callMethod.apply(f.fbq, arguments) : f.fbq.queue.push(arguments); };
    if (!f._fbq) f._fbq = f.fbq; f.fbq.push = f.fbq; f.fbq.loaded = true; f.fbq.version = "2.0"; f.fbq.queue = [];
    const t = b.createElement(e); t.async = true; t.src = "https://connect.facebook.net/en_US/fbevents.js"; b.head.appendChild(t);
    f.fbq("init", pixelId); f.fbq("track", "PageView");
  }
  function track(eventName, payload = {}) { if (typeof window.fbq === "function") window.fbq("track", eventName, payload); }

  function cleanShoppingState() {
    state.cart = state.cart.map(i => ({ id: Number(i.id), quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)) })).filter(i => {
      const p = getProduct(i.id); if (!p || p.available === false) return false; return true;
    });
    state.wishlist = [...new Set(state.wishlist)].filter(id => Boolean(getProduct(id))); saveShoppingState();
  }
  function getCartSubtotal() { return state.cart.reduce((sum,item) => { const p = getProduct(item.id); return p ? sum + p.price * item.quantity : sum; }, 0); }
  function currentCoupon(subtotal) { const c = state.coupons[state.promo]; return c && c.active && subtotal >= Number(c.minSpend || 0) ? c : null; }
  function getDiscount(subtotal) { const c = currentCoupon(subtotal); if (!c) return 0; let amount = c.type === "percent" ? subtotal * Number(c.value)/100 : Number(c.value); if (Number(c.maxDiscount)>0) amount = Math.min(amount,Number(c.maxDiscount)); return Math.min(subtotal,Math.max(0,amount)); }
  function deliveryFee(subtotal, district=state.checkoutDistrict) {
    if (subtotal <= 0 || (Number(state.settings.freeShippingThreshold)>0 && subtotal >= Number(state.settings.freeShippingThreshold))) return 0;
    return district === "ঢাকা" ? Number(state.settings.insideDhakaDeliveryFee || state.settings.deliveryFee || 0) : Number(state.settings.outsideDhakaDeliveryFee || state.settings.deliveryFee || 0);
  }
  function getTotals(district=state.checkoutDistrict) { const subtotal = getCartSubtotal(); const delivery = deliveryFee(subtotal,district); const discount = getDiscount(subtotal); return { subtotal, delivery, discount, total: Math.max(0,subtotal+delivery-discount) }; }

  function showToast(title,message="") { const t=document.createElement("div"); t.className="toast"; t.innerHTML=`<strong>${escapeHTML(title)}</strong>${message?`<span>${escapeHTML(message)}</span>`:""}`; elements.toastContainer.appendChild(t); setTimeout(()=>t.remove(),3300); }
  function applyStoreSettings() {
    document.documentElement.style.setProperty("--accent", state.settings.accentColor || "#0ea5e9");
    if (elements.announcementText) elements.announcementText.textContent = state.settings.announcement;
    if (elements.heroOffer) elements.heroOffer.textContent = state.settings.heroOffer || "বেস, সাউন্ড, মাইক্রোফোন বা লং ব্যাটারি—আপনার প্রয়োজন অনুযায়ী সহজে বেছে নিন।";
    if (elements.checkoutTitle) elements.checkoutTitle.textContent = state.settings.checkoutHeadline || "অর্ডার করতে মাত্র ১ মিনিট";
    if (elements.metaDomainVerification) elements.metaDomainVerification.content = state.settings.metaDomainVerification || "";
    document.title = `${state.settings.storeName} | কম দামে পছন্দের ইয়ারফোন`;
    const phone = String(state.settings.supportPhone || "").replace(/[^+\d]/g,"");
    if (elements.supportPhoneLink) { elements.supportPhoneLink.href = phone ? `tel:${phone}` : "#"; elements.supportPhoneLink.textContent = phone ? `কল করুন: ${state.settings.supportPhone}` : "কল করুন"; }
    if (elements.facebookLink) elements.facebookLink.href = state.settings.facebookUrl || "#";
    if (elements.messengerLink) elements.messengerLink.href = state.settings.messengerUrl || state.settings.facebookUrl || "#";
    if (elements.whatsappLink) elements.whatsappLink.href = state.settings.whatsappNumber ? `https://wa.me/${String(state.settings.whatsappNumber).replace(/\D/g,"")}` : "#";
  }

  function openOverlay(target) { closeAllOverlays(false); target.classList.add("open"); target.setAttribute("aria-hidden","false"); elements.backdrop.classList.add("show"); document.body.classList.add("no-scroll"); }
  function closeAllOverlays(removeBackdrop=true) { document.querySelectorAll(".drawer.open,.modal.open").forEach(x=>{x.classList.remove("open");x.setAttribute("aria-hidden","true");}); if(removeBackdrop){elements.backdrop.classList.remove("show");document.body.classList.remove("no-scroll");} }

  const FEATURE_ORDER = ["বেস", "সাউন্ড", "ব্যাটারি", "মাইক্রোফোন", "গেমিং", "ANC", "বাজেট"];
  function productFeatureTags(product) {
    const source = [...(product.bestFor || []), ...(product.features || []), product.badge || "", product.name || "", product.description || ""].join(" ").toLowerCase();
    const tags = [];
    const has = (...terms) => terms.some(term => source.includes(term));
    if (has("বেস", "bass")) tags.push("বেস");
    if (has("সাউন্ড", "sound", "stereo", "hi-fi", "hifi")) tags.push("সাউন্ড");
    if (has("ব্যাটারি", "battery", "playback", "hour", "ঘণ্টা", "চার্জ")) tags.push("ব্যাটারি");
    if (has("মাইক্রোফোন", "microphone", "clear mic", "hd call", "calling", "কল কোয়ালিটি", "call quality")) tags.push("মাইক্রোফোন");
    if (has("গেমিং", "gaming", "low latency", "ল্যাটেন্সি")) tags.push("গেমিং");
    if (has("anc", "active noise cancellation", "নয়েজ ক্যানসেল")) tags.push("ANC");
    if (Number(product.price) <= 550 || has("বাজেট", "budget")) tags.push("বাজেট");
    return FEATURE_ORDER.filter(tag => tags.includes(tag));
  }
  function renderCategoryTabs() {
    const available = new Set(activeProducts().flatMap(productFeatureTags));
    const features=["সব", ...FEATURE_ORDER.filter(feature => available.has(feature))];
    elements.categoryTabs.innerHTML=features.map(feature=>`<button class="category-tab ${state.category===feature?"active":""}" data-category="${escapeHTML(feature)}">${feature === "সব" ? "সব ইয়ারফোন" : escapeHTML(feature)}</button>`).join("");
  }
  function filteredProducts() {
    const q=state.search.toLowerCase(); const result=activeProducts().filter(p=>{
      const tags=productFeatureTags(p);
      const featureOk=state.category==="সব"||tags.includes(state.category);
      const text=[p.name,p.edition,p.color,p.slug,p.sku,p.description,...tags,...(p.bestFor||[]),...(p.features||[])].join(" ").toLowerCase();
      return featureOk&&(!q||text.includes(q));
    });
    if(state.sort==="rating") result.sort((a,b)=>(b.rating||0)-(a.rating||0));
    if(state.sort==="price-low") result.sort((a,b)=>a.price-b.price);
    if(state.sort==="price-high") result.sort((a,b)=>b.price-a.price);
    if(state.sort==="newest") result.sort((a,b)=>Number(b.created)-Number(a.created));
    if(state.sort==="featured") result.sort((a,b)=>Number(a.priority)-Number(b.priority));
    return result;
  }
  function renderProducts() {
    const products=filteredProducts(); elements.productGrid.innerHTML="";
    products.forEach(product=>{
      const f=elements.productCardTemplate.content.cloneNode(true); const card=f.querySelector(".product-card"); card.dataset.id=product.id;
      const badge=f.querySelector(".product-badge"); badge.textContent=product.badge||"জনপ্রিয়"; badge.classList.toggle("hidden",!product.badge);
      const img=f.querySelector("img"); img.src=product.image; img.dataset.fallback=product.fallbackImage||""; img.alt=`${product.name}, ${product.edition}, ${product.color}`;
      f.querySelector(".product-category").textContent=productFeatureTags(product).slice(0,2).join(" · ") || "ইয়ারফোন";
      f.querySelector(".product-rating").textContent=product.rating?`★ ${bnNumber(product.rating)}`:`ক্রম ${bnNumber(product.priority)}`;
      f.querySelector(".product-variant").textContent=`${product.edition} · ${product.color}`; f.querySelector("h3").textContent=product.name;
      f.querySelector(".product-tags").innerHTML=(product.bestFor||[]).slice(0,2).map(t=>`<span>${escapeHTML(t)}</span>`).join("");
      f.querySelector(".product-social-proof").textContent=product.soldCount?`${bnNumber(product.soldCount)}+ বিক্রি${product.reviews?` · ${bnNumber(product.reviews)} রিভিউ`:""}`:"নতুন পণ্য";
      f.querySelector(".product-price").textContent=money(product.price); const old=f.querySelector(".product-old-price"); old.textContent=product.oldPrice>product.price?money(product.oldPrice):"";
      const chip=f.querySelector(".discount-chip"); const discount=product.oldPrice>product.price?Math.round((product.oldPrice-product.price)/product.oldPrice*100):0; chip.textContent=discount?`${bnNumber(discount)}% ছাড়`:""; chip.classList.toggle("hidden",!discount);
      const wish=f.querySelector(".wishlist-toggle"); wish.classList.toggle("active",state.wishlist.includes(product.id)); wish.setAttribute("aria-label",state.wishlist.includes(product.id)?"পছন্দের তালিকা থেকে সরান":"পছন্দের তালিকায় যোগ করুন");
      const add=f.querySelector(".add-to-cart"), buy=f.querySelector(".buy-now"); [add,buy].forEach(b=>b.disabled=product.available===false); add.textContent=product.available===false?"এখন পাওয়া যাচ্ছে না":"কার্ট"; buy.textContent=product.available===false?"এখন পাওয়া যাচ্ছে না":"অর্ডার"; card.classList.add("reveal-card"); card.style.setProperty("--card-delay", `${Math.min(8, elements.productGrid.children.length) * 55}ms`);
      elements.productGrid.appendChild(f);
    });
    let text=`${bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে`; if(state.category!=="সব") text+=` · ${state.category} ফিচার`; if(state.search) text+=` · “${state.search}”`; elements.productResultText.textContent=text;
    elements.emptyState.classList.toggle("hidden",products.length>0); elements.productGrid.classList.toggle("hidden",products.length===0); renderCategoryTabs(); requestAnimationFrame(()=>observeMotion(elements.productGrid));
  }
  function renderCounts(){elements.cartCount.textContent=bnNumber(state.cart.reduce((s,i)=>s+i.quantity,0));elements.wishlistCount.textContent=bnNumber(state.wishlist.length);}

  function addToCart(productId,quantity=1,{silent=false}={}) {
    const p=getProduct(productId); if(!p||p.available===false){showToast("এই পণ্যটি এখন পাওয়া যাচ্ছে না","অন্য একটি মডেল বেছে নিন।");return false;}
    const existing=state.cart.find(i=>Number(i.id)===Number(p.id)); const current=existing?existing.quantity:0; const next=Math.min(10,current+Math.max(1,quantity)); if(existing) existing.quantity=next; else state.cart.push({id:p.id,quantity:next});
    saveShoppingState();renderCart();renderCounts();track("AddToCart",{content_ids:[p.sku],content_name:p.name,content_type:"product",value:p.price,currency:"BDT"}); if(!silent)showToast("কার্টে যোগ হয়েছে",`${p.name} · ${p.color}`); return true;
  }
  function buyNow(productId){ if(addToCart(productId,1,{silent:true})){showToast("অর্ডার ফর্ম খুলছে","নাম, ফোন ও ঠিকানা দিন।");openCheckout();} }
  function updateCartQuantity(id,amount){const item=state.cart.find(i=>Number(i.id)===Number(id)),p=getProduct(id);if(!item||!p)return;item.quantity=Math.min(10,item.quantity+amount);if(item.quantity<=0)state.cart=state.cart.filter(i=>Number(i.id)!==Number(id));saveShoppingState();renderCart();renderCounts();}
  function removeFromCart(id){state.cart=state.cart.filter(i=>Number(i.id)!==Number(id));saveShoppingState();renderCart();renderCounts();showToast("কার্ট থেকে সরানো হয়েছে");}
  function toggleWishlist(id){id=Number(id);const p=getProduct(id);if(!p)return;if(state.wishlist.includes(id)){state.wishlist=state.wishlist.filter(x=>x!==id);showToast("পছন্দের তালিকা থেকে সরানো হয়েছে");}else{state.wishlist.push(id);showToast("পছন্দের তালিকায় রাখা হয়েছে",p.name);}saveShoppingState();renderWishlist();renderCounts();renderProducts();}

  function renderCart(){
    const totals=getTotals(); if(!state.cart.length){elements.cartItems.innerHTML=`<div class="empty-drawer"><div><strong>আপনার কার্ট খালি</strong><p>পছন্দের ইয়ারফোনটি কার্টে যোগ করুন।</p><button class="button button-dark" data-shop-now>পণ্য দেখুন</button></div></div>`;elements.cartFooter.classList.add("hidden");return;}
    elements.cartItems.innerHTML=state.cart.map(item=>{const p=getProduct(item.id);if(!p)return"";return`<article class="cart-item" data-id="${p.id}"><img src="${safeImage(p.image)}" data-fallback="${safeImage(p.fallbackImage)}" alt="${escapeHTML(p.name)}"><div class="cart-item-info"><h3>${escapeHTML(p.name)}</h3><span>${escapeHTML(p.edition)} · ${escapeHTML(p.color)}</span><span>${money(p.price)}</span><div class="quantity-row"><div class="quantity-control"><button data-qty="-1" aria-label="কমিয়ে দিন">−</button><span>${bnNumber(item.quantity)}</span><button data-qty="1" aria-label="বাড়িয়ে দিন">+</button></div><button class="item-remove" data-remove-cart>সরান</button></div></div><strong class="item-price">${money(p.price*item.quantity)}</strong></article>`;}).join("");
    elements.cartFooter.classList.remove("hidden");elements.cartSubtotal.textContent=money(totals.subtotal);elements.cartDelivery.textContent=totals.delivery===0?"ফ্রি":money(totals.delivery);elements.cartDiscount.textContent=`− ${money(totals.discount)}`;elements.cartTotal.textContent=money(totals.total);elements.discountRow.classList.toggle("hidden",totals.discount<=0);
    const threshold=Number(state.settings.freeShippingThreshold||0),remaining=Math.max(0,threshold-totals.subtotal),progress=threshold>0?Math.min(100,totals.subtotal/threshold*100):100;elements.shippingProgressBar.style.width=`${progress}%`;elements.shippingProgressLabel.textContent=`${bnNumber(Math.round(progress))}%`;elements.shippingMessage.textContent=remaining>0?`আর ${money(remaining)} অর্ডার করলে ডেলিভারি ফ্রি`:`আপনার ডেলিভারি ফ্রি হয়েছে`;elements.promoMessage.textContent=currentCoupon(totals.subtotal)?`${state.promo}: ${state.coupons[state.promo].label}`:"";elements.promoInput.value=state.promo;
  }
  function renderWishlist(){if(!state.wishlist.length){elements.wishlistItems.innerHTML=`<div class="empty-drawer"><div><strong>তালিকাটি খালি</strong><p>পরে তুলনা করতে পণ্য সেভ করুন।</p><button class="button button-dark" data-shop-now>পণ্য দেখুন</button></div></div>`;return;}elements.wishlistItems.innerHTML=state.wishlist.map(id=>{const p=getProduct(id);if(!p)return"";return`<article class="wishlist-item" data-id="${p.id}"><img src="${safeImage(p.image)}" data-fallback="${safeImage(p.fallbackImage)}" alt="${escapeHTML(p.name)}"><div><h3>${escapeHTML(p.name)}</h3><span>${escapeHTML(p.edition)} · ${escapeHTML(p.color)}</span><strong>${money(p.price)}</strong><div><button class="button button-dark" data-move-cart>কার্টে রাখুন</button><button class="item-remove" data-remove-wishlist>সরান</button></div></div></article>`;}).join("");}

  function openQuickView(id){
    const p=getProduct(id);if(!p)return;const saving=Math.max(0,p.oldPrice-p.price);const reviews=(p.customerReviews||[]).slice(0,3);
    elements.quickViewContent.innerHTML=`<div class="quick-view-layout"><img class="quick-view-image" src="${safeImage(p.image)}" data-fallback="${safeImage(p.fallbackImage)}" alt="${escapeHTML(p.name)}"><div class="quick-view-copy"><span class="eyebrow">${escapeHTML(productFeatureTags(p).join(" · ") || "ইয়ারফোন")}</span><h2 id="quickViewTitle">${escapeHTML(p.name)}</h2><p class="quick-variant">${escapeHTML(p.edition)} · ${escapeHTML(p.color)}</p><div><span class="quick-price">${money(p.price)}</span>${p.oldPrice>p.price?`<span class="quick-old-price">${money(p.oldPrice)}</span>`:""}</div>${saving?`<p class="saving-note">আপনার সাশ্রয় ${money(saving)}</p>`:""}<div class="product-tags quick-tags">${(p.bestFor||[]).map(t=>`<span>${escapeHTML(t)}</span>`).join("")}</div><p>${escapeHTML(p.description)}</p><ul class="quick-list">${(p.features||[]).slice(0,8).map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ul>${reviews.length?`<div class="quick-reviews"><h3>ক্রেতার মতামত</h3>${reviews.map(r=>`<blockquote><p>“${escapeHTML(r.text)}”</p><strong>${escapeHTML(r.name)}</strong></blockquote>`).join("")}</div>`:""}<p class="warranty-note">রিপ্লেসমেন্ট/সার্ভিস: ${p.warrantyDays?`${bnNumber(p.warrantyDays)} দিন`:"বিস্তারিত জানতে যোগাযোগ করুন"}</p><div class="quick-action-row"><button class="button button-outline" data-quick-add="${p.id}" ${p.available===false?"disabled":""}>কার্টে রাখুন</button><button class="button button-dark" data-quick-buy="${p.id}" ${p.available===false?"disabled":""}>এখনই অর্ডার</button></div><div class="stock-note"><span class="stock-dot"></span>${p.available===false?"এখন পাওয়া যাচ্ছে না":"অর্ডার নেওয়া হচ্ছে"}</div></div></div>`;
    track("ViewContent",{content_ids:[p.sku],content_name:p.name,content_type:"product",value:p.price,currency:"BDT"});openOverlay(elements.quickViewModal);
  }
  function renderCheckout(){const totals=getTotals(state.checkoutDistrict);elements.checkoutItems.innerHTML=state.cart.map(item=>{const p=getProduct(item.id);if(!p)return"";return`<div class="checkout-summary-item"><img src="${safeImage(p.image)}" data-fallback="${safeImage(p.fallbackImage)}" alt="${escapeHTML(p.name)}"><div><strong>${escapeHTML(p.name)}</strong><span>${escapeHTML(p.edition)} · ${escapeHTML(p.color)} · ${bnNumber(item.quantity)}টি</span></div><strong>${money(p.price*item.quantity)}</strong></div>`;}).join("");elements.checkoutSubtotal.textContent=money(totals.subtotal);elements.checkoutDelivery.textContent=state.checkoutDistrict ? (totals.delivery===0?"ফ্রি":money(totals.delivery)) : "জেলা নির্বাচন করুন";elements.checkoutTotal.textContent=money(totals.total);if(elements.deliveryEstimate)elements.deliveryEstimate.textContent=state.checkoutDistrict ? `সম্ভাব্য ডেলিভারি: ${state.checkoutDistrict==="ঢাকা"?(state.settings.deliveryEtaInside||"১–২ কর্মদিবস"):(state.settings.deliveryEtaOutside||"২–৪ কর্মদিবস")}` : "জেলা নির্বাচন করলে ডেলিভারি চার্জ দেখা যাবে";}
  function populateDistricts() {
    const data = window.BangladeshLocations;
    if (!data || !elements.districtSelect) return;
    elements.districtSelect.innerHTML = `<option value="">জেলা নির্বাচন করুন</option>${data.districts.map(d => `<option value="${escapeHTML(d)}">${escapeHTML(d)}</option>`).join("")}`;
  }
  function populateUpazilas(district, selected="") {
    const list = window.BangladeshLocations?.upazilasFor(district) || [];
    elements.upazilaSelect.disabled = !district;
    elements.upazilaSelect.innerHTML = district ? `<option value="">উপজেলা / থানা নির্বাচন করুন</option>${list.map(u => `<option value="${escapeHTML(u)}" ${u===selected?"selected":""}>${escapeHTML(u)}</option>`).join("")}` : `<option value="">আগে জেলা নির্বাচন করুন</option>`;
  }
  function openCheckout(){cleanShoppingState();if(!state.cart.length){showToast("কার্ট খালি","অর্ডারের আগে একটি পণ্য বেছে নিন।");return;}populateDistricts();state.checkoutDistrict=elements.districtSelect?.value||"";populateUpazilas(state.checkoutDistrict,elements.upazilaSelect?.value||"");renderCheckout();const totals=getTotals();track("InitiateCheckout",{content_ids:state.cart.map(i=>getProduct(i.id)?.sku).filter(Boolean),num_items:state.cart.reduce((s,i)=>s+i.quantity,0),value:totals.total,currency:"BDT"});openOverlay(elements.checkoutModal);}
  function applyPromo(){const code=elements.promoInput.value.trim().toUpperCase();if(!code){state.promo="";saveShoppingState();renderCart();showToast("কুপন সরানো হয়েছে");return;}const coupon=state.coupons[code];if(!coupon||!coupon.active){elements.promoMessage.textContent="এই কুপনটি চালু নেই।";return;}state.promo=code;saveShoppingState();renderCart();const sub=getCartSubtotal();showToast(sub<Number(coupon.minSpend||0)?"কুপন সেভ হয়েছে":"ছাড় প্রয়োগ হয়েছে",sub<Number(coupon.minSpend||0)?`আর ${money(Number(coupon.minSpend)-sub)} অর্ডার করলে ব্যবহার হবে।`:coupon.label);}
  function submitSearch(){state.search=elements.globalSearch.value.trim();state.category="সব";renderProducts();track("Search",{search_string:state.search});document.getElementById("shop").scrollIntoView({behavior:"smooth"});elements.searchPanel.classList.remove("open");elements.searchPanel.setAttribute("aria-hidden","true");}
  function setupTestimonials(){const items=[...document.querySelectorAll(".testimonial")],dots=document.getElementById("sliderDots");if(!items.length||!dots)return;let current=0;dots.innerHTML=items.map((_,i)=>`<button class="slider-dot ${i===0?"active":""}" aria-label="রিভিউ ${i+1}" data-index="${i}"></button>`).join("");const show=i=>{current=i;items.forEach((x,j)=>x.classList.toggle("active",j===i));[...dots.children].forEach((x,j)=>x.classList.toggle("active",j===i));};dots.addEventListener("click",e=>{const b=e.target.closest(".slider-dot");if(b)show(Number(b.dataset.index));});setInterval(()=>show((current+1)%items.length),5000);}

  function placeOrder(event){
    event.preventDefault();cleanShoppingState();if(!state.cart.length){closeAllOverlays();showToast("কার্ট পরিবর্তন হয়েছে","নির্বাচিত পণ্যটি আর পাওয়া যাচ্ছে না।");return;}
    const fd=new FormData(elements.checkoutForm);state.checkoutDistrict=fd.get("district")||"";const totals=getTotals(state.checkoutDistrict);const prefix=state.settings.orderPrefix||"EBD";const orderId=`${prefix}-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}`;
    const items=state.cart.map(i=>{const p=getProduct(i.id);return{id:p.id,sku:p.sku,slug:p.slug,name:p.name,edition:p.edition,color:p.color,image:p.image,price:p.price,cost:p.cost,quantity:i.quantity};});
    const customer=Object.fromEntries(fd.entries());customer.email="";customer.deliveryArea=customer.district==="ঢাকা"?"Inside Dhaka":"Outside Dhaka";customer.thana=customer.upazila||"";const payment=customer.payment||"Cash on Delivery";const order={id:orderId,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),customer,items,totals,promoCode:state.promo||"",status:"Pending",paymentStatus:payment==="Cash on Delivery"?"Unpaid":"Pending",courier:"",trackingCode:"",notes:"",source:"storefront",attribution:state.attribution,timeline:[{status:"Pending",at:new Date().toISOString(),note:"ওয়েবসাইট থেকে অর্ডার করা হয়েছে"}]};
    const orders=Store.getOrders();orders.push(order);Store.saveOrders(orders);state.products=Store.saveProducts(state.products.map(p=>{const line=items.find(i=>Number(i.id)===Number(p.id));return line?{...p,soldCount:Number(p.soldCount||0)+line.quantity}:p;}));
    const conversionEvent = state.settings.codPixelEvent === "Purchase" ? "Purchase" : "Lead";
    track(conversionEvent,{content_ids:items.map(i=>i.sku),content_type:"product",num_items:items.reduce((s,i)=>s+i.quantity,0),value:totals.total,currency:"BDT"});
    state.cart=[];state.promo="";saveShoppingState();renderProducts();renderCart();renderCounts();elements.checkoutForm.reset();state.checkoutDistrict="";populateUpazilas("");elements.orderNumber.textContent=orderId;openOverlay(elements.successModal);
  }

  function observeMotion(root = document) {
    const targets = root.querySelectorAll ? root.querySelectorAll(".motion-reveal:not(.is-visible), .reveal-card:not(.is-visible)") : [];
    if (!targets.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px" });
    targets.forEach((target) => observer.observe(target));
  }

  function addTapAnimation(event) {
    const target = event.target.closest(".button, .category-tab, .feature-finder-card, .icon-button");
    if (!target) return;
    target.classList.remove("tap-pop");
    void target.offsetWidth;
    target.classList.add("tap-pop");
    window.setTimeout(() => target.classList.remove("tap-pop"), 420);
  }

  function setupEvents(){
    elements.announcementClose?.addEventListener("click",()=>elements.announcementBar.remove());window.addEventListener("scroll",()=>elements.siteHeader.classList.toggle("scrolled",window.scrollY>10));
    elements.searchToggle.addEventListener("click",()=>{const open=elements.searchPanel.classList.toggle("open");elements.searchPanel.setAttribute("aria-hidden",String(!open));if(open)setTimeout(()=>elements.globalSearch.focus(),150);});elements.searchSubmit.addEventListener("click",submitSearch);elements.globalSearch.addEventListener("keydown",e=>{if(e.key==="Enter")submitSearch();});
    elements.menuButton.addEventListener("click",()=>{const open=elements.mobileNav.classList.toggle("open");elements.menuButton.setAttribute("aria-expanded",String(open));});elements.mobileNav.addEventListener("click",()=>{elements.mobileNav.classList.remove("open");elements.menuButton.setAttribute("aria-expanded","false");});
    elements.categoryTabs.addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;state.category=b.dataset.category;state.search="";elements.globalSearch.value="";renderProducts();track("ViewCategory",{content_name:state.category});});
    document.querySelectorAll("[data-feature-link]").forEach(card=>card.addEventListener("click",()=>{state.category=card.dataset.featureLink;state.search="";renderProducts();track("ViewCategory",{content_name:`Feature: ${state.category}`});document.getElementById("shop").scrollIntoView({behavior:"smooth"});}));
    elements.sortSelect.addEventListener("change",()=>{state.sort=elements.sortSelect.value;renderProducts();});elements.clearFilters.addEventListener("click",()=>{state.category="সব";state.search="";elements.globalSearch.value="";renderProducts();});
    elements.productGrid.addEventListener("click",e=>{const card=e.target.closest(".product-card");if(!card)return;const id=Number(card.dataset.id);if(e.target.closest(".add-to-cart"))addToCart(id);if(e.target.closest(".buy-now"))buyNow(id);if(e.target.closest(".wishlist-toggle"))toggleWishlist(id);if(e.target.closest(".quick-view"))openQuickView(id);});
    elements.cartButton.addEventListener("click",()=>openOverlay(elements.cartDrawer));elements.wishlistButton.addEventListener("click",()=>openOverlay(elements.wishlistDrawer));elements.backdrop.addEventListener("click",()=>closeAllOverlays());document.querySelectorAll("[data-close-drawer],[data-close-modal]").forEach(b=>b.addEventListener("click",()=>closeAllOverlays()));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAllOverlays();});
    elements.cartItems.addEventListener("click",e=>{if(e.target.closest("[data-shop-now]")){closeAllOverlays();document.getElementById("shop").scrollIntoView({behavior:"smooth"});return;}const item=e.target.closest(".cart-item");if(!item)return;const id=Number(item.dataset.id),q=e.target.closest("[data-qty]");if(q)updateCartQuantity(id,Number(q.dataset.qty));if(e.target.closest("[data-remove-cart]"))removeFromCart(id);});
    elements.wishlistItems.addEventListener("click",e=>{if(e.target.closest("[data-shop-now]")){closeAllOverlays();document.getElementById("shop").scrollIntoView({behavior:"smooth"});return;}const item=e.target.closest(".wishlist-item");if(!item)return;const id=Number(item.dataset.id);if(e.target.closest("[data-move-cart]"))addToCart(id);if(e.target.closest("[data-remove-wishlist]"))toggleWishlist(id);});
    elements.applyPromo.addEventListener("click",applyPromo);elements.promoInput.addEventListener("keydown",e=>{if(e.key==="Enter")applyPromo();});elements.checkoutButton.addEventListener("click",openCheckout);elements.districtSelect?.addEventListener("change",e=>{state.checkoutDistrict=e.target.value;populateUpazilas(state.checkoutDistrict);renderCheckout();});
    elements.quickViewContent.addEventListener("click",e=>{const add=e.target.closest("[data-quick-add]"),buy=e.target.closest("[data-quick-buy]");if(add){addToCart(Number(add.dataset.quickAdd));closeAllOverlays();openOverlay(elements.cartDrawer);}if(buy){closeAllOverlays();buyNow(Number(buy.dataset.quickBuy));}});
    elements.checkoutForm.addEventListener("submit",placeOrder);elements.continueShopping.addEventListener("click",()=>{closeAllOverlays();document.getElementById("shop").scrollIntoView({behavior:"smooth"});});elements.mobileOrderButton?.addEventListener("click",()=>document.getElementById("shop").scrollIntoView({behavior:"smooth"}));
    elements.newsletterForm?.addEventListener("submit",e=>{e.preventDefault();const email=elements.newsletterEmail.value.trim().toLowerCase(),subs=Store.getSubscribers();if(!subs.includes(email))subs.push(email);Store.saveSubscribers(subs);elements.newsletterForm.reset();showToast("সাবস্ক্রাইব সম্পন্ন হয়েছে","যোগ্য অর্ডারে EBD10 কোড ব্যবহার করুন।");});
    document.addEventListener("error",e=>{const img=e.target;if(img.tagName==="IMG"&&img.dataset.fallback){const fallback=img.dataset.fallback;img.dataset.fallback="";img.src=fallback;}},true);
    document.addEventListener("pointerdown", addTapAnimation);
    window.addEventListener("storage",e=>{if(!Object.values(storage).includes(e.key))return;state.products=Store.getProducts();state.settings=Store.getSettings();state.coupons=Store.getCoupons();cleanShoppingState();applyStoreSettings();renderProducts();renderCart();renderWishlist();renderCounts();});
  }

  function init(){state.products=Store.getProducts();state.settings=Store.getSettings();state.coupons=Store.getCoupons();cleanShoppingState();applyStoreSettings();initMetaPixel();elements.currentYear.textContent=new Intl.NumberFormat("bn-BD",{useGrouping:false}).format(new Date().getFullYear());elements.sortSelect.value=state.sort;renderCategoryTabs();renderProducts();renderCart();renderWishlist();renderCounts();populateDistricts();setupTestimonials();setupEvents();observeMotion();}
  document.addEventListener("DOMContentLoaded",init);
})();
