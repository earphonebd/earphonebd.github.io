(() => {
  "use strict";

  const CATALOG_VERSION = 8;

  function escapeSvgText(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function productArtwork(title, variant, bodyColor = "#f8fafc", accent = "#0ea5e9") {
    const safeTitle = escapeSvgText(title);
    const safeVariant = escapeSvgText(variant);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="24" flood-opacity=".18"/></filter></defs>
      <rect width="900" height="900" rx="80" fill="url(#bg)"/><circle cx="720" cy="180" r="135" fill="${accent}" opacity=".08"/><circle cx="160" cy="730" r="180" fill="${accent}" opacity=".06"/>
      <g filter="url(#shadow)"><rect x="270" y="405" width="360" height="245" rx="100" fill="${bodyColor}" stroke="#cbd5e1" stroke-width="8"/><path d="M294 480h312" stroke="#cbd5e1" stroke-width="8"/><ellipse cx="380" cy="352" rx="56" ry="76" fill="${bodyColor}" stroke="#cbd5e1" stroke-width="8"/><rect x="356" y="392" width="48" height="150" rx="24" fill="${bodyColor}" stroke="#cbd5e1" stroke-width="8"/><ellipse cx="520" cy="352" rx="56" ry="76" fill="${bodyColor}" stroke="#cbd5e1" stroke-width="8"/><rect x="496" y="392" width="48" height="150" rx="24" fill="${bodyColor}" stroke="#cbd5e1" stroke-width="8"/></g>
      <rect x="76" y="72" width="184" height="50" rx="25" fill="${accent}"/><text x="168" y="105" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#fff">EARPHONE BD</text><text x="450" y="742" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#0f172a">${safeTitle}</text><text x="450" y="790" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#475569">${safeVariant}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  const DEFAULT_PRODUCTS = [
    {
        "id": 1,
        "name": "AirPods Pro 2nd Generation",
        "category": "TWS ইয়ারবাড",
        "edition": "Dubai Edition",
        "color": "সাদা",
        "colorCode": "White",
        "slug": "airpods-pro-2nd-gen-dubai-white",
        "sku": "EBD-001",
        "priority": 1,
        "price": 499,
        "oldPrice": 650,
        "cost": 280,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.8,
        "reviews": 3,
        "soldCount": 287,
        "badge": "বেসের জন্য সেরা",
        "bestFor": [
            "বেসের জন্য সেরা"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/airpod_pro_2nd_generation_dubai_white.webp",
        "gallery": [],
        "description": "বিস্তারিত: Bangladesh-এ যারা AirPods Pro 2nd Gen-এর price খোঁজেন বা Best Budget Wireless Earphones under 550 BDT-এর মধ্যে Premium Quality চান তাদের জন্য এই Classic White edition একটি timeless choice। Dubai edition-এর clean white design এবং TWS Bluetooth earbuds-এর smooth connectivity — সব মিলিয়ে এটি Bangladesh-এ available AirPods Pro Cash on Delivery অপশনে order করার দারুণ সুযোগ। Premium sound",
        "features": [
            "এডিশন: Dubai Exclusive",
            "কালার: Classic White",
            "কোয়ালিটি: Original Quality AirPods Pro 2nd Generation BD-তে পাওয়া অন্যতম সেরা বিকল্প",
            "কন্ট্রোল: Touch Control ও Premium Look",
            "ব্যাটারি: 3.5-4 ঘণ্টা playback + Case-এ 4 বার চার্জ",
            "কানেক্টিভিটি: Bluetooth TWS Earbuds — stable ও fast pairing",
            "মাইক্রোফোন: Clear Mic ও High Bass সাউন্ড",
            "বিস্তারিত: Bangladesh-এ যারা AirPods Pro 2nd Gen-এর price খোঁজেন বা Best Budget Wireless Earphones under 550 BDT-এর মধ্যে Premium Quality চান",
            "তাদের জন্য এই Classic White edition একটি timeless choice। Dubai edition-এর clean white design",
            "এবং TWS Bluetooth earbuds-এর smooth connectivity — সব মিলিয়ে এটি Bangladesh-এ available AirPods Pro Cash on Delivery অপশনে order করার দারুণ সুযোগ। Premium sound",
            "clear mic",
            "high bass — everyday use-এর জন্য perfect।"
        ],
        "customerReviews": [
            {
                "name": "তারেক",
                "text": "খুব ভালো আপনারও নিতে পারেন কোন সমস্যা নেই"
            },
            {
                "name": "Aleya",
                "text": "apnader dhonnobad eto valo product deuar jonno, jemon dekhaichilo temoni paichi 😊"
            },
            {
                "name": "Rakib",
                "text": "Product ta valo chilo"
            }
        ],
        "active": true,
        "created": 1784004775354,
        "updatedAt": "2026-07-14T04:53:06.354Z"
    },
    {
        "id": 2,
        "name": "AirPods Pro 2nd Generation",
        "category": "TWS ইয়ারবাড",
        "edition": "Dubai Edition",
        "color": "কালো",
        "colorCode": "Black",
        "slug": "airpods-pro-2nd-gen-dubai-black",
        "sku": "EBD-002",
        "priority": 2,
        "price": 539,
        "oldPrice": 750,
        "cost": 320,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.9,
        "reviews": 2,
        "soldCount": 580,
        "badge": "বেসের জন্য সেরা",
        "bestFor": [
            "বেসের জন্য সেরা"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/airpod_pro_2nd_generation_dubai_black.webp",
        "gallery": [],
        "description": "বিস্তারিত: Bangladesh-এ যারা AirPods Pro 2nd Gen-এর price খোঁজেন বা Best Budget Wireless Earphones under 600 BDT-এর মধ্যে Premium Quality চান তাদের জন্য এটি একটি আদর্শ choice। Dubai edition-এর Matte Black ডিজাইন এবং TWS Bluetooth earbuds-এর smooth connectivity — সব মিলিয়ে এটি Bangladesh -এ available AirPods Pro Cash on Delivery অপশনে order করার সুযোগ। Premium sound",
        "features": [
            "এডিশন: Dubai Exclusive",
            "কালার: Matte Black",
            "কোয়ালিটি: Original Quality AirPods Pro 2nd Generation Bangladesh-এ পাওয়া সেরা বিকল্প",
            "কন্ট্রোল: Touch Control ও Premium Look",
            "ব্যাটারি: 3.5-4 ঘণ্টা playback + Case-এ 4 বার চার্জ",
            "কানেক্টিভিটি: Bluetooth TWS Earbuds — stable ও fast pairing",
            "মাইক্রোফোন: Clear Mic ও High Bass সাউন্ড",
            "বিস্তারিত: Bangladesh-এ যারা AirPods Pro 2nd Gen-এর price খোঁজেন বা Best Budget Wireless Earphones under 600 BDT-এর মধ্যে Premium Quality চান",
            "তাদের জন্য এটি একটি আদর্শ choice। Dubai edition-এর Matte Black ডিজাইন",
            "এবং TWS Bluetooth earbuds-এর smooth connectivity — সব মিলিয়ে এটি Bangladesh -এ available AirPods Pro Cash on Delivery অপশনে order করার সুযোগ। Premium sound",
            "clear mic",
            "high bass — সব কিছু এক জায়গায়।"
        ],
        "customerReviews": [
            {
                "name": "আল আমিন",
                "text": "ami sada ekta niyesi r kalo ekta niyesi...\namar kase kalo tai besi sundor mone hoyese"
            },
            {
                "name": "Rafi",
                "text": "যেমন টা দেখেছি তেমন টাই পেয়েছি। ধন্যবাদ আপনাদের।"
            }
        ],
        "active": true,
        "created": 1784004776354,
        "updatedAt": "2026-07-14T04:53:06.354Z"
    },
    {
        "id": 3,
        "name": "OnePlus Airpods Pro",
        "category": "TWS ইয়ারবাড",
        "edition": "সাধারণ এডিশন",
        "color": "সাদা",
        "colorCode": "White",
        "slug": "oneplus_airpods_white",
        "sku": "EBD-003",
        "priority": 3,
        "price": 499,
        "oldPrice": 700,
        "cost": 230,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.9,
        "reviews": 1,
        "soldCount": 402,
        "badge": "সাউন্ডের জন্য সেরা",
        "bestFor": [
            "সাউন্ডের জন্য সেরা"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/oneplus_white.webp",
        "gallery": [
            "assets/oneplus_white3_1782291854.webp"
        ],
        "description": "Bluetooth 5.0 Connectivity • HD Stereo Sound • Deep Bass Audio • Smart Touch Control",
        "features": [
            "Bluetooth 5.0 Connectivity",
            "HD Stereo Sound",
            "Deep Bass Audio",
            "Smart Touch Control",
            "Auto Pairing Feature",
            "Fast Charging Support",
            "Type-C Charging Port",
            "Long Battery Backup",
            "450mAh Charging Case",
            "45mAh Each Earbud Battery",
            "Up to 2.5 Hours Music Playback",
            "Built-in HD Microphone",
            "Clear Calling Experience",
            "Noise Reduction Technology",
            "Low Latency Mode",
            "Android & iPhone Compatible",
            "Voice Assistant Support",
            "Comfortable In-Ear Design",
            "Lightweight Premium Build",
            "Portable Charging Case",
            "LED Battery Indicator",
            "One-Touch Music Control",
            "Call Receive & Reject Feature",
            "Gaming & Music Friendly",
            "Stylish White Finish",
            "Easy Bluetooth Pairing",
            "Stable Wireless Connection",
            "Sweat Resistant Design",
            "Perfect for Office",
            "Travel & Daily Use",
            "Premium TWS Earbuds",
            "OnePlus Airpods Pro Style Earbuds."
        ],
        "customerReviews": [
            {
                "name": "মেহেদী",
                "text": "প্রোডাক্টটা দাম অনুযায়ী অনেক ভালো।\nএকটানা ইউজ করলে ৩-৪ ঘন্টা চার্জ থাকে‌\nঅর্ডার করার দুই দিনের ভিতরে পেয়েছি।"
            }
        ],
        "active": true,
        "created": 1784004777354,
        "updatedAt": "2026-07-14T04:53:06.354Z"
    },
    {
        "id": 4,
        "name": "OnePlus Airpods Pro",
        "category": "TWS ইয়ারবাড",
        "edition": "সাধারণ এডিশন",
        "color": "কালো",
        "colorCode": "Black",
        "slug": "oneplus_airpods_black",
        "sku": "EBD-004",
        "priority": 4,
        "price": 549,
        "oldPrice": 700,
        "cost": 230,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.9,
        "reviews": 0,
        "soldCount": 322,
        "badge": "সাউন্ডের জন্য সেরা",
        "bestFor": [
            "সাউন্ডের জন্য সেরা"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/oneplus_black.webp",
        "gallery": [
            "assets/oneplus_black2_1782361092.webp"
        ],
        "description": "Bluetooth 5.0 Connectivity • HD Stereo Sound • Deep Bass Audio • Smart Touch Control",
        "features": [
            "Bluetooth 5.0 Connectivity",
            "HD Stereo Sound",
            "Deep Bass Audio",
            "Smart Touch Control",
            "Auto Pairing Feature",
            "Fast Charging Support",
            "Type-C Charging Port",
            "Long Battery Backup",
            "450mAh Charging Case",
            "45mAh Each Earbud Battery",
            "Up to 2.5 Hours Music Playback",
            "Built-in HD Microphone",
            "Clear Calling Experience",
            "Noise Reduction Technology",
            "Low Latency Mode",
            "Android & iPhone Compatible",
            "Voice Assistant Support",
            "Comfortable In-Ear Design",
            "Lightweight Premium Build",
            "Portable Charging Case",
            "LED Battery Indicator",
            "One-Touch Music Control",
            "Call Receive & Reject Feature",
            "Gaming & Music Friendly",
            "Stylish Black Finish",
            "Easy Bluetooth Pairing",
            "Stable Wireless Connection",
            "Sweat Resistant Design",
            "Perfect for Office",
            "Travel & Daily Use",
            "Premium TWS Earbuds",
            "OnePlus Airpods Pro Style Earbuds."
        ],
        "customerReviews": [],
        "active": true,
        "created": 1784004778355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    },
    {
        "id": 5,
        "name": "AirPods Pro 2nd Generation",
        "category": "TWS ইয়ারবাড",
        "edition": "China Edition",
        "color": "সাদা",
        "colorCode": "White",
        "slug": "airpods-pro-2nd-gen-china-white",
        "sku": "EBD-005",
        "priority": 5,
        "price": 399,
        "oldPrice": 650,
        "cost": 200,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.4,
        "reviews": 2,
        "soldCount": 299,
        "badge": "null",
        "bestFor": [
            "null"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/airpod_pro_2nd_generation_china_white.webp",
        "gallery": [],
        "description": "বিস্তারিত: যারা Bangladesh-এ Best Budget Wireless Earphones under 400 BDT খুঁজছেন এবং AirPods Pro-এর classic white look চান কিন্তু বাজেটের মধ্যে থাকতে চান তাদের জন্য এই China edition Classic White একটি চমৎকার choice। AirPods Pro 2nd Gen-এর design inspired এই earbuds-এ পাবেন clean white aesthetics touch control",
        "features": [
            "এডিশন: China Edition",
            "কালার: Classic White",
            "কোয়ালিটি: Budget-friendly AirPods Pro alternative — BD-তে যারা কম দামে Bluetooth TWS Earbuds খোঁজেন তাদের জন্য ideal",
            "কন্ট্রোল: Touch Control ও Stylish Look",
            "ব্যাটারি: 2.5-3 ঘণ্টা playback + Case-এ 4 বার চার্জ",
            "কানেক্টিভিটি: Bluetooth TWS Earbuds — quick ও easy pairing",
            "সাউন্ড: Decent sound quality with satisfying bass",
            "বিস্তারিত: যারা Bangladesh-এ Best Budget Wireless Earphones under 400 BDT খুঁজছেন এবং AirPods Pro-এর classic white look চান কিন্তু বাজেটের মধ্যে থাকতে চান",
            "তাদের জন্য এই China edition Classic White একটি চমৎকার choice। AirPods Pro 2nd Gen-এর design inspired এই earbuds-এ পাবেন clean white aesthetics",
            "touch control",
            "আর comfortable everyday fit — Cash on Delivery-তে order করার সুবিধাসহ। Simple",
            "stylish",
            "আর পকেট-friendly — নতুন earbuds কেনার জন্য এর চেয়ে ভালো option Bangladesh-এ কমই আছে।"
        ],
        "customerReviews": [
            {
                "name": "Abdullah",
                "text": "যেমন ভেবেছিলাম তেমনই পেয়েছি।\nধন্যবাদ আপনাদের"
            },
            {
                "name": "Selim",
                "text": "dui tai ajke delivery hoyese. rider onek valo chilo....apnadero dhonnobad"
            }
        ],
        "active": true,
        "created": 1784004779355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    },
    {
        "id": 6,
        "name": "AirPods Pro 2nd Generation",
        "category": "TWS ইয়ারবাড",
        "edition": "China Edition",
        "color": "কালো",
        "colorCode": "Black",
        "slug": "airpods-pro-2nd-gen-china-black",
        "sku": "EBD-006",
        "priority": 6,
        "price": 449,
        "oldPrice": 750,
        "cost": 210,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.5,
        "reviews": 1,
        "soldCount": 436,
        "badge": "null",
        "bestFor": [
            "null"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/airpod_pro_2nd_generation_china_black.webp",
        "gallery": [],
        "description": "বিস্তারিত: যারা Bangladesh-এ Best Budget Wireless Earphones under 550 BDT খুঁজছেন এবং AirPods Pro-এর look ও feel চান কিন্তু বাজেটের মধ্যে থাকতে চান তাদের জন্য এই China edition Matte Black একটি smart pick। AirPods Pro 2nd Gen-এর design inspired এই earbuds-এ পাবেন stylish look touch control",
        "features": [
            "এডিশন: China Edition",
            "কালার: Matte Black",
            "কোয়ালিটি: Budget-friendly AirPods Pro alternative — BD-তে যারা কম দামে Bluetooth TWS Earbuds খোঁজেন তাদের জন্য ideal",
            "কন্ট্রোল: Touch Control ও Stylish Look",
            "ব্যাটারি: 2.5-3 ঘণ্টা playback + Case-এ 4 বার চার্জ",
            "কানেক্টিভিটি: Bluetooth TWS Earbuds — quick ও easy pairing",
            "সাউন্ড: Decent sound quality with satisfying bass",
            "বিস্তারিত: যারা Bangladesh-এ Best Budget Wireless Earphones under 550 BDT খুঁজছেন এবং AirPods Pro-এর look ও feel চান কিন্তু বাজেটের মধ্যে থাকতে চান",
            "তাদের জন্য এই China edition Matte Black একটি smart pick। AirPods Pro 2nd Gen-এর design inspired এই earbuds-এ পাবেন stylish look",
            "touch control",
            "আর comfortable fit — Cash on Delivery-তে order করার সুবিধাসহ। Everyday use-এর জন্য যথেষ্ট ভালো sound ও battery backup"
        ],
        "customerReviews": [
            {
                "name": "আনিছ",
                "text": "যে রকম দেখে ওডার দেয়েছি। তেমনটা পেয়েছি। দেখি ব্যবহার করি কেমন চলে, পরে Review দেবো।আপনারা নিতে পারেন"
            }
        ],
        "active": true,
        "created": 1784004780355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    },
    {
        "id": 7,
        "name": "M10 TWS Earphone 9D Stereo Led Digital Display Touch",
        "category": "গেমিং ইয়ারবাড",
        "edition": "সাধারণ এডিশন",
        "color": "কালো",
        "colorCode": "Black",
        "slug": "m10-earbuds",
        "sku": "EBD-007",
        "priority": 7,
        "price": 400,
        "oldPrice": 750,
        "cost": 200,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.5,
        "reviews": 2,
        "soldCount": 242,
        "badge": "বেসের জন্য সেরা",
        "bestFor": [
            "বেসের জন্য সেরা"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/m10-earbuds.webp",
        "gallery": [],
        "description": "500mAh Charging Case • LED Digital Battery Display • True Wireless Stereo (TWS) • Bluetooth 5.3 Connectivity",
        "features": [
            "500mAh Charging Case",
            "LED Digital Battery Display",
            "True Wireless Stereo (TWS)",
            "Bluetooth 5.3 Connectivity",
            "Auto Pairing Technology",
            "Hi-Fi Stereo Sound",
            "Deep Bass Audio",
            "Touch Control Operation",
            "Built-in Microphone",
            "HD Voice Calling",
            "Noise Reduction Technology",
            "IPX4 Water Resistant",
            "Ergonomic In-Ear Design",
            "Lightweight & Comfortable Fit",
            "Long Battery Backup",
            "Fast Charging Support",
            "Single & Dual Earbud Mode",
            "Android & iOS Compatible",
            "Gaming Low Latency Mode",
            "Smart Power Management",
            "Portable Pocket-Size Charging Case",
            "Type-C Charging Port",
            "Hands-Free Calling",
            "Music & Call Control",
            "Voice Assistant Support",
            "Stable Wireless Connection",
            "Stylish Transparent Lid Design",
            "Up to 20 Hours Total Playtime",
            "Compact Travel-Friendly Design",
            "Universal Smartphone Compatibility"
        ],
        "customerReviews": [
            {
                "name": "সালমা",
                "text": "৫ - ৬ দিন ব্যবহার এর পর রিভিউ দিতে আসলাম ।\nএই দামে এটা এক কথাই অসাধারণ 👍👍 । সাউন্ড ও সুন্দর ই।চার্জ টা ১ টানা ৩-৪ ঘন্টা যাই । সবাই নিতে পারেন ভালোই👍👍👍👍👍 "
            },
            {
                "name": "Ruhul",
                "text": "Alhamdulillah, Onek vlo bave prudact hate peyesi, sound quality o vlo ase. chsile sobsi nite paren. Thank you "
            }
        ],
        "active": true,
        "created": 1784004781355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    },
    {
        "id": 8,
        "name": "REGRSI RE-NY060 Wireless Neckband 200H Battery Backup",
        "category": "নেকব্যান্ড",
        "edition": "সাধারণ এডিশন",
        "color": "কালো",
        "colorCode": "Black",
        "slug": "regrsi-200-hour-neckband",
        "sku": "EBD-008",
        "priority": 8,
        "price": 490,
        "oldPrice": 800,
        "cost": 280,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 4.8,
        "reviews": 3,
        "soldCount": 156,
        "badge": "মাইক্রোফোনের জন্য সেরা",
        "bestFor": [
            "মাইক্রোফোনের জন্য সেরা"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/regrsi-200-hour-neckband1.webp",
        "gallery": [
            "assets/regrsi-200-hour-neckband2_1781080048.webp",
            "assets/regrsi-200-hour-neckband3_1781080070.webp"
        ],
        "description": "Ultra Long Battery Backup • Crystal Clear Sound Quality • HD Calling Experience • Soft & Comfortable Neck Design",
        "features": [
            "Ultra Long Battery Backup",
            "Crystal Clear Sound Quality",
            "HD Calling Experience",
            "Soft & Comfortable Neck Design",
            "Gaming & Music দুটোর জন্য Perfect",
            "TF Card Support Available",
            "Magnetic Earbuds",
            "Stylish Premium Look",
            "🔋 2.5 Hours Fast Charging",
            "🎵 Powerful Bass Boost Sound",
            "📶 Stable Bluetooth Connection",
            "💼 Office",
            "Gym",
            "Travel সব জায়গায় ব্যবহার উপযোগী"
        ],
        "customerReviews": [
            {
                "name": "আবির",
                "text": "প্রোডাক্ট টা যেমন চেয়েছি তেমন ই পেয়েছি। সাউন্ড কোয়ালিটি অনেক ভালো , একটু বেশি ই জোরে বাজে ।  আপনারা নিতে পারেন ।"
            },
            {
                "name": "জুথি মণি",
                "text": "যেমন টা চেয়েছিলাম ঠিক তেমন টাই পেয়েছি। খুবি ভালো লেগেছে আমার কাছে।  সাউন্ড কোয়ালিটি ও ভালো চার্জের দিক ও ভালো লেগেছে। ১৫-২০ দিন ব্যবহার করে আছ রিভিউ দিলাম সবাই নিতে পারেন। ডেলিভারি ম্যান ভালো মনের মানুষ ছিলো টাকা ভাংতি না থাকায় কম ও নিছে।"
            },
            {
                "name": "বাদশা",
                "text": "❤️👌 দারুন একটি প্রোডাক্ট! যারা নিতে চাচ্ছেন, তারা কোনো দ্বিধা ছাড়াই নিতে পারেন। এত কম দামে এত ভালো মানের একটা প্রোডাক্ট পাওয়া সত্যিই চমৎকার ব্যাপার। আমি এটা পেয়ে খুবই সন্তুষ্ট!&quot;🥰🥰🥰\n"
            }
        ],
        "active": true,
        "created": 1784004782355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    },
    {
        "id": 9,
        "name": "AirPods Pro 2nd Generation ANC",
        "category": "প্রিমিয়াম ANC",
        "edition": "USA Premium ANC",
        "color": "সাদা",
        "colorCode": "White",
        "slug": "airpods-pro-2nd-gen-premium-anc",
        "sku": "EBD-009",
        "priority": 9,
        "price": 1190,
        "oldPrice": 1850,
        "cost": 700,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 5,
        "reviews": 0,
        "soldCount": 122,
        "badge": "মাইক্রোফোনের জন্য সেরা",
        "bestFor": [
            "মাইক্রোফোনের জন্য সেরা",
            "সাউন্ডের জন্য সেরা"
        ],
        "warrantyDays": 365,
        "supplier": "",
        "image": "assets/airpod_pro_2nd_generation_premium_anc.webp",
        "gallery": [],
        "description": "বিস্তারিত: Bangladesh-এ যারা AirPods Pro 2nd Gen-এর price দেখে ANC সহ একটি premium earphone খুঁজছেন তাদের জন্য এই USA edition সবচেয়ে কাছের option। Original quality AirPods Pro 2nd Generation BD-তে এই দামে ANC পাওয়া সত্যিই rare — deep bass better mic",
        "features": [
            "এডিশন: USA Premium",
            "কালার: Classic White",
            "ফিচার: Active Noise Cancellation (ANC) — বাইরের সব শব্দ block করে pure music experience",
            "কন্ট্রোল: Touch Control ও High Bass সাউন্ড",
            "মাইক্রোফোন: Better Mic quality ও Deep Bass — call ও music দুটোতেই দারুণ",
            "ব্যাটারি: 4-5 ঘণ্টা playback + Case-এ 4 বার চার্জ",
            "ওয়ারেন্টি: 1 বছরের Service Warranty",
            "বিস্তারিত: Bangladesh-এ যারা AirPods Pro 2nd Gen-এর price দেখে ANC সহ একটি premium earphone খুঁজছেন",
            "তাদের জন্য এই USA edition সবচেয়ে কাছের option। Original quality AirPods Pro 2nd Generation BD-তে এই দামে ANC পাওয়া সত্যিই rare — deep bass",
            "better mic",
            "noise cancellation",
            "আর 1 বছরের warranty সব একসাথে। AirPods Pro ANC Cash on Delivery-তে order করুন",
            "আর Bluetooth TWS earbuds-এর best experience নিন। যারা Best Budget Wireless Earphones under 1200 BDT-এর মধ্যে ANC চান",
            "তাদের জন্য এটি BD-তে এখন পর্যন্ত সেরা deal"
        ],
        "customerReviews": [],
        "active": true,
        "created": 1784004783355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    },
    {
        "id": 10,
        "name": "AirPods Pro 3rd Generation ANC",
        "category": "প্রিমিয়াম ANC",
        "edition": "Dubai Premium ANC",
        "color": "সাদা",
        "colorCode": "White",
        "slug": "airpods-pro-3rd-gen-premium-anc",
        "sku": "EBD-010",
        "priority": 10,
        "price": 1990,
        "oldPrice": 2950,
        "cost": 1100,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 5,
        "reviews": 1,
        "soldCount": 98,
        "badge": "মাইক্রোফোনের জন্য সেরা",
        "bestFor": [
            "মাইক্রোফোনের জন্য সেরা",
            "সাউন্ডের জন্য সেরা"
        ],
        "warrantyDays": 365,
        "supplier": "",
        "image": "assets/airpod_pro_3rd_generation_premium_anc.webp",
        "gallery": [],
        "description": "বিস্তারিত: যারা Bangladesh-এ Original Quality AirPods 3rd Generation Bangladesh-এ খুঁজছেন তাদের জন্য এই Dubai edition এখন পর্যন্ত সবচেয়ে complete package। AirPods Pro 3rd Gen-এর design-এ পাচ্ছেন ANC deep bass",
        "features": [
            "এডিশন: Dubai Exclusive",
            "কালার: Classic White",
            "ফিচার: Active Noise Cancellation (ANC) — চারপাশের noise পুরোপুরি cut করে immersive sound experience",
            "কন্ট্রোল: Touch Control ও High Bass সাউন্ড",
            "মাইক্রোফোন: Best Call Quality ও Deep Bass — যেকোনো পরিবেশে crystal clear conversation",
            "ব্যাটারি: 5-6 ঘণ্টা playback + Case-এ 4 বার চার্জ",
            "ওয়ারেন্টি: 1 বছরের Service Warranty",
            "বিস্তারিত: যারা Bangladesh-এ Original Quality AirPods 3rd Generation Bangladesh-এ খুঁজছেন",
            "তাদের জন্য এই Dubai edition এখন পর্যন্ত সবচেয়ে complete package। AirPods Pro 3rd Gen-এর design-এ পাচ্ছেন ANC",
            "deep bass",
            "best call quality",
            "আর দীর্ঘ 5-6 ঘণ্টার battery backup — যা অন্য যেকোনো Bluetooth TWS Earbuds BD-তে এই price-এ match করতে পারবে না। Premium Quality AirPods দেখলে বুঝবেন এটি কতটা value-for-money। AirPods Pro ANC Cash on Delivery-তে order করুন আর 1 বছরের warranty-সহ নিশ্চিন্তে use করুন।"
        ],
        "customerReviews": [
            {
                "name": "মিম",
                "text": "প্রোডাক্টটা প্রাইজ হিসেবে প্রয়োজনের চেয়ে বেশি প্রিমিয়াম আপনারা চাইলে নিতে পারেন আর সেলার ভাইকে আমি একটাই কথা বলতে চাই যে আপনাকে অসংখ্য ধন্যবাদ।  প্রোডাক্ট একবারে মারাত্মক ❤️❤️❤️"
            }
        ],
        "active": true,
        "created": 1784004784355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    },
    {
        "id": 11,
        "name": "Hoco 500H Original Premium Neckband",
        "category": "নেকব্যান্ড",
        "edition": "সাধারণ এডিশন",
        "color": "নীল",
        "colorCode": "Blue",
        "slug": "hoco-500-hour-neckband-premium",
        "sku": "EBD-011",
        "priority": 11,
        "price": 849,
        "oldPrice": 1200,
        "cost": 480,
        "stock": 25,
        "reorderLevel": 5,
        "rating": 5,
        "reviews": 1,
        "soldCount": 266,
        "badge": "মাইক্রোফোনের জন্য সেরা",
        "bestFor": [
            "মাইক্রোফোনের জন্য সেরা",
            "সাউন্ডের জন্য সেরা"
        ],
        "warrantyDays": 7,
        "supplier": "",
        "image": "assets/hoco-500-hour-neckband2.webp",
        "gallery": [],
        "description": "500 ঘণ্টা পর্যন্ত মিউজিক প্লেব্যাক • ENC Noise Reduction প্রযুক্তি • সর্বাধুনিক Bluetooth V5.4 • 1000mAh শক্তিশালী ব্যাটারি",
        "features": [
            "500 ঘণ্টা পর্যন্ত মিউজিক প্লেব্যাক",
            "ENC Noise Reduction প্রযুক্তি",
            "সর্বাধুনিক Bluetooth V5.4",
            "1000mAh শক্তিশালী ব্যাটারি",
            "মাত্র ১ ঘণ্টায় ফুল চার্জ",
            "Type-C Fast Charging",
            "ম্যাগনেটিক ইয়ারবাড (Auto ON/OFF)",
            "HD Call Quality",
            "শক্তিশালী Bass Sound",
            "10-15 মিটার স্টেবল কানেকশন",
            "আরামদায়ক In-Ear ডিজাইন",
            "Sports ও Gym ব্যবহারের জন্য উপযোগী",
            "হালকা ওজনের Neckband Design",
            "Hands-Free Calling সুবিধা",
            "Voice Change Function",
            "FM Function Support",
            "Smartphone ও Tablet Compatible",
            "Music Play/Pause Control",
            "Incoming Call Notification",
            "Intelligent Noise Reduction",
            "Premium Metallic Finish"
        ],
        "customerReviews": [
            {
                "name": "আহাদ আলি",
                "text": "এইটাতে কত ঘন্টা চার্জ থাকে তা তো জানি না। কিন্তু আমি ৩ সাপ্তাহের টুরে বান্দরবোন গিয়েছিলাম। টুর শেষ এখুন গান শুনতে শুনতে বাড়ি যাচ্ছি 😁\nআলহামদু লিল্লাহ এখুনো চার্জ শেষ হয় নাই। চার্জ শেষ হলে আবার এসে রিভিউ দিয়ে যাবো ইনশাল্লাহ।"
            }
        ],
        "active": true,
        "created": 1784004785355,
        "updatedAt": "2026-07-14T04:53:06.355Z"
    }
];

  const DEFAULT_COUPONS = {
    EBD10: { type: "percent", value: 10, label: "নতুন ক্রেতার জন্য ১০% ছাড়", minSpend: 1000, maxDiscount: 200, active: true },
    SAVE100: { type: "fixed", value: 100, label: "নির্বাচিত অর্ডারে ১০০ টাকা ছাড়", minSpend: 1500, maxDiscount: 100, active: true }
  };

  const DEFAULT_SETTINGS = {
    "storeName": "Earphone BD",
    "storeTagline": "কম দামে পছন্দের ইয়ারফোন",
    "announcement": "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি • ৳৮০০ বা তার বেশি অর্ডারে ফ্রি ডেলিভারি",
    "currency": "৳",
    "freeShippingThreshold": 800,
    "deliveryFee": 50,
    "supportPhone": "+880 1700-000000",
    "supportEmail": "support@earphonebd.com",
    "accentColor": "#0ea5e9",
    "orderPrefix": "EBD",
    "lowStockThreshold": 5,
    "insideDhakaDeliveryFee": 50,
    "outsideDhakaDeliveryFee": 50,
    "facebookUrl": "#",
    "messengerUrl": "#",
    "whatsappNumber": "8801700000000",
    "metaPixelId": "",
    "metaDomainVerification": "",
    "deliveryEtaInside": "১–২ কর্মদিবস",
    "deliveryEtaOutside": "২–৪ কর্মদিবস",
    "checkoutHeadline": "অর্ডার করতে মাত্র ১ মিনিট",
    "heroOffer": "আজকের সেরা দামে অরিজিনাল কোয়ালিটির ইয়ারফোন",
  "codPixelEvent": "Lead"
};

  const STORAGE_KEYS = {
    products: "earphoneBdProducts", coupons: "earphoneBdCoupons", settings: "earphoneBdSettings",
    orders: "earphoneBdOrders", subscribers: "earphoneBdSubscribers", cart: "earphoneBdCart",
    wishlist: "earphoneBdWishlist", promo: "earphoneBdPromo", version: "earphoneBdCatalogVersion",
    attribution: "earphoneBdAttribution", partners: "earphoneBdPartners", payouts: "earphoneBdPayouts",
    employeeApplications: "earphoneBdEmployeeApplications", employees: "earphoneBdEmployees"
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function parseMoney(value) { return Number(String(value ?? "").replace(/[^0-9.-]/g, "")) || 0; }
  function slugify(value) { return String(value || "").trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^[-_]+|[-_]+$/g, ""); }

  function normalizeProduct(product, index = 0) {
    const id = Number(product.id) || Date.now() + index;
    const name = product.name || "নামহীন ইয়ারফোন";
    const edition = product.edition || "সাধারণ এডিশন";
    const color = product.color || "উল্লেখ নেই";
    const bestFor = Array.isArray(product.bestFor) ? product.bestFor.filter(Boolean) : String(product.bestFor || product.tags || "").split(/[,\n]/).map(v => v.trim()).filter(Boolean);
    const features = Array.isArray(product.features) ? product.features.filter(Boolean) : String(product.features || "").split("\n").map(v => v.trim()).filter(Boolean);
    const customerReviews = Array.isArray(product.customerReviews) ? product.customerReviews.filter(r => r && (r.text || r.name)) : [];
    const gallery = Array.isArray(product.gallery) ? product.gallery.filter(Boolean) : [];
    const fallbackImage = product.fallbackImage || productArtwork(name, `${edition} · ${color}`, color === "কালো" ? "#111827" : color === "নীল" ? "#2563eb" : "#ffffff", "#0ea5e9");
    return {
      id, sku: String(product.sku || `EBD-${String(id).padStart(4, "0")}`).trim().toUpperCase(),
      slug: slugify(product.slug || `${name}-${edition}-${color}`), name,
      category: "ইয়ারফোন", edition, color, colorCode: product.colorCode || "",
      priority: Math.max(1, Math.floor(Number(product.priority) || id)),
      price: Math.max(0, Number(product.price) || 0), oldPrice: Math.max(0, Number(product.oldPrice) || 0),
      cost: Math.max(0, Number(product.cost) || 0), stock: Math.max(0, Math.floor(Number(product.stock) || 0)),
      reorderLevel: Math.max(0, Math.floor(Number(product.reorderLevel) || 5)),
      rating: Math.min(5, Math.max(0, Number(product.rating) || 0)),
      reviews: Math.max(customerReviews.length, Math.floor(Number(product.reviews) || 0)),
      soldCount: Math.max(0, Math.floor(Number(product.soldCount) || 0)), badge: product.badge || bestFor[0] || "",
      bestFor, warrantyDays: Math.max(0, Math.floor(Number(product.warrantyDays) || 0)), supplier: product.supplier || "",
      created: Number(product.created) || Date.now(), updatedAt: product.updatedAt || new Date().toISOString(),
      image: product.image || fallbackImage, fallbackImage, gallery, description: product.description || "Earphone BD-তে সাশ্রয়ী দামে পাওয়া যাচ্ছে।",
      features, customerReviews, active: product.active !== false, available: product.available !== false
    };
  }

  function parseStored(key, fallback) { try { const saved = JSON.parse(localStorage.getItem(key)); return saved ?? clone(fallback); } catch { return clone(fallback); } }
  function getProducts() { const saved = parseStored(STORAGE_KEYS.products, DEFAULT_PRODUCTS); return (Array.isArray(saved) ? saved : DEFAULT_PRODUCTS).map(normalizeProduct); }
  function saveProducts(products) { const normalized = (Array.isArray(products) ? products : []).map(normalizeProduct); localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(normalized)); return normalized; }
  function getCoupons() { const value = parseStored(STORAGE_KEYS.coupons, DEFAULT_COUPONS); return value && typeof value === "object" && !Array.isArray(value) ? value : clone(DEFAULT_COUPONS); }
  function saveCoupons(value) { const normalized = value && typeof value === "object" ? value : {}; localStorage.setItem(STORAGE_KEYS.coupons, JSON.stringify(normalized)); return normalized; }
  function getSettings() { return { ...clone(DEFAULT_SETTINGS), ...parseStored(STORAGE_KEYS.settings, DEFAULT_SETTINGS) }; }
  function saveSettings(value) { const merged = { ...getSettings(), ...(value || {}) }; localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(merged)); return merged; }
  function getOrders() { const value = parseStored(STORAGE_KEYS.orders, []); return Array.isArray(value) ? value : []; }
  function saveOrders(value) { const normalized = Array.isArray(value) ? value : []; localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(normalized)); return normalized; }
  function getSubscribers() { const value = parseStored(STORAGE_KEYS.subscribers, []); return Array.isArray(value) ? value : []; }
  function saveSubscribers(value) { const normalized = Array.isArray(value) ? value : []; localStorage.setItem(STORAGE_KEYS.subscribers, JSON.stringify(normalized)); return normalized; }
  const DEFAULT_PARTNERS = [];
  function getPartners() { const value = parseStored(STORAGE_KEYS.partners, DEFAULT_PARTNERS); return Array.isArray(value) ? value : clone(DEFAULT_PARTNERS); }
  function savePartners(value) { const normalized = Array.isArray(value) ? value : []; localStorage.setItem(STORAGE_KEYS.partners, JSON.stringify(normalized)); return normalized; }
  function getPayouts() { const value = parseStored(STORAGE_KEYS.payouts, []); return Array.isArray(value) ? value : []; }
  function savePayouts(value) { const normalized = Array.isArray(value) ? value : []; localStorage.setItem(STORAGE_KEYS.payouts, JSON.stringify(normalized)); return normalized; }
  function getEmployeeApplications() { const value = parseStored(STORAGE_KEYS.employeeApplications, []); return Array.isArray(value) ? value : []; }
  function saveEmployeeApplications(value) { const normalized = Array.isArray(value) ? value : []; localStorage.setItem(STORAGE_KEYS.employeeApplications, JSON.stringify(normalized)); return normalized; }
  function getEmployees() { const value = parseStored(STORAGE_KEYS.employees, []); return Array.isArray(value) ? value : []; }
  function saveEmployees(value) { const normalized = Array.isArray(value) ? value : []; localStorage.setItem(STORAGE_KEYS.employees, JSON.stringify(normalized)); return normalized; }
  function roleLabel(role) { return ({ affiliate: "অ্যাফিলিয়েট", moderator: "মডারেটর", admin: "অ্যাডমিন", accounts: "অ্যাকাউন্টস", support: "কাস্টমার সাপোর্ট", order_manager: "অর্ডার ম্যানেজার" })[role] || role || "কর্মী"; }
  function employeeRoute(role) { return ({ affiliate: "affiliate.html", moderator: "moderator.html", admin: "admin.html", accounts: "payouts.html", support: "employee-dashboard.html", order_manager: "employee-dashboard.html" })[role] || "employee-dashboard.html"; }

  function inferCategory(slug, product) {
    if (slug.includes("neckband")) return "নেকব্যান্ড";
    if (String(product.edition || "").toLowerCase().includes("anc") || slug.includes("premium-anc")) return "প্রিমিয়াম ANC";
    if (slug.includes("m10")) return "গেমিং ইয়ারবাড";
    return "TWS ইয়ারবাড";
  }
  function legacyBestFor(category) {
    const labels = { "Best for Bass": "বেসের জন্য সেরা", "Best for Sound": "সাউন্ডের জন্য সেরা", "Best for Microphone": "মাইক্রোফোনের জন্য সেরা" };
    return String(category || "").split(",").map(v => v.replace(/^[^A-Za-z]+/, "").trim()).filter(Boolean).map(v => labels[v] || v);
  }
  function convertLegacyProduct(slug, product, index) {
    const bestFor = legacyBestFor(product.category);
    return normalizeProduct({ id: index + 1, name: product.title, category: inferCategory(slug, product), edition: product.edition || "সাধারণ এডিশন",
      color: product.color === "White" ? "সাদা" : product.color === "Black" ? "কালো" : product.color === "Blue" ? "নীল" : (product.color || "উল্লেখ নেই"), colorCode: product.color || "", slug,
      sku: `EBD-${String(index + 1).padStart(3, "0")}`, priority: Number(product.priority) || index + 1, price: parseMoney(product.price), oldPrice: parseMoney(product.regularPrice), cost: parseMoney(product.buyingPrice),
      stock: product.outOfStock ? 0 : 25, rating: Number(product.rating) || 0, soldCount: parseMoney(product.soldCount), bestFor, badge: bestFor[0] || "জনপ্রিয়", image: product.image,
      gallery: product.images || [], description: (product.features || []).slice(0, 6).join(" • "), features: product.features || [], customerReviews: product.reviews || [], active: !product.outOfStock });
  }
  function convertLegacyOrder(id, legacy, products) {
    const statusMap = { Completed: "Delivered", Packaging: "Processing" };
    const customer = legacy.customer || {}; const info = legacy.order || {}; const meta = legacy.metadata || {};
    const items = (Array.isArray(info.items) ? info.items : []).map((item, index) => {
      const matched = products.find(p => String(item.title || "").toLowerCase().includes(p.name.toLowerCase().slice(0, 15)) && (!item.edition || p.edition.toLowerCase().includes(String(item.edition).toLowerCase().split(" ")[0]))) || products[0];
      return { id: matched?.id || index + 1, sku: matched?.sku || "LEGACY", slug: matched?.slug || "legacy-item", name: item.title || info.product || "Legacy product", edition: item.edition || info.variation || "", color: item.color || info.color || "", image: item.image || matched?.image || "", price: parseMoney(item.price), cost: matched?.cost || 0, quantity: Number(item.qty || info.quantity) || 1 };
    });
    return { id: String(id).startsWith("EBD-") ? String(id) : `OLD-${id}`, createdAt: new Date(Number(meta.timestamp) || Date.now()).toISOString(), updatedAt: new Date(Number(meta.timestamp) || Date.now()).toISOString(),
      customer: { name: customer.name || "", phone: customer.phone || "", email: customer.email || "", address: customer.address || "", deliveryArea: info.shipping_area || "", district: info.district || "", thana: info.thana || "", customerNote: customer.note || "" },
      items, totals: { subtotal: parseMoney(info.subtotal), delivery: parseMoney(info.shipping_cost), discount: parseMoney(info.discount), total: parseMoney(info.total_price) }, promoCode: info.promo_code || "",
      status: statusMap[meta.status] || meta.status || "Pending", paymentStatus: meta.status === "Completed" ? "Paid" : "Unpaid", courier: "", trackingCode: meta.tracking_code || "", notes: meta.special_note || "Imported from previous website backup",
      source: "legacy-backup", attribution: {}, timeline: [{ status: statusMap[meta.status] || meta.status || "Pending", at: new Date(Number(meta.timestamp) || Date.now()).toISOString(), note: "পুরোনো ওয়েবসাইটের ব্যাকআপ থেকে ইমপোর্ট করা" }] };
  }
  function importLegacyBackup(data, options = {}) {
    if (!data || typeof data !== "object") throw new Error("ব্যাকআপ ফাইলটি সঠিক নয়।");
    const legacyProducts = Object.entries(data.products || {}).sort((a,b) => Number(a[1].priority || 999) - Number(b[1].priority || 999)).map(([slug,p],i) => convertLegacyProduct(slug,p,i));
    const products = legacyProducts.length ? saveProducts(legacyProducts) : getProducts();
    const importedOrders = Object.entries(data.orders || {}).map(([id,o]) => convertLegacyOrder(id,o,products));
    if (options.importOrders !== false && importedOrders.length) {
      const existing = options.replaceOrders ? [] : getOrders(); const byId = new Map(existing.map(o => [o.id,o])); importedOrders.forEach(o => byId.set(o.id,o)); saveOrders([...byId.values()]);
    }
    const delivery = data.delivery_charges_config || {};
    saveSettings({ insideDhakaDeliveryFee: Number(delivery.inside_dhaka_charge) || getSettings().insideDhakaDeliveryFee, outsideDhakaDeliveryFee: Number(delivery.outside_dhaka_charge) || getSettings().outsideDhakaDeliveryFee, freeShippingThreshold: Number(delivery.free_delivery_min_amount) || getSettings().freeShippingThreshold, announcement: data.global_configs?.banner_alert || getSettings().announcement });
    localStorage.setItem(STORAGE_KEYS.version, String(CATALOG_VERSION));
    return { products: products.length, orders: importedOrders.length };
  }

  function seedStore() {
    if (!localStorage.getItem(STORAGE_KEYS.products)) saveProducts(DEFAULT_PRODUCTS);
    if (!localStorage.getItem(STORAGE_KEYS.coupons)) saveCoupons(DEFAULT_COUPONS);
    if (!localStorage.getItem(STORAGE_KEYS.settings)) saveSettings(DEFAULT_SETTINGS);
    if (!localStorage.getItem(STORAGE_KEYS.orders)) saveOrders([]);
    if (!localStorage.getItem(STORAGE_KEYS.subscribers)) saveSubscribers([]);
    if (!localStorage.getItem(STORAGE_KEYS.partners)) savePartners(DEFAULT_PARTNERS);
    if (!localStorage.getItem(STORAGE_KEYS.payouts)) savePayouts([]);
    if (!localStorage.getItem(STORAGE_KEYS.employeeApplications)) saveEmployeeApplications([]);
    if (!localStorage.getItem(STORAGE_KEYS.employees)) saveEmployees([]);
    localStorage.setItem(STORAGE_KEYS.version, String(CATALOG_VERSION));
  }
  function resetStoreData() { saveProducts(DEFAULT_PRODUCTS); saveCoupons(DEFAULT_COUPONS); saveSettings(DEFAULT_SETTINGS); saveOrders([]); saveSubscribers([]); savePartners(DEFAULT_PARTNERS); savePayouts([]); saveEmployeeApplications([]); saveEmployees([]); localStorage.removeItem(STORAGE_KEYS.cart); localStorage.removeItem(STORAGE_KEYS.wishlist); localStorage.removeItem(STORAGE_KEYS.promo); localStorage.removeItem(STORAGE_KEYS.attribution); localStorage.setItem(STORAGE_KEYS.version, String(CATALOG_VERSION)); }
  function generateId(items = []) { const ids = items.map(v => Number(v.id)).filter(Number.isFinite); return (ids.length ? Math.max(...ids) : 0) + 1; }

  window.EarphoneBdStoreData = { CATALOG_VERSION, DEFAULT_PRODUCTS: clone(DEFAULT_PRODUCTS).map(normalizeProduct), DEFAULT_COUPONS: clone(DEFAULT_COUPONS), DEFAULT_SETTINGS: clone(DEFAULT_SETTINGS), STORAGE_KEYS,
    getProducts, saveProducts, getCoupons, saveCoupons, getSettings, saveSettings, getOrders, saveOrders, getSubscribers, saveSubscribers, getPartners, savePartners, getPayouts, savePayouts, getEmployeeApplications, saveEmployeeApplications, getEmployees, saveEmployees, roleLabel, employeeRoute, seedStore, resetStoreData, generateId, normalizeProduct, slugify, productArtwork, importLegacyBackup };
  seedStore();
})();
