# 🚀 Qxyra — Complete Deployment & Cloud Launch Guide

> **Official Brand:** Qxyra  
> **Platform:** Next.js 15 + Tailwind CSS v4 + CJ Dropshipping Integration  
> **Target Hosting:** Vercel (100% Free Tier with 99.99% Global Edge Uptime)

---

## 📌 පියවර 1: GitHub වෙත Code එක Push කිරීම

ඔබගේ පරිගණකයේ ඇති Qxyra code එක GitHub වෙත upload කිරීම සඳහා:

1. [github.com](https://github.com) වෙත ගොස් **New Repository** එකක් සාදන්න (නම: `qxyra`, Private හෝ Public).
2. Terminal / PowerShell එක open කර පහත commands 4 run කරන්න:

```bash
cd C:\Users\methm\.gemini\antigravity\scratch\qxyra
git init
git add .
git commit -m "feat: complete Qxyra luxury e-commerce and CJ Dropshipping integration"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/qxyra.git
git push -u origin main
```

---

## 📌 පියවර 2: Vercel වෙත නොමිලේ Deploy කිරීම (1-Click)

1. [vercel.com](https://vercel.com) වෙත ගොස් ඔබගේ GitHub ගිණුමෙන් **Sign In** වන්න (නොමිලේ).
2. **"Add New..."** -> **"Project"** ක්ලික් කරන්න.
3. ඔබගේ `qxyra` GitHub repository එක තෝරා **"Import"** ක්ලික් කරන්න.
4. Framework Preset එක **Next.js** ලෙස auto-detect වේ.
5. **"Deploy"** බොත්තම ඔබන්න! 

> ⏱️ මිනිත්තු 1-2ක් ඇතුළත ඔබේ website එක ලෝකයටම Live වේ!  
> ඔබට නොමිලේ ලැබෙන link එක: **`https://qxyra.vercel.app`**

---

## 📌 පියවර 3: පසුව Custom Domain (`qxyra.com`) Connect කරන ආකාරය

ඔබ පසුව Namecheap, GoDaddy, හෝ Cloudflare වෙතින් `qxyra.com` මිලදී ගත් පසු:

1. Vercel Dashboard එකේ ඔබගේ `qxyra` project එක open කරන්න.
2. **Settings** -> **Domains** වෙත යන්න.
3. `qxyra.com` සහ `www.qxyra.com` ඇතුළත් කර **Add** ඔබන්න.
4. ඔබගේ Domain Provider (GoDaddy/Namecheap) හි DNS Records වලට පහත records 2 ඇතුළත් කරන්න:
   * **A Record**: Host `@` -> Value `76.76.21.21`
   * **CNAME Record**: Host `www` -> Value `cname.vercel-dns.com`
5. Vercel විසින් ස්වයංක්‍රීයව **Free SSL Padlock Certificate (https://)** ක්‍රියාත්මක කරනු ඇත.

---

## 📌 පියවර 4: Live Payment & Marketing Keys සැකසීම

Vercel හි **Settings -> Environment Variables** වෙත ගොස් පහත keys අවශ්‍ය පරිදි ඇතුළත් කරන්න:

| Variable Name | විස්තරය |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://qxyra.vercel.app` (හෝ `https://qxyra.com`) |
| `CJ_DROPSHIPPING_EMAIL` | ඔබගේ CJ Dropshipping ගිණුමේ Email එක |
| `CJ_DROPSHIPPING_API_KEY` | CJ Dropshipping Developers Portal API Key |
| `STRIPE_SECRET_KEY` | Stripe Live Secret Key (`sk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Live Publishable Key (`pk_live_...`) |
| `PAYHERE_MERCHANT_ID` | PayHere Sri Lanka Merchant ID |
| `PAYHERE_SECRET` | PayHere Merchant Secret |
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | Facebook/Meta Pixel ID (Ads Tracking සඳහා) |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Ads Pixel ID |

---

## 📌 පියවර 5: Google Search Console වෙත Sitemap Submit කිරීම

1. [Google Search Console](https://search.google.com/search-console) වෙත යන්න.
2. ඔබගේ website URL එක ඇතුළත් කරන්න.
3. **Sitemaps** tab එකට ගොස්:
   `https://qxyra.vercel.app/sitemap.xml` (හෝ `https://qxyra.com/sitemap.xml`) submit කරන්න.
4. Google විසින් ඔබගේ සියලුම luxury products, categories, සහ pages ස්වයංක්‍රීයව index කරනු ඇත!
