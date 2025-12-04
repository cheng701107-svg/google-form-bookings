/* Google Apps Script 伺服器網址 ★請替換成你自己的★ */
const API_URL = "https://script.google.com/macros/s/AKfycbzZRykhI3HrwgaAxKoBu1WASRL5KTyBHGuYzEPaUafrVDu9CMaVSx6XOPz5dG1_CPeU/exec";

/* =======================
   JSONP 方式取得資料（避免 CORS 阻擋）
   ======================= */
function jsonp(url){
  return new Promise((resolve,reject)=>{
    const cb = "cb_" + Date.now();
    window[cb] = (res)=>{
      resolve(res);
      script.remove();
      delete window[cb];
    };
    const script = document.createElement("script");
    script.src = `${url}&callback=${cb}`;
    script.onerror = ()=>reject("JSONP 請求失敗");
    document.body.appendChild(script);
  });
}

/* =======================
   取得房型資料
   ======================= */
function getRooms(){
  return jsonp(`${API_URL}?action=rooms`);
}

/* =======================
   取得訂單資料（admin使用）
   ======================= */
function getBookings(){
  return jsonp(`${API_URL}?action=bookings`);
}
