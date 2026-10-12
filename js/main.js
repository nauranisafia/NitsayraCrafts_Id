// Nitsayra Craft.id — store logic
const PRODUCTS = [
  {id:1, name:"Swan Lake Bracelet", cat:"bracelet", price:25000, emoji:"🦢", tag:"BEST SELLER", desc:"Mutiara + charm angsa coquette."},
  {id:2, name:"Pink Ribbon Bracelet", cat:"bracelet", price:20000, emoji:"🎀", tag:"", desc:"Manik pink + pita satin mini."},
  {id:3, name:"Strawberry Beads", cat:"bracelet", price:18000, emoji:"🍓", tag:"", desc:"Manik stroberi super gemes."},
  {id:4, name:"Pearl Hair Clip Set", cat:"hair", price:32000, emoji:"🤍", tag:"VIRAL", desc:"Isi 4 jepit mutiara aesthetic."},
  {id:5, name:"Satin Bow Scrunchie", cat:"hair", price:15000, emoji:"💗", tag:"", desc:"Scrunchie satin + pita besar."},
  {id:6, name:"Lace Ribbon Bow", cat:"hair", price:22000, emoji:"🎀", tag:"NEW", desc:"Jepit pita lace premium."},
  {id:7, name:"Teddy Phone Charm", cat:"charm", price:28000, emoji:"🧸", tag:"BEST SELLER", desc:"Boneka teddy + beads pastel."},
  {id:8, name:"Ballet Phone Strap", cat:"charm", price:24000, emoji:"🩰", tag:"", desc:"Strap mutiara + charm balet."},
  {id:9, name:"Heart Locket Charm", cat:"charm", price:18000, emoji:"💝", tag:"", desc:"Gantungan hati + inisial."},
  {id:10, name:"Coquette Gift Box", cat:"gift", price:89000, emoji:"🎁", tag:"GIFT", desc:"3 bracelet + scrunchie + card."},
  {id:11, name:"Bestie Duo Set", cat:"gift", price:45000, emoji:"👭", tag:"", desc:"2 gelang couple custom nama."},
  {id:12, name:"Sweetheart Pouch", cat:"gift", price:55000, emoji:"👛", tag:"NEW", desc:"Pouch lace + 2 aksesoris random."},
];

let cart = {};
try { cart = JSON.parse(localStorage.getItem('nitsayra_cart')||'{}'); } catch(e){ cart={}; }

const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
const findP = id => PRODUCTS.find(p=>p.id===Number(id));

function cardHTML(p){
  return `<div class="card">
    ${p.tag?`<div class="tag">${p.tag}</div>`:''}
    <div class="product-img"><i>${p.emoji}</i></div>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="price">${rupiah(p.price)}</div>
    <div style="display:flex;gap:8px;justify-content:center">
      <button class="btn btn-small" onclick="addToCart(${p.id})">+ Keranjang 🛍️</button>
      <button class="btn btn-small btn-light" onclick="buyNow(${p.id})">Beli 💗</button>
    </div>
  </div>`;
}

function renderBestSeller(){
  const el = document.getElementById('bestSeller');
  if(!el) return;
  el.innerHTML = [PRODUCTS[0],PRODUCTS[3],PRODUCTS[6]].map(cardHTML).join('');
}

function saveCart(){ localStorage.setItem('nitsayra_cart', JSON.stringify(cart)); }

function addToCart(id){
  cart[id]=(cart[id]||0)+1; saveCart(); updateCartUI(); showToast('Ditambahkan ke keranjang 🎀');
}
function buyNow(id){
  cart[id]=(cart[id]||0)+1; saveCart(); updateCartUI(); checkoutWA();
}
function changeQty(id,d){
  cart[id]=(cart[id]||0)+d;
  if(cart[id]<=0) delete cart[id];
  saveCart(); updateCartUI();
}
function updateCartUI(){
  const countEl=document.getElementById('cartCount');
  const box=document.getElementById('cartItems');
  const totalEl=document.getElementById('cartTotal');
  const ids=Object.keys(cart);
  const count=ids.reduce((s,k)=>s+cart[k],0);
  if(countEl) countEl.textContent=count;
  if(!box) return;
  if(!ids.length){ box.innerHTML=`<p style="text-align:center;font-size:14px">Keranjang masih kosong 🥺<br>Yuk pilih yang gemes-gemes! 🎀</p>`; if(totalEl) totalEl.textContent='Total: Rp 0'; return; }
  let total=0;
  box.innerHTML=ids.map(k=>{
    const p=findP(k); if(!p) return '';
    total+=p.price*cart[k];
    return `<div class="cart-item"><div class="e">${p.emoji}</div>
      <div><b style="font-size:13.5px">${p.name}</b><br><span style="font-size:13px">${rupiah(p.price)}</span></div>
      <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${cart[k]}</b><button onclick="changeQty(${p.id},1)">+</button></div>
    </div>`;
  }).join('');
  if(totalEl) totalEl.textContent='Total: '+rupiah(total);
}
function toggleCart(e){
  if(e) e.preventDefault();
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function checkoutWA(){
  const ids=Object.keys(cart);
  if(!ids.length){ showToast('Keranjang masih kosong 🥺'); return; }
  let msg='Halo Nitsayra Craft.id! 🎀 Aku mau order:%0A';
  let total=0;
  ids.forEach(k=>{ const p=findP(k); total+=p.price*cart[k]; msg+=`%0A• ${p.name} x${cart[k]} — ${rupiah(p.price*cart[k])}`; });
  msg+=`%0A%0ATotal: ${rupiah(total)}%0A%0AMakasih ya kak! 💗`;
  window.open(`https://wa.me/6281213206792?text=${msg}`,'_blank');
}
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  if(!t) return;
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}
function subscribe(e){
  e.preventDefault();
  const em=document.getElementById('nlEmail').value;
  showToast(`Yeay! ${em} dapet diskon 10% 🎀`);
  document.getElementById('nlEmail').value='';
  return false;
}
