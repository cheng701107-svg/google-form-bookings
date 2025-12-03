/* ===========================================================
   api.js － 前端與 GAS 的 API 溝通層（Google Material｜Card Flow）
   =========================================================== */

/* ---------------------------------------------------------
   ⭐ STEP 1：設定你的 GAS 部屬網址
   --------------------------------------------------------- */

// ⚠️ 請將此網址替換成你的 GAS Deploy URL
// 例如：https://script.google.com/macros/s/AKxxxxxx/exec

const API_BASE = "https://script.google.com/macros/s/AKfycbzZRykhI3HrwgaAxKoBu1WASRL5KTyBHGuYzEPaUafrVDu9CMaVSx6XOPz5dG1_CPeU/exec";


/* ---------------------------------------------------------
   ⭐ STEP 2：統一 GET 請求
   --------------------------------------------------------- */
asyncfunction apiGet(path) {
  const url = `${API_BASE}${path}`;
  return fetch(url)
    .then(res => res.json());
}

function apiPost(path, data = {}) {
  const url = `${API_BASE}${path}`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
}



/* ---------------------------------------------------------
   ⭐ STEP 3：統一 POST 請求
   --------------------------------------------------------- */
async function apiPost(path, data = {}) {
  const url = API_BASE + path;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("HTTP 錯誤：" + res.status);

    return await res.json();

  } catch (err) {
    console.error("POST API 發生錯誤：", url, err);
    throw err;
  }
}
