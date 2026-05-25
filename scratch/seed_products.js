const products = {
  'p1_white': {
    title: 'AirPods Pro 2nd',
    price: '550 TK',
    regularPrice: '950 TK',
    discount: '42% OFF',
    image: 'assets/airpod_pro_2nd_generation_dubai_white.webp',
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
    price: '600 TK',
    regularPrice: '1,050 TK',
    discount: '43% OFF',
    image: 'assets/airpod_pro_2nd_generation_dubai_black.webp',
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
    price: '400 TK',
    regularPrice: '650 TK',
    discount: '38% OFF',
    image: 'assets/airpod_pro_2nd_generation_china_white.webp',
    edition: 'China Edition',
    color: 'Classic White',
    features: ['এডিশন: চায়না', 'কালার: ক্লাসিক হোয়াইট', 'টাচ কন্ট্রোল ও স্টাইলিশ লুক', 'ভালো সাউন্ড ও বাজেট ফ্রেন্ডলি', 'ব্যাটারি: 2.5-3 ঘণ্টা', 'কেস চার্জ: 4 বার'],
    reviews: [
      { name: "Samiul Islam", text: "বাজেট অনুযায়ী অনেক ভালো। পপ-আপ অ্যানিমেশন কাজ করে।" },
      { name: "Rakib Hasan", text: "কম দামে এর থেকে ভালো আর কিছু হয় না। ডেলিভারি ফাস্ট ছিল।" },
      { name: "Priya Ghosh", text: "বেসি টাকা খরচ করতে না চাইলে এটা বেস্ট অপশন।" },
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
    price: '450 TK',
    regularPrice: '750 TK',
    discount: '40% OFF',
    image: 'assets/airpod_pro_2nd_generation_china_black.webp',
    edition: 'China Edition',
    color: 'Classic Black',
    features: ['এডিশন: চায়না', 'কালার: ম্যাট ব্ল্যাক', 'টাচ কন্ট্রোল ও স্টাইলিশ লুক', 'ভালো সাউন্ড ও বাজেট ফ্রেন্ডলি', 'ব্যাটারি: 2.5-3 ঘণ্টা', 'কেস চার্জ: 4 বার'],
    reviews: [
      { name: "Farhan Ahmed", text: "প্যাকিং খুব ভালো ছিল। কালারটা খুব সুন্দর।" },
      { name: "Imran Khan", text: "অবিশ্বসনীয় সাউন্ড এই দামে! অনেক ভালো সার্ভিস।" },
      { name: "Sayed Ali", text: "খুব দ্রুত হাতে পেয়েছি। কোয়ালিটি ও অনেক ভালো।" },
      { name: "Mitu Akter", text: "অল্প দামে ভালো একটা জিনিস পেলাম।" },
      { name: "Nayeem Islam", text: "ভালোই সার্ভিস দিচ্ছে।" },
      { name: "Shamim Reza", text: "কালো রং টা ম্যাট ফিনিশ, দেখতে খুব সুন্দর লাগে।" },
      { name: "Lata Mondal", text: "चार्ज ভালোই থাকে। সাউন্ড একদম ক্লিয়ার।" },
      { name: "Kamrul Hasan", text: "কম বাজেটে সেরা চয়েস।" },
      { name: "Rehana Parvin", text: "পণ্যটি সত্যিই দারুণ। চেক করে নিতে পেরেছি।" },
      { name: "Saiful Bari", text: "ধন্যবাদ Earphone BD!" }
    ]
  },
  'p3': {
    title: 'AirPods Pro 2nd ANC',
    price: '1,200 TK',
    regularPrice: '1,850 TK',
    discount: '35% OFF',
    image: 'assets/airpod_pro_2nd_generation_premium_anc.webp',
    edition: 'USA Premium ANC',
    color: 'Classic White',
    features: ['এডিশন: USA', 'কালার: ক্লাসিক হোয়াইট', 'নয়েজ ক্যান্সেলেশন (ANC)', 'টাচ কন্ট্রোল ও হাই বেস', 'বেটার মাইক ও ডিপ বেস', 'ব্যাটারি: 4-5 ঘণ্টা', 'কেস চার্জ: 4 বার', '1 বছরের সার্ভিস ওয়ারেন্টি'],
    reviews: [
      { name: "Sadia Afrin", text: "ANC ফিচারটা দারুণ কাজ করে। বাসের শব্দের মধ্যেও গান ক্লিয়ার শোনা যায়।" },
      { name: "Hasan Mahamud", text: "প্রিমিয়াম কোয়ালিটি। সাউন্ড এর বেইজ টা অনেক ক্লিন।" },
      { name: "Rubel Ahmed", text: "নয়েজ ক্যান্সেলেশন টা অসাধারণ। একদম শান্তিতে গান শোনা যায়।" },
      { name: "Faria Islam", text: "মাইক অনেক ক্লিয়ার, কথা বলতে কোনো সমস্যা হয়বিধা হয় না।" },
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
    price: '2,000 TK',
    regularPrice: '2,950 TK',
    discount: '32% OFF',
    image: 'assets/airpod_pro_3rd_generation_premium_anc.webp',
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

fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(products)
}).then(response => response.json())
  .then(data => console.log('Successfully written products:', data))
  .catch(err => console.error('Error:', err));
