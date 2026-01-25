<!doctype html>
<html lang="th" class="h-full">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sci Shop - ระบบร้านค้าสวัสดิการห้องวิทยาศาสตร์</title>
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

<body class="h-full gradient-bg overflow-hidden">
  <div id="app" class="h-full overflow-auto text-gray-800">
    
    <div id="toast-container" class="fixed top-4 right-4 z-[100] flex flex-col gap-2"></div>

    <div id="auth-page" class="min-h-full flex items-center justify-center p-4">
      <div class="card-glass rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🧋</div>
          <h1 class="text-3xl font-bold">Sci Shop</h1>
          <p class="text-gray-500 mt-2">โรงเรียนคลองขวาง</p>
        </div>
        
        <div class="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button onclick="switchAuth('login')" id="login-tab" class="flex-1 py-2 rounded-lg font-medium bg-white shadow">เข้าสู่ระบบ</button>
          <button onclick="switchAuth('reg')" id="reg-tab" class="flex-1 py-2 rounded-lg font-medium text-gray-500">สมัครใหม่</button>
        </div>

        <form id="login-form" onsubmit="handleLogin(event)" class="space-y-4">
          <input type="text" id="l-user" required class="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-500" placeholder="ชื่อผู้ใช้">
          <input type="password" id="l-pass" required class="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-500" placeholder="รหัสผ่าน">
          <button type="submit" class="w-full btn-primary text-white py-3 rounded-xl font-bold shadow-lg">เข้าสู่ระบบ</button>
        </form>

        <form id="reg-form" onsubmit="handleRegister(event)" class="space-y-4 hide">
          <input type="text" id="r-user" required class="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-500" placeholder="ชื่อผู้ใช้">
          <input type="password" id="r-pass" required class="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-500" placeholder="รหัสผ่าน">
          <input type="password" id="r-confirm" required class="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-500" placeholder="ยืนยันรหัสผ่าน">
          <button type="submit" class="w-full btn-primary text-white py-3 rounded-xl font-bold shadow-lg">สมัครสมาชิก</button>
        </form>
      </div>
    </div>

    <div id="shop-page" class="hide min-h-full">
      <header class="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-3xl">🧋</span>
            <h1 class="text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">Sci Shop</h1>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="hidden md:flex flex-col items-end">
              <span id="user-display" class="font-bold text-sm">User</span>
              <span id="role-badge" class="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 uppercase font-bold">Member</span>
            </div>
            <div class="bg-green-100 px-4 py-2 rounded-2xl flex items-center gap-2">
              <span class="text-green-600">💰</span>
              <span id="balance-display" class="font-bold text-green-700">0</span>
            </div>
            <button onclick="toggleCart()" class="relative p-2 bg-pink-50 rounded-full text-2xl">
              🛒 <span id="cart-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </button>
            <button onclick="logout()" class="p-2 hover:bg-gray-100 rounded-full">🚪</button>
          </div>
        </div>
      </header>

      <div id="admin-bar" class="hide max-w-7xl mx-auto px-4 mt-4">
        <button onclick="toggleAdminPanel()" class="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 py-2 rounded-xl font-bold shadow-md">
          ⚙️ แผงควบคุมผู้ดูแลระบบ
        </button>
      </div>

      <div id="admin-panel" class="hide max-w-7xl mx-auto px-4 mt-4">
        <div class="bg-white rounded-3xl p-6 shadow-xl border-2 border-yellow-200">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">👑 การจัดการระบบ</h2>
            <button onclick="toggleAdminPanel()">✕</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h3 class="font-bold text-pink-600">➕ เพิ่มสินค้า</h3>
              <form onsubmit="addProduct(event)" class="grid grid-cols-2 gap-2">
                <input id="p-name" placeholder="ชื่อสินค้า" required class="col-span-2 p-2 border rounded-lg">
                <input id="p-price" type="number" placeholder="ราคา" required class="p-2 border rounded-lg">
                <input id="p-icon" placeholder="อีโมจิ (เช่น 🥤)" required class="p-2 border rounded-lg">
                <button class="col-span-2 bg-pink-500 text-white py-2 rounded-lg font-bold">บันทึกสินค้า</button>
              </form>
            </div>
            <div class="space-y-3">
              <h3 class="font-bold text-green-600">💵 เติมเงินสมาชิก</h3>
              <form onsubmit="handleTopup(event)" class="space-y-2">
                <select id="topup-user" class="w-full p-2 border rounded-lg"></select>
                <input id="topup-amt" type="number" placeholder="จำนวนเงิน" required class="w-full p-2 border rounded-lg">
                <button class="w-full bg-green-500 text-white py-2 rounded-lg font-bold">ยืนยันการเติมเงิน</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <div id="product-list" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          </div>
      </main>

      <div id="cart-drawer" class="hide fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/40" onclick="toggleCart()"></div>
        <div class="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col">
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">🛒 ตะกร้าสินค้า</h2>
          <div id="cart-items" class="flex-1 overflow-auto space-y-4 pr-2"></div>
          <div class="border-t pt-4 mt-4">
            <div class="flex justify-between text-xl font-bold mb-6">
              <span>รวมทั้งสิ้น</span>
              <span id="cart-total" class="text-pink-600">0 บาท</span>
            </div>
            <button onclick="checkout()" class="w-full btn-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl">ชำระเงิน</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // --- Data Management ---
    let users = JSON.parse(localStorage.getItem('sci_users')) || [
      { user: 'admin', pass: '1234', balance: 1000, role: 'admin' }
    ];
    let products = JSON.parse(localStorage.getItem('sci_prods')) || [
      { id: 1, name: 'น้ำเย็น', price: 10, icon: '🧊' },
      { id: 2, name: 'นมชมพู', price: 25, icon: '🥤' },
      { id: 3, name: 'ขนมปัง', price: 15, icon: '🍞' }
    ];
    let currentUser = null;
    let cart = [];

    // --- Auth Functions ---
    function switchAuth(mode) {
      const isLogin = mode === 'login';
      document.getElementById('login-form').classList.toggle('hide', !isLogin);
      document.getElementById('reg-form').classList.toggle('hide', isLogin);
      document.getElementById('login-tab').className = isLogin ? 'flex-1 py-2 rounded-lg font-medium bg-white shadow' : 'flex-1 py-2 rounded-lg font-medium text-gray-500';
      document.getElementById('reg-tab').className = !isLogin ? 'flex-1 py-2 rounded-lg font-medium bg-white shadow' : 'flex-1 py-2 rounded-lg font-medium text-gray-500';
    }

    function handleLogin(e) {
      e.preventDefault();
      const u = document.getElementById('l-user').value;
      const p = document.getElementById('l-pass').value;
      const user = users.find(x => x.user === u && x.pass === p);
      if (user) {
        currentUser = user;
        initShop();
        showToast(`ยินดีต้อนรับ ${u}!`);
      } else {
        showToast('ชื่อผู้ใช้หรือรหัสผ่านผิด', 'error');
      }
    }

    function handleRegister(e) {
      e.preventDefault();
      const u = document.getElementById('r-user').value;
      const p = document.getElementById('r-pass').value;
      const c = document.getElementById('r-confirm').value;
      if (p !== c) return showToast('รหัสผ่านไม่ตรงกัน', 'error');
      if (users.find(x => x.user === u)) return showToast('ชื่อนี้ถูกใช้ไปแล้ว', 'error');
      
      users.push({ user: u, pass: p, balance: 0, role: 'member' });
      save();
      showToast('สมัครสมาชิกสำเร็จ!');
      switchAuth('login');
    }

    function logout() {
      currentUser = null;
      cart = [];
      document.getElementById('shop-page').classList.add('hide');
      document.getElementById('auth-page').classList.remove('hide');
    }

    // --- Shop Functions ---
    function initShop() {
      document.getElementById('auth-page').classList.add('hide');
      document.getElementById('shop-page').classList.remove('hide');
      document.getElementById('user-display').innerText = currentUser.user;
      document.getElementById('balance-display').innerText = currentUser.balance.toLocaleString();
      document.getElementById('role-badge').innerText = currentUser.role;
      
      if(currentUser.role === 'admin') {
        document.getElementById('admin-bar').classList.remove('hide');
        updateAdminSelect();
      } else {
        document.getElementById('admin-bar').classList.add('hide');
        document.getElementById('admin-panel').classList.add('hide');
      }
      renderProducts();
    }

    function renderProducts() {
      const container = document.getElementById('product-list');
      container.innerHTML = products.map(p => `
        <div class="product-card card-glass rounded-2xl p-4 flex flex-col items-center text-center">
          <div class="text-4xl mb-2">${p.icon}</div>
          <div class="font-bold text-gray-700 truncate w-full">${p.name}</div>
          <div class="text-pink-600 font-bold mb-3">${p.price}.-</div>
          <button onclick="addToCart(${p.id})" class="w-full bg-pink-100 text-pink-600 py-1.5 rounded-lg text-sm font-bold hover:bg-pink-500 hover:text-white transition-colors">
            ใส่ตะกร้า
          </button>
          ${currentUser.role === 'admin' ? `<button onclick="delProduct(${p.id})" class="text-[10px] text-red-300 mt-2 hover:text-red-500">ลบสินค้า</button>` : ''}
        </div>
      `).join('');
    }

    // --- Cart Functions ---
    function addToCart(id) {
      const prod = products.find(p => p.id === id);
      cart.push(prod);
      updateCartUI();
      showToast(`เพิ่ม ${prod.name} แล้ว`);
    }

    function toggleCart() {
      document.getElementById('cart-drawer').classList.toggle('hide');
      renderCartItems();
    }

    function renderCartItems() {
      const container = document.getElementById('cart-items');
      const totalEl = document.getElementById('cart-total');
      let total = 0;

      if(cart.length === 0) {
        container.innerHTML = `<div class="text-center text-gray-400 mt-10">ตะกร้ายังว่างอยู่เลย...</div>`;
      } else {
        container.innerHTML = cart.map((item, index) => {
          total += item.price;
          return `
            <div class="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
              <div class="flex items-center gap-3">
                <span class="text-2xl">${item.icon}</span>
                <span class="font-medium text-sm">${item.name}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-bold">${item.price}.-</span>
                <button onclick="removeFromCart(${index})" class="text-red-400">✕</button>
              </div>
            </div>
          `;
        }).join('');
      }
      totalEl.innerText = `${total.toLocaleString()} บาท`;
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      renderCartItems();
      updateCartUI();
    }

    function updateCartUI() {
      document.getElementById('cart-count').innerText = cart.length;
    }

    function checkout() {
      const total = cart.reduce((s, i) => s + i.price, 0);
      if (cart.length === 0) return showToast('ไม่มีสินค้าในตะกร้า', 'error');
      if (currentUser.balance < total) return showToast('เงินไม่พอจ้า! ไปหาครูเติมเงินนะ', 'error');

      currentUser.balance -= total;
      cart = [];
      updateCartUI();
      save();
      initShop();
      toggleCart();
      showToast('🎉 ชำระเงินเรียบร้อย ขอบคุณที่ใช้บริการ', 'success');
    }

    // --- Admin Functions ---
    function toggleAdminPanel() {
      document.getElementById('admin-panel').classList.toggle('hide');
    }

    function addProduct(e) {
      e.preventDefault();
      const name = document.getElementById('p-name').value;
      const price = Number(document.getElementById('p-price').value);
      const icon = document.getElementById('p-icon').value;
      
      products.push({ id: Date.now(), name, price, icon });
      save();
      renderProducts();
      e.target.reset();
      showToast('เพิ่มสินค้าใหม่แล้ว');
    }

    function delProduct(id) {
      if(!confirm('ลบสินค้านี้ใช่ไหม?')) return;
      products = products.filter(x => x.id !== id);
      save();
      renderProducts();
    }

    function updateAdminSelect() {
      const sel = document.getElementById('topup-user');
      sel.innerHTML = users.map(u => `<option value="${u.user}">${u.user} (คงเหลือ: ${u.balance}฿)</option>`).join('');
    }

    function handleTopup(e) {
      e.preventDefault();
      const target = document.getElementById('topup-user').value;
      const amt = Number(document.getElementById('topup-amt').value);
      const user = users.find(x => x.user === target);
      if(user) {
        user.balance += amt;
        save();
        initShop();
        showToast(`เติมเงินให้ ${target} เรียบร้อย!`);
        e.target.reset();
      }
    }

    // --- Utilities ---
    function save() {
      localStorage.setItem('sci_users', JSON.stringify(users));
      localStorage.setItem('sci_prods', JSON.stringify(products));
    }

    function showToast(msg, type = 'success') {
      const container = document.getElementById('toast-container');
      const div = document.createElement('div');
      div.className = `toast px-6 py-3 rounded-2xl shadow-lg text-white font-bold flex items-center gap-2 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
      div.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
      container.appendChild(div);
      setTimeout(() => {
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 500);
      }, 3000);
    }
  </script>
</body>
</html>