# 💰 SastaDeal — Personal Order Deal Tracker

> Track Amazon/Flipkart order deals from multiple mediators. Monitor refund status, payment updates, and review progress — all in one place.

**Owner:** San5616  
**Version:** 1.0.0  
**Repository:** [github.com/San5616/OrderDeals3](https://github.com/San5616/OrderDeals3)

---

## 🧠 Core Concept

SastaDeal is a personal web platform to track order deals taken from multiple mediators. Admin orders products using virtual reviewer accounts, sometimes on behalf of buyers. The system supports three user roles:

- **Admin** — Full access. Manage orders, send WhatsApp/Email, view analytics
- **Buyer** — Login via mobile/email. See own orders, status & payment
- **Mediator** — Login via mobile/email. See own orders, total less & refund amounts
- **Public** — Track order by PlatformOrderID (no login needed)

---

## ⚙️ Tech Stack (100% Free)

| Component | Technology |
|-----------|-----------|
| Frontend | HTML + CSS + Vanilla JS (8 pages) |
| Hosting | GitHub Pages |
| Database | Google Sheets (8 tabs) |
| Backend | Google Apps Script (Web App API) |
| Images | Client-side compressed ≤200KB → Google Drive |
| WhatsApp | CallMeBot API (free, activated per number) |
| Email | GmailApp (Google Apps Script) |
| Auth | sessionStorage (client-side) |

---

## 🗂️ Google Sheet Structure (8 Tabs)

### 1. Orders (Main tracker — 20 columns)
| Column | Field |
|--------|-------|
| A | Timestamp |
| B | OrderNo |
| C | OrderedPlatform |
| D | AccountName |
| E | ProductName |
| F | SellerName |
| G | ProductLink |
| H | PlatformOrderID |
| I | PricePaid |
| J | Less |
| K | DealContactNo |
| L | MediatorName |
| M | OrderDate |
| N | ForWhom |
| O | UserID |
| P | BuyerLess |
| Q | Notes |
| R | MediatorOrderForm |
| S | MediatorRefundForm |
| T | OrderScreenshot |

### 2. Tracking (28 columns)
| Column | Field |
|--------|-------|
| A | OrderNo |
| B | OrderedPlatform |
| C | AccountName |
| D | ProductName |
| E | PlatformOrderID |
| F | PricePaid |
| G | Less |
| H | ToGet |
| I | ActualGot |
| J | OrderStatus |
| K | OrderDate |
| L | DeliveryDate |
| M | ReviewDate |
| N | ReviewLiveDate |
| O | RefundFormDate |
| P | RefundDate |
| Q | MediatorName |
| R | BuyerToget |
| S | BuyerActualGot |
| T | PaymentMethod |
| U | PaymentStatus |
| V | PaymentDate |
| W | UserID |
| X | BuyerLess |
| Y | ForWhom |
| Z | Notes |
| AA | ReviewLink |
| AB | OrderScreenshot |

### 3. Accounts
| Column | Field |
|--------|-------|
| A | UserID |
| B | Name |
| C | Account_Type |
| D | Mobile |
| E | WhatsApp |
| F | Parent_UserID |
| G | Email |
| H | Role |
| I | Password |

### 4. Mediator
| Column | Field |
|--------|-------|
| A | Name |
| B | Contact |
| C | WhatsApp |

### 5. Platform (Dropdown data)
| Column | Field |
|--------|-------|
| A | Platform names (Amazon, Flipkart, Meesho, Myntra, Blinkit, etc.) |
| B | OrderStatusContent (Order Placed, Product Received, Reviewed, etc.) |
| C | Deal_Contact_No (7004984949, 8271066951, etc.) |

### 6. Deals
| Column | Field |
|--------|-------|
| A | Deal_id |
| B | title |
| C | platform |
| D | product_url |
| E | price |
| F | Less_amount |
| G | instructions |
| H | image_url |
| I | status |
| J | created_at |

### 7. Dashboard
> Auto-formula summary (read-only)

### 8. Instructions
> Contains details like Purpose, Sheet tabs, Status values, guidelines for rating/review.

---

## 🌐 Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage — Stats bar, quick access cards, how it works |
| `deals.html` | Public deals grid — Prices blurred until login |
| `track.html` | Public order tracking by order number — 6-step timeline |
| `login.html` | Login page — Buyer tab, Mediator tab, Admin tab |
| `buyer-dashboard.html` | My Orders, status timeline, deal browser, raise query |
| `mediator-dashboard.html` | Mediator's orders, total less, total refund |
| `admin-dashboard.html` | Order Form, All Orders, WhatsApp panel, Email, settings |
| `_config.js` | Configuration — API URL, Sheet ID, settings |

---

## 🚀 Setup Instructions

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet named **"SastaDeal"**
3. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```
4. **You DON'T need to manually create tabs!** The setup function in Code.gs will auto-create all 8 tabs with column headers when you run it (see Step 3).

### Step 2: Setup Google Drive Folder

1. Create a new folder in Google Drive for screenshots
2. Right-click → Share → "Anyone with link" can view
3. Get the **Folder ID** from the URL:
   ```
   https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE
   ```

### Step 3: Setup Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete the default `myFunction()` code
4. Copy the entire content of `Code.gs` into the editor
5. **Update the configuration** at the top of the file:
   ```javascript
   const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
   const DRIVE_FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';
   const ADMIN_PASSWORD = 'SastaDeal@2025';
   ```
6. **🔥 RUN THE SETUP FUNCTION:**
   - In the Apps Script editor, find the `setupSheet` function at the top
   - Select `setupSheet` from the function dropdown (next to the ▶️ Run button)
   - Click **▶️ Run**
   - This will auto-create all 8 tabs with column headers and sample data!
   - You'll see "✅ Sheet setup complete!" when done
   - Go back to your Google Sheet and verify all tabs are created
7. Click **Deploy → New deployment**
8. Select type: **Web app**
9. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Click **Deploy**
11. Copy the **Web App URL**

### Step 4: Activate CallMeBot

1. Save admin's phone number: **+917004984949**
2. Send this message to the number **+34 644 519 502** (CallMeBot bot):
   ```
   I allow callmebot to send me messages
   ```
3. You'll receive an API key — update it in `Code.gs`:
   ```javascript
   const CALLMEBOT_API_KEY = 'YOUR_API_KEY_HERE';
   ```

### Step 5: Configure Frontend

1. Open `_config.js`
2. Update the following:
   ```javascript
   API_URL: "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE",
   SHEET_ID: "YOUR_GOOGLE_SHEET_ID_HERE",
   DRIVE_FOLDER_ID: "YOUR_DRIVE_FOLDER_ID_HERE",
   CALLMEBOT_API_KEY: "YOUR_CALLMEBOT_API_KEY_HERE",
   ADMIN_WHATSAPP: "917004984949",
   ADMIN_PASSWORD: "SastaDeal@2025"
   ```

### Step 6: Deploy to GitHub Pages

1. Push all files to `github.com/San5616/OrderDeals3`
2. Go to **Settings → Pages**
3. Source: **Deploy from branch → main → / (root)**
4. Your site will be live at:
   ```
   https://san5616.github.io/OrderDeals3/
   ```

---

## 📲 WhatsApp Notifications

| Trigger | Recipient | Content |
|---------|-----------|---------|
| Order submitted | Buyer | Order details, Price, Less amount, Screenshot |
| Got Refund | Buyer | Order details, Refund amount |
| Payment sent | Buyer | Order details, Payment method, Amount |
| Deal requested | Admin | Buyer name, mobile, deal name |
| Manual send | Any | Custom message with order auto-fill |

---

## 📧 Email Notifications

Same triggers as WhatsApp. Emails are sent via GmailApp in Google Apps Script.

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| Theme | Dark Blue (premium) |
| Background | `#070b14` |
| Surface | `#0d1526` |
| Accent | `#3b82f6` (blue) |
| Font | Inter + JetBrains Mono |
| Layout | Mobile-first, responsive |
| Status badges | Green/Yellow/Red/Blue/Purple/Orange/Pink |

---

## 📁 File Structure

```
OrderDeals3/
├── index.html              # Homepage
├── deals.html              # Deals page
├── track.html              # Public order tracking
├── login.html              # Login (Buyer/Mediator/Admin)
├── buyer-dashboard.html    # Buyer panel
├── mediator-dashboard.html # Mediator panel
├── admin-dashboard.html    # Admin panel
├── _config.js              # Configuration
├── Code.gs                 # Google Apps Script (backend)
└── README.md               # This file
```

---

## 🔑 Default Credentials

| Role | Login Method |
|------|-------------|
| Admin | Password: `SastaDeal@2025` (changeable in Code.gs) |
| Buyer | Mobile/Email + Password |
| Mediator | Mobile/Email + Password |

---

## ✅ Key Features

- [x] 6-step order tracking timeline
- [x] Days counter since RefundFormDate
- [x] Refund completion days display
- [x] Mediator dashboard with totals
- [x] Buyer self-order submission
- [x] Admin order management
- [x] WhatsApp & Email notifications
- [x] Image compression & upload
- [x] PlatformOrderID fetch & pre-fill
- [x] Parent → Account → UserID auto-fill chain
- [x] Public order tracking (no login)
- [x] Deal request system
- [x] Query/raise ticket via email
- [x] Payment search by date/amount
- [x] Pending filter (exclude refunded)
- [x] Mobile-responsive design

---

## 🔄 Next Steps (After Website)

1. ✅ Complete all pages
2. ✅ Connect Google Sheet
3. ✅ Deploy Apps Script
4. ✅ Upload to GitHub Pages
5. ⏳ Test full flow
6. ⏳ Android App development

---

## 📝 Notes

- **BuyerLess** is used in all calculations (NOT "Less")
- Tab names in Google Sheet must match exactly
- Always test after deploying Apps Script updates
- CallMeBot requires activation per phone number
- Image compression happens client-side before upload

---

**Built with ❤️ by San5616**
