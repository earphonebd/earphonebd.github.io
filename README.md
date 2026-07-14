# Earphone BD Mobile First Store

এই সংস্করণটি বাংলাদেশি মোবাইল ব্যবহারকারী, Facebook Ad traffic, affiliate sales এবং moderator order management-এর জন্য তৈরি করা হয়েছে।

## প্রধান ফাইল

- `index.html` — মোবাইল ফার্স্ট স্টোরফ্রন্ট
- `admin.html` — পণ্য ও সাধারণ অর্ডার অ্যাডমিন
- `affiliate.html` — অ্যাফিলিয়েট অর্ডার ও কমিশন প্যানেল
- `moderator.html` — মডারেটর অর্ডার প্যানেল
- `payouts.html` — অ্যাফিলিয়েট ও মডারেটর payout control
- `products-import-template.csv` — bulk product import template

## কী পরিবর্তন হয়েছে

### মোবাইল ফার্স্ট স্টোর

- পণ্য এখন hero-এর পরেই দেখা যায়
- বড় feature এবং trust sections পণ্যের নিচে সরানো হয়েছে
- mobile screen-এ compact দুই কলামের product grid
- horizontal sticky feature filter
- ছোট hero এবং দ্রুত search button
- smooth reveal, tap, shine এবং CTA animations
- `prefers-reduced-motion` support
- checkout-এ নাম, ফোন, জেলা, উপজেলা এবং ঠিকানা

### Stock system সরল করা হয়েছে

বড় inventory বা low-stock হিসাব আর মূল dashboard-এ নেই। প্রতিটি পণ্যে শুধু:

- অর্ডার নেওয়া হচ্ছে
- সাময়িক বন্ধ

এই দুই ধরনের availability control আছে।

### Affiliate panel

ডেমো লগইন:

- Code: `AFF001`
- PIN: `1234`

Affiliate করতে পারবে:

- নতুন customer order submit
- নিজের order status track
- delivered order commission দেখা
- bKash, Nagad বা Bank payout request
- আগের payout status track

### Moderator panel

ডেমো লগইন:

- Code: `MOD001`
- PIN: `1234`

Moderator করতে পারবে:

- customer order submit
- submitted orders track
- commission এবং payment track

### Payout control

অ্যাডমিন লগইন:

- Email: `admin@earphonebd.com`
- Password: `Earphone@2026`

এখান থেকে:

- affiliate এবং moderator account তৈরি
- flat বা percentage commission সেট
- team order status পরিবর্তন
- payout request Paid বা Rejected করা
- pending ও paid commission summary দেখা
- team member বন্ধ বা মুছে ফেলা

## Product image upload

`admin.html` থেকে JPG, PNG অথবা WebP নির্বাচন করা যাবে। ছবি browser storage-এ compressed format-এ রাখা হয়। অনেক বড় ছবি নিয়মিত ব্যবহার করলে production version-এ Cloudinary, S3 বা অন্য cloud storage ব্যবহার করা উচিত।

## চালানোর নিয়ম

Project folder-এ terminal খুলে চালান:

```bash
python3 -m http.server 8000
```

তারপর browser-এ খুলুন:

```text
http://localhost:8000/index.html
http://localhost:8000/admin.html
http://localhost:8000/affiliate.html
http://localhost:8000/moderator.html
http://localhost:8000/payouts.html
```

সব page একই origin এবং একই browser-এ খুলতে হবে, কারণ static versionটি shared LocalStorage ব্যবহার করে।

## গুরুত্বপূর্ণ production note

এই সংস্করণটি HTML, CSS, JavaScript এবং browser LocalStorage-ভিত্তিক functional prototype। Public production launch-এর আগে অবশ্যই server-side authentication, database, staff permissions, audit logs, cloud image storage, payment verification এবং automatic backup যোগ করতে হবে। Static login credentials নিরাপদ production authentication নয়।
