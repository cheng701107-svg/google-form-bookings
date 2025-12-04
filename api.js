/* ===========================================================
   api.js － 專門給 GitHub Pages 用的 JSONP API
   不用 fetch，不用 CORS，任何網域都可用
   =========================================================== */

// ★ 把這裡改成你的 GAS Web App URL ★
const API_BASE = "https://script.google.com/macros/s/AKfycbxtyhpELPybmJwj5lWK7OXa474qryqUiEoWfJaxMjz_iKtYXtEUTgSNbcASAnj6xx2S/exec";

/* ---------- 共用 JSONP 函式 ---------- */
function jsonp(params = {}) {
  return new Promise((resolve, reject) => {
    const cbName = "cb_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    params.callback = cbName;

    const query = new URLSearchParams(params).toString();
    const url   = `${API_BASE}?${query}`;

    const script = document.createElement("script");
    script.src = url;

    window[cbName] = (res) => {
      resolve(res);
      delete window[cbName];
      script.remove();
    };

    script.onerror = () => {
      reject(new Error("JSONP failed"));
      delete window[cbName];
      script.remove();
    };

    document.body.appendChild(script);
  });
}

/* ---------- 封裝實際 API ---------- */
function apiRooms() {
  return jsonp({ action: "rooms" });              // 回傳 {success, rooms:[...]}
}

function apiAvailability(date, nights) {
  return jsonp({ action: "availability", date, nights }); // 回傳 {success, remain:{room_id:數量}}
}

function apiCreateBooking(data) {
  return jsonp({ action: "createBooking", ...data });     // 回傳 {success, order_id}
}
