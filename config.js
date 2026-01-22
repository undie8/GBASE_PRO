// config.js - ไฟล์ตั้งค่าหลักและระบบความปลอดภัย
// เปลี่ยน URL ตรงนี้แค่ที่เดียว แล้วทุกไฟล์จะเปลี่ยนตามครับ

const CONFIG = {
    // วาง URL ที่ได้จากการ Deploy Google Apps Script ล่าสุดที่นี่
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwXo5B2aGpreIz33_AHWZqZo1Fay_S_JHeYFD2Qu1vyt-urwSAPfM7qfh_PdfB_mwQ6/exec"
};

// ==========================================
// 🛡️ SECURITY SYSTEM (ระบบกันคนแอบเข้า)
// ==========================================
(function() {
    // 1. ตรวจสอบว่าหน้าปัจจุบันคือหน้า Login (index) หรือไม่?
    const path = window.location.pathname;
    // เช็คเงื่อนไขเผื่อกรณีเข้าผ่าน folder root หรือชื่อไฟล์ index ตรงๆ
    const isLoginPage = path.endsWith('index.html') || path.endsWith('index') || path === '/' || path.endsWith('/');

    // 2. ตรวจสอบกุญแจผ่านทาง (SessionStorage)
    const isUnlocked = sessionStorage.getItem('gbase_unlocked') === 'true';

    // 3. กฎเหล็ก: "ถ้ายังไม่ปลดล็อค และ ไม่ได้อยู่หน้า Login -> เตะกลับไปหน้า Login เดี๋ยวนี้!"
    if (!isUnlocked && !isLoginPage) {
        // สั่งย้ายหน้าทันที
        window.location.href = 'index'; 
    }
})();

// ==========================================
// AUTO FAVICON INJECTOR (รูปตัว G)
// ==========================================
(function() {
    // สร้างรูปตัว G (พื้นหลังสีดำ ตัว G สีขาว)
    const iconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <rect width="512" height="512" rx="100" fill="#0f172a"/> 
        <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="350" fill="#22c55e">G</text>
    </svg>
    `;

    // แปลง SVG เป็น URL
    const iconUrl = "data:image/svg+xml," + encodeURIComponent(iconSVG);

    // หาแท็ก icon เดิม (ถ้ามี) หรือสร้างใหม่
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    
    // ยัดรูปตัว G ใส่เข้าไป
    link.href = iconUrl;
})();

// ==========================================
// AUTO TITLE PREFIX (เติมคำว่า GBase -)
// ==========================================
(function() {
    const currentTitle = document.title;
    // ถ้าชื่อเดิมยังไม่มีคำว่า GBase ให้เติมเข้าไปข้างหน้า
    if (!currentTitle.includes("GBase")) {
        // ดึงชื่อแอปเดิมมา แล้วต่อท้าย GBase - 
        document.title = "GBase - " + currentTitle;
    }
})();
