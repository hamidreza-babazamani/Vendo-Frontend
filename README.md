<div dir="rtl" align="right">

# 🎨 Vendo — Frontend

فرانت‌اند پروژه Vendo (پلتفرم آگهی آنلاین) با React، TypeScript، Vite و Tailwind CSS.

---

## 📖 درباره پروژه

این پروژه فرانت‌اند یک پلتفرم آگهی آنلاین مشابه دیوار است. کاربران می‌توانند ثبت‌نام کنند، آگهی ثبت کنند، دسته‌بندی‌ها را ببینند و عکس آپلود کنند.

این پروژه فقط شامل فرانت‌اند است. بک‌اند آن در مخزن جداگانه‌ای قرار دارد:
https://github.com/hamidreza-babazamani/Bravo-Vendo

---

## 🛠 تکنولوژی‌ها

- React 18 — کتابخانه UI
- TypeScript — زبان
- Vite 5 — Build tool
- Tailwind CSS — استایل
- React Router 6 — روتینگ
- TanStack Query (React Query) — مدیریت داده
- Axios — HTTP client
- React Hot Toast — نوتیفیکیشن
- Jalali Moment — تاریخ شمسی
- React Icons — آیکون‌ها

---

## ✨ امکانات

- تم شیشه‌ای مدرن (Glassmorphism)
- ورود با کد پیامکی (OTP)
- مشاهده لیست آگهی‌ها
- جزئیات آگهی
- ساخت آگهی جدید با آپلود عکس
- پنل کاربری
- مشاهده دسته‌بندی‌ها
- فیلتر آگهی‌ها بر اساس دسته
- تاریخ شمسی
- RTL (راست‌چین)
- Responsive (موبایل، تبلت، دسکتاپ)

---

## 📁 ساختار پروژه

Vendo-Frontend/
├── public/                  فایل‌های استاتیک
│   └── vite.svg             favicon
├── src/
│   ├── components/
│   │   ├── common/          Button, Input, Card, Modal, Loader
│   │   ├── layout/          Header, Footer, Layout
│   │   └── templates/       SendOtp, CheckOtp
│   ├── configs/
│   │   └── api.ts           axios config
│   ├── pages/
│   │   ├── Auth/            ورود با OTP
│   │   ├── Category/        آگهی‌های دسته
│   │   ├── Dashboard/       پنل کاربری
│   │   ├── Home/            صفحه اصلی
│   │   ├── NotFound/        404
│   │   └── Post/            ساخت و جزئیات آگهی
│   ├── services/            API calls
│   ├── types/               TypeScript types
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts

---

## 🎨 تم و رنگ‌ها

- رنگ اصلی: نارنجی #FF6B35
- رنگ ثانویه: بنفش #A855F7
- پس‌زمینه: گرادیانت تیره (بنفش → آبی → نارنجی)
- فونت: Vazirmatn

---

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js نسخه ۱۸ یا بالاتر
- بک‌اند Vendo در حال اجرا (http://localhost:3400)

### مراحل

۱. مخزن را clone کنید:

git clone https://github.com/hamidreza-babazamani/Vendo-Frontend.git
cd Vendo-Frontend

۲. پکیج‌ها را نصب کنید:

npm install

۳. فایل .env بسازید و این مقادیر را در آن قرار دهید:

VITE_API_URL=http://localhost:3400
VITE_APP_NAME=Vendo

۴. سرور فرانت را اجرا کنید:

npm run dev

۵. آدرس فرانت:

http://localhost:5173

---

## 🔗 اتصال به بک‌اند

این پروژه برای کار کردن، نیاز به بک‌اند دارد. بک‌اند را از مخزن زیر clone کنید:

git clone https://github.com/hamidreza-babazamani/Bravo-Vendo.git
cd Bravo-Vendo
npm install
npm start

بک‌اند روی آدرس زیر اجرا می‌شود:

http://localhost:3400

---

## 📚 مستندات API

بعد از اجرای بک‌اند، مستندات Swagger در آدرس زیر در دسترس است:

http://localhost:3400/swagger

---

## 📄 صفحات

- / — صفحه اصلی (لیست آگهی‌ها + دسته‌بندی‌ها)
- /auth — ورود با OTP
- /dashboard — پنل کاربری
- /post/create — ساخت آگهی جدید
- /post/:id — جزئیات آگهی
- /category/:slug — آگهی‌های یک دسته

---

## ⚠️ نکات مهم

- فایل .env را در GitHub آپلود نکنید
- پوشه node_modules را در GitHub آپلود نکنید
- برای اجرا، ابتدا بک‌اند را روشن کنید

---

## 📞 ارتباط

GitHub: https://github.com/hamidreza-babazamani

</div>
