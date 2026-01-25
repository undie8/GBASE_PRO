<!doctype html>
<html lang="th" class="h-full">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sci Shop - ระบบร้านค้าสวัสดิการ (No Login)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Prompt', sans-serif; box-sizing: border-box; }
    .gradient-bg { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
    .card-glass { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
    .btn-primary { background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%); transition: all 0.3s; }
    .btn-primary:hover { transform: scale(1.02); opacity: 0.9; }
    .product-card { transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.1); }
    .product-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(233, 69, 96, 0.2); }
    
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .toast { animation: slideIn 0.3s ease forwards; }
    .hide { display: none !important; }
  </style>
</head>

<body class="h-full gradient-bg overflow-hidden" onload="initShop()">
  <div id="app" class="h-full overflow-auto text-gray-800">
    
    <div id="toast-container" class="fixed top-4 right-4 z-[100] flex flex-col gap-2"></div>

    <div id="shop-page" class="min-h-full">
      <header class="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-3xl">🧋</span>
            <h1 class="text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">Sci Shop</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div class="flex flex-col items-end">
                <span id="user-display" class="font-bold text-sm text-gray-700">Admin Mode</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 uppercase font-bold">Manager</span>
              </div>
              <div class="bg-green-100 px-4 py-2 rounded-2xl flex items-center gap-2 border border-green-200">
                <span class="text-green-600">💰</span>
                <span id="balance-display" class="font-bold text-green-700 text-lg">0</span>
                <span class="text-xs text-green-600 font-bold">฿</span>
              </div>
            </div>

            <button onclick="toggleCart()" class="relative p-3 bg-pink-50 hover:bg-pink-100 rounded-full text-2xl transition-all">
              🛒 <span id="cart-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">0</span>
            </button>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 mt-6">
        <div class="flex gap-2">
            <button onclick="toggleAdminPanel()" class="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-2xl font-bold border border-white/20 transition-all flex items-center justify-center gap-2">
                ⚙️ ตั้งค่าสินค้าและเติมเงิน
            </button>
        </div>
      </div>

      <div id="admin-panel" class="hide max-w-7xl mx-auto px-4 mt-4">
        <div class="bg-white rounded-3xl p-6 shadow-2xl border-b-4 border-pink-500">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold flex items-center gap-2">👑 ระบบหลังบ้าน</h2>
            <button onclick="toggleAdminPanel()" class="p-2 hover:bg-gray-100 rounded-full">✕</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4 bg-gray-50 p-4 rounded-2xl">
              <h3 class="font-bold text-pink-600 flex items-center gap-2"><span>➕</span> เพิ่มสินค้าใหม่</h3>
              <form onsubmit="addProduct(event)" class="grid grid-cols-2 gap-3">
                <input id="p-name" placeholder="ชื่อสินค้า" required class="col-span-2 p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 outline-none">
                <input id="p-price" type="number" placeholder="ราคา" required class="p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 outline-none">
                <input id="p-icon" placeholder="อีโมจิ (🥤, 🍫)" required class="p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 outline-none">
                <button class="col-span-2 bg-pink-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-pink-200">บันทึกเข้าชั้นวาง</button>
              </form>
            </div>
            <div class="space-y-4 bg-gray-50 p-4 rounded-2xl">
              <h3 class="font-bold text-green-600 flex items-center gap-2"><span>💵</span> แก้ไขยอดเงินคงเหลือ</h3>
              <div class="space-y-3">
                <p class="text-sm text-gray-500 italic">* ปรับยอดเงินของคุณเองเพื่อใช้ในการทดสอบ</p>
                <input id="topup-amt" type="number" placeholder="ระบุจำนวนเงินที่ต้องการปรับ" class="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-green-500 outline-none">
                <button onclick="handleManualTopup()" class="w-full bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200">อัปเดตยอดเงิน</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <h2 class="text-white text-2xl font-bold mb-6 flex items-center gap-3">
            <span class="bg-pink-500 p-2 rounded-lg">✨</span> สินค้าทั้งหมด
        </h2>
        <div id="product-list" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          </div>
      </main>

      <div id="cart-drawer" class="hide fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="toggleCart()"></div>
        <div class="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold">🛒 ตะกร้าของฉัน</h2>
            <button onclick="toggleCart()" class="p-2 hover:bg-gray-100 rounded-full">✕</button>
          </div>
          <div id="cart-items" class="flex-1 overflow-auto space-y-4 pr-2">
            </div>
          <div class="border-t pt-6 mt-4">
            <div class="flex justify-between text-2xl font-bold mb-6 text-gray-800">
              <span>ยอดรวม</span>
              <span id="cart-total" class="text-pink-600">0 บาท</span>
            </div>
            <button onclick="checkout()" class="w-full btn-primary text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-pink-200">
                🚀 ชำระเงินทันที
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // --- Initial Data ---
    let products = JSON.parse(localStorage.getItem('sci_prods_nologin')) || [
      { id: 1, name: 'น้ำดื่ม Sci', price: 10, icon: '💧' },
      { id: 2, name: 'ชานมไข่มุก', price: 35, icon: '🧋' },
      { id: 3, name: 'ขนมปังเนยสด', price: 20, icon: '🍞' },
      { id: 4, name: 'สมุดบันทึกเล่มเล็ก', price: 15, icon: '📓' }
    ];
    
    // ตั้งค่า User เริ่มต้น (เนื่องจากไม่มีล็อกอิน)
    let userBalance = Number(localStorage.getItem('sci_balance')) || 500;
    let cart = [];

    // --- Initialization ---
    function initShop() {
      updateUI();
      renderProducts();
    }

    function updateUI() {
      document.getElementById('balance-display').innerText = userBalance.toLocaleString();
      document.getElementById('cart-count').innerText = cart.length;
      localStorage.setItem('sci_balance', userBalance);
    }

    // --- Product Logic ---
    function renderProducts() {
      const container = document.getElementById('product-list');
      container.innerHTML = products.map(p => `
        <div class="product-card card-glass rounded-3xl p-6 flex flex-col items-center text-center">
          <div class="text-5xl mb-4 bg-gray-100 w-20 h-20 flex items-center justify-center rounded-2xl shadow-inner">${p.icon}</div>
          <div class="font-bold text-gray-800 text-lg mb-1 truncate w-full">${p.name}</div>
          <div class="text-pink-600 font-black text-xl mb-4">${p.price} <span class="text-sm text-gray-400">฿</span></div>
          <button onclick="addToCart(${p.id})" class="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg transition-all active:scale-95">
            เพิ่มลงตะกร้า
          </button>
          <button onclick="delProduct(${p.id})" class="text-[10px] text-gray-300 mt-3 hover:text-red-400 transition-colors uppercase tracking-widest">ลบสินค้า</button>
        </div>
      `).join('');
    }

    function addProduct(e) {
      e.preventDefault();
      const name = document.getElementById('p-name').value;
      const price = Number(document.getElementById('p-price').value);
      const icon = document.getElementById('p-icon').value;
      
      products.push({ id: Date.now(), name, price, icon });
      saveData();
      renderProducts();
      e.target.reset();
      showToast('📦 เพิ่มสินค้าเข้าชั้นวางแล้ว!');
    }

    function delProduct(id) {
      if(!confirm('ยืนยันการลบสินค้านี้?')) return;
      products = products.filter(x => x.id !== id);
      saveData();
      renderProducts();
      showToast('🗑️ ลบสินค้าเรียบร้อย');
    }

    function saveData() {
      localStorage.setItem('sci_prods_nologin', JSON.stringify(products));
    }

    // --- Cart & Checkout ---
    function addToCart(id) {
      const prod = products.find(p => p.id === id);
      cart.push(prod);
      updateUI();
      showToast(`🛒 เพิ่ม ${prod.name} แล้ว`);
    }

    function toggleCart() {
      const drawer = document.getElementById('cart-drawer');
      drawer.classList.toggle('hide');
      if (!drawer.classList.contains('hide')) renderCartItems();
    }

    function renderCartItems() {
      const container = document.getElementById('cart-items');
      const totalEl = document.getElementById('cart-total');
      let total = 0;

      if(cart.length === 0) {
        container.innerHTML = `
          <div class="flex flex-col items-center justify-center h-64 text-gray-300">
            <span class="text-6xl mb-4">💨</span>
            <p>ตะกร้าว่างเปล่า...</p>
          </div>`;
      } else {
        container.innerHTML = cart.map((item, index) => {
          total += item.price;
          return `
            <div class="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div class="flex items-center gap-4">
                <span class="text-3xl">${item.icon}</span>
                <div>
                  <div class="font-bold text-gray-800 text-sm">${item.name}</div>
                  <div class="text-xs text-gray-400">${item.price} บาท</div>
                </div>
              </div>
              <button onclick="removeFromCart(${index})" class="text-red-300 hover:text-red-500 p-2">✕</button>
            </div>
          `;
        }).join('');
      }
      totalEl.innerText = `${total.toLocaleString()} บาท`;
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      renderCartItems();
      updateUI();
    }

    function checkout() {
      const total = cart.reduce((s, i) => s + i.price, 0);
      if (cart.length === 0) return showToast('⚠️ ตะกร้าว่างนะจ๊ะ', 'error');
      if (userBalance < total) return showToast('❌ ยอดเงินไม่เพียงพอ!', 'error');

      userBalance -= total;
      cart = [];
      updateUI();
      toggleCart();
      showToast('🎉 ชำระเงินสำเร็จ! รับสินค้าได้เลย', 'success');
    }

    // --- Admin Logic ---
    function toggleAdminPanel() {
      document.getElementById('admin-panel').classList.toggle('hide');
    }

    function handleManualTopup() {
      const amt = Number(document.getElementById('topup-amt').value);
      if (amt < 0) return showToast('กรุณาระบุจำนวนที่ถูกต้อง', 'error');
      userBalance = amt; // ตั้งค่าเป็นยอดที่ระบุ
      updateUI();
      showToast(`💰 อัปเดตยอดเงินเป็น ${amt} บาทแล้ว`);
      document.getElementById('topup-amt').value = '';
    }

    // --- Utils ---
    function showToast(msg, type = 'success') {
      const container = document.getElementById('toast-container');
      const div = document.createElement('div');
      div.className = `toast px-6 py-4 rounded-2xl shadow-2xl text-white font-bold flex items-center gap-3 border-2 border-white/20 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
      div.innerHTML = `<span>${type === 'success' ? '🔔' : '⚠️'}</span> ${msg}`;
      container.appendChild(div);
      setTimeout(() => {
        div.style.opacity = '0';
        div.style.transform = 'translateX(20px)';
        div.style.transition = 'all 0.5s';
        setTimeout(() => div.remove(), 500);
      }, 3000);
    }
  </script>
</body>
</html>