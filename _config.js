// ============================================
// SastaDeal — Client Configuration (PUBLIC)
// ============================================
// ⚠️ THIS FILE IS PUBLIC — anyone can view it on GitHub!
// NEVER put passwords, API keys, or secrets here.
// All sensitive data is stored only in Code.gs (server-side).
// ============================================

const CONFIG = {
  // Google Apps Script Web App URL (paste after deploying)
  API_URL: "https://script.google.com/macros/s/AKfycbxVOmNHntcy95qiPfH69sc6CduSI72zSwSd5I-JM2RcAIkQCIXd9yhFRczzY67xup0a/exec",

  // Session key names (not secret — just storage keys)
  SESSION_USER: "sastadeal_user",
  SESSION_ROLE: "sastadeal_role",
  SESSION_NAME: "sastadeal_name",
  SESSION_EMAIL: "sastadeal_email",
  SESSION_MOBILE: "sastadeal_mobile",
  SESSION_USERID: "sastadeal_userid",

  // App info (public)
  APP_NAME: "SastaDeal",
  APP_VERSION: "1.0.0",
  GITHUB_REPO: "https://github.com/San5616/OrderDeals3"
};

// ============================================
// 🔒 SECURITY NOTES:
// ============================================
// These are kept ONLY in Code.gs (server-side, not visible):
//   ❌ ADMIN_PASSWORD    → Code.gs line: const ADMIN_PASSWORD = '...'
//   ❌ CALLMEBOT_API_KEY → Code.gs line: const CALLMEBOT_API_KEY = '...'
//   ❌ SHEET_ID          → Code.gs line: const SHEET_ID = '...'
//   ❌ DRIVE_FOLDER_ID   → Code.gs line: const DRIVE_FOLDER_ID = '...'
//   ❌ ADMIN_WHATSAPP    → Code.gs line: const ADMIN_WHATSAPP = '...'
//
// Why? Because _config.js is loaded in the browser — anyone can
// press F12 → Sources → _config.js and read everything.
// Code.gs runs on Google's servers — nobody can see its source code.
// ============================================

// Utility: Get session data
function getSession() {
  return {
    user: sessionStorage.getItem(CONFIG.SESSION_USER),
    role: sessionStorage.getItem(CONFIG.SESSION_ROLE),
    name: sessionStorage.getItem(CONFIG.SESSION_NAME),
    email: sessionStorage.getItem(CONFIG.SESSION_EMAIL),
    mobile: sessionStorage.getItem(CONFIG.SESSION_MOBILE),
    userid: sessionStorage.getItem(CONFIG.SESSION_USERID)
  };
}

// Utility: Check if logged in
function isLoggedIn() {
  return !!sessionStorage.getItem(CONFIG.SESSION_ROLE);
}

// Utility: Check if admin
function isAdmin() {
  return sessionStorage.getItem(CONFIG.SESSION_ROLE) === 'admin';
}

// Utility: Check if buyer
function isBuyer() {
  return sessionStorage.getItem(CONFIG.SESSION_ROLE) === 'buyer';
}

// Utility: Check if mediator
function isMediator() {
  return sessionStorage.getItem(CONFIG.SESSION_ROLE) === 'mediator';
}

// Utility: Logout
function logout() {
  sessionStorage.clear();
  window.location.href = 'login.html';
}

// Utility: API call helper
async function apiCall(action, data = {}) {
  try {
    const response = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action, ...data })
    });
    return await response.json();
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, error: err.message };
  }
}

// Utility: Format date
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Utility: Format currency
function formatCurrency(amount) {
  if (!amount && amount !== 0) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Utility: Days between dates
function daysBetween(date1, date2) {
  if (!date1 || !date2) return null;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

// Utility: Compress image
async function compressImage(file, maxSizeKB = 200) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round(height * maxDim / width);
            width = maxDim;
          } else {
            width = Math.round(width * maxDim / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Try quality levels
        let quality = 0.8;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        while (dataUrl.length / 1024 > maxSizeKB && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Utility: Show toast notification
function showToast(message, type = 'info', duration = 3000) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
    background: ${colors[type] || colors.info}; color: white;
    padding: 12px 24px; border-radius: 12px; font-size: 14px;
    z-index: 99999; opacity: 0; transition: opacity 0.3s;
    font-family: 'Inter', sans-serif; max-width: 90%; text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, duration);
}

// Utility: Status badge HTML
function statusBadge(status) {
  const colors = {
    'Order Placed': '#3b82f6',
    'Product Received': '#8b5cf6',
    'Reviewed': '#f59e0b',
    'Review Live': '#06b6d4',
    'Refund form filled': '#ec4899',
    'Got Refund': '#10b981',
    'Pending payment': '#f59e0b',
    'Paid': '#10b981',
    'Cancelled': '#ef4444',
    'Refunded': '#10b981'
  };
  const color = colors[status] || '#6b7280';
  return `<span style="background:${color}22;color:${color};padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid ${color}44;">${status || 'Unknown'}</span>`;
}

// Utility: Payment status badge
function paymentBadge(status) {
  if (status === 'Paid') return '<span style="background:#10b98122;color:#10b981;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid #10b98144;">✅ Paid</span>';
  return '<span style="background:#f59e0b22;color:#f59e0b;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid #f59e0b44;">⏳ Pending</span>';
}
