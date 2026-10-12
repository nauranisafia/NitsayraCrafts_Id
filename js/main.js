// Nitsayra Craft — catalog logic (4 kategori + slider foto, order via WA)
const WA_NUMBER = '6281213206792';
const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
const priceText = p => (typeof p === 'number' ? rupiah(p) : p);

// CARA PASANG FOTO ASLI:
// 1. Buat folder "images" sejajar dengan index.html
// 2. Masukkan foto ke folder itu dengan nama persis seperti di bawah
//    (cth: images/bracelet-stone-1.jpg)
// 3. Format bebas: .jpg / .jpeg / .png / .webp
// Nama file foto Crocheted Dolls:
//   images/dolls-bandana-1.jpg  (Bandana Rajut)
//   images/dolls-berrybuzz-1.jpg  (Berry buzz)
//   images/dolls-bunbun-1.jpg  (Bun Bun Hops)
//   images/dolls-mushie-1.jpg  (Chubby Mushie)
//   images/dolls-donut-1.jpg  (Donut)
//   images/dolls-chicks-1.jpg  (Fluffy Chicks)
// Nama file foto Bracelet:
//   images/bracelet-stone-1.jpg  (Stone Bracelet)
//   images/bracelet-flowery-bw-1.jpg  (Flowery Beads Black and White)
//   images/bracelet-flowery-white-1.jpg  (Flowery Beads White)
//   images/bracelet-flowery-colorful-1.jpg  (Flowery Beads Colorful)
//   images/bracelet-butterfly-1.jpg  (Gelang Crystal dan Beads Kupu-Kupu)
//   images/straps-phone-1.jpg s/d images/straps-phone-6.jpg  (Phone Strap)
//   images/necklace-stone-1.jpg s/d images/necklace-stone-9.jpg  (Stone Necklace)
//   images/necklace-stone-love-1.jpg  (Stone Necklace Love)
// Selama fotonya belum ada, yang tampil gambar emoji placeholder.
const CATALOG = [
  {
    id: 'dolls', title: 'Various Crocheted Dolls', icon: '🧸', hideDesc: true,
    desc: 'Boneka rajut (amigurumi) super gemes, dirajut satu per satu dengan benang premium. Cocok buat kado & koleksi!',
    items: [
      {name:'Bandana Rajut', price:'Rp 28.000', emoji:'🧶', desc:'', photos:['images/dolls-bandana-1.jpg']},
      {name:'Berry buzz', price:'Rp 48.000', emoji:'🍓', desc:'', photos:['images/dolls-berrybuzz-1.jpg']},
      {name:'Bun Bun Hops', price:'Rp 50.000', emoji:'🐰', desc:'', photos:['images/dolls-bunbun-1.jpg']},
      {name:'Chubby Mushie', price:'Rp 55.000', emoji:'🍄', desc:'', photos:['images/dolls-mushie-1.jpg']},
      {name:'Donut', price:'Rp 47.000', emoji:'🍩', desc:'', photos:['images/dolls-donut-1.jpg']},
      {name:'Fluffy Chicks', price:'Rp 25.000', emoji:'🐣', desc:'', photos:['images/dolls-chicks-1.jpg']},
    ]
  },
  {
    id: 'bracelet', title: 'Bracelet', icon: '📿',
    desc: 'Gelang manik pastel, mutiara & pita satin. Bisa custom nama, warna & ukuran!',
    items: [
      {name:'Stone Bracelet', price:'Rp 17.000 - 35.000', emoji:'💎', desc:'Gelang tali dengan tambahan batu dan beads cantik.', photos:['images/bracelet-stone-1.jpg']},
      {name:'Flowery Beads Black and White', price:'Rp 27.000', emoji:'🖤', desc:'Gelang bunga dengan warna hitam dan putih.', photos:['images/bracelet-flowery-bw-1.jpg']},
      {name:'Flowery Beads White', price:'Rp 27.000', emoji:'🤍', desc:'Gelang bunga dengan warna putih.', photos:['images/bracelet-flowery-white-1.jpg']},
      {name:'Flowery Beads Colorful', price:'Rp 27.000', emoji:'🌸', desc:'Gelang bunga dengan berbagai warna.', photos:['images/bracelet-flowery-colorful-1.jpg']},
      {name:'Gelang Crystal dan Beads Kupu-Kupu', price:'Rp 17.000 - 27.000', emoji:'🦋', desc:'Gelang tali dengan crystal dan manik kupu-kupu.', photos:['images/bracelet-butterfly-1.jpg']},
    ]
  },
  {
    id: 'straps', title: 'Phone Straps', icon: '📱',
    desc: 'Gantungan HP beads + charm lucu. Bikin HP makin gemes & tidak gampang jatuh!',
    items: [
      {name:'Phone Strap', price:'Rp 18.000', emoji:'📱', desc:'Phone strap dengan manik manik gemas yang mempercantik hp mu!', photos:['images/straps-phone-1.jpg','images/straps-phone-2.jpg','images/straps-phone-3.jpg','images/straps-phone-4.jpg','images/straps-phone-5.jpg','images/straps-phone-6.jpg']},
    ]
  },
  {
    id: 'necklace', title: 'Necklace', icon: '💎',
    desc: 'Kalung mutiara & pendant yang manis. Hypoallergenic, aman untuk kulit sensitif!',
    items: [
      {name:'Stone Necklace', price:'Rp 47.000', emoji:'💎', desc:'Kalung dengan batu yang cantik.', photos:['images/necklace-stone-1.jpg','images/necklace-stone-2.jpg','images/necklace-stone-3.jpg','images/necklace-stone-4.jpg','images/necklace-stone-5.jpg','images/necklace-stone-6.jpg','images/necklace-stone-7.jpg','images/necklace-stone-8.jpg','images/necklace-stone-9.jpg']},
      {name:'Stone Necklace Love', price:'Rp 37.000', emoji:'💗', desc:'Kalung dengan batu yang cantik berbentuk love.', photos:['images/necklace-stone-love-1.jpg']},
    ]
  },
];

const slideState = {};

function buildCatalog(){
  const pills = document.getElementById('catPills');
  const wrap = document.getElementById('catalogSliders');
  if(!pills || !wrap) return;
  pills.innerHTML = CATALOG.map(c=>`<a href="#${c.id}">${c.icon} ${c.title}</a>`).join('');
  wrap.innerHTML = CATALOG.map(c=>{
    slideState[c.id] = {slide:0, photos:{}};
    const slides = c.items.map((it,ii)=>{
      slideState[c.id].photos[ii] = 0;
      const multi = it.photos.length > 1;
      return `<div class="slide">
        <div class="slide-photo" id="ph-${c.id}-${ii}">
          <span class="ph-emoji">${it.emoji}</span>
          <img src="${it.photos[0]}" alt="${it.name}" loading="lazy" onerror="this.remove()">
          ${multi ? `<button class="ph-prev" onclick="itemPhoto('${c.id}',${ii},-1)" aria-label="Foto sebelumnya">‹</button>
          <button class="ph-next" onclick="itemPhoto('${c.id}',${ii},1)" aria-label="Foto berikutnya">›</button>
          <span class="ph-count" id="phc-${c.id}-${ii}">1 / ${it.photos.length}</span>` : ''}
        </div>
        <h3>${it.name}</h3>
        ${c.hideDesc ? '' : `<p>${it.desc}</p>`}
        <div class="price">${priceText(it.price)}</div>
        <button class="btn btn-small" onclick="orderItem('${c.id}',${ii})">Order via WA 💬</button>
      </div>`;
    }).join('');
    const dots = c.items.map((_,ii)=>`<button onclick="catGo('${c.id}',${ii})" aria-label="Lihat produk ${ii+1}"></button>`).join('');
    return `<div class="cat-block" id="${c.id}">
      <div class="cat-head"><span class="cat-icon">${c.icon}</span>
        <div><h2>${c.title}</h2><p>${c.desc}</p></div>
      </div>
      <div class="slider" id="sl-${c.id}">
        <div class="slider-track" id="st-${c.id}">${slides}</div>
        <button class="s-prev" onclick="catSlide('${c.id}',-1)" aria-label="Geser kiri">‹</button>
        <button class="s-next" onclick="catSlide('${c.id}',1)" aria-label="Geser kanan">›</button>
      </div>
      <div class="s-dots" id="sd-${c.id}">${dots}</div>
    </div>`;
  }).join('');
  CATALOG.forEach(c=>{ attachSwipe(c.id); updateSlider(c.id); });
  const params = new URLSearchParams(location.search);
  const alias = {hair:'dolls', charm:'straps', gift:'necklace'};
  let target = params.get('cat');
  if(target && alias[target]) target = alias[target];
  if(!target && location.hash) target = location.hash.slice(1);
  if(target && document.getElementById(target)){
    setTimeout(()=>document.getElementById(target).scrollIntoView({behavior:'smooth'}), 100);
  }
}

function updateSlider(catId){
  const st = document.getElementById('st-'+catId);
  const dots = document.querySelectorAll('#sd-'+catId+' button');
  if(!st) return;
  const i = slideState[catId].slide;
  st.style.transform = `translateX(-${i*100}%)`;
  dots.forEach((d,di)=>d.classList.toggle('active', di===i));
}
function catSlide(catId,dir){
  const n = CATALOG.find(c=>c.id===catId).items.length;
  const s = slideState[catId];
  s.slide = (s.slide+dir+n)%n;
  updateSlider(catId);
}
function catGo(catId,i){ slideState[catId].slide = i; updateSlider(catId); }

function itemPhoto(catId,ii,dir){
  const cat = CATALOG.find(c=>c.id===catId);
  const it = cat.items[ii];
  const n = it.photos.length;
  const s = slideState[catId].photos;
  s[ii] = (s[ii]+dir+n)%n;
  const box = document.getElementById(`ph-${catId}-${ii}`);
  if(!box) return;
  box.querySelectorAll('img').forEach(im=>im.remove());
  const img = document.createElement('img');
  img.src = it.photos[s[ii]]; img.alt = it.name; img.loading = 'lazy';
  img.onerror = ()=>img.remove();
  const anchor = box.querySelector('.ph-prev') || box.querySelector('.ph-count');
  box.insertBefore(img, anchor);
  const cnt = document.getElementById(`phc-${catId}-${ii}`);
  if(cnt) cnt.textContent = `${s[ii]+1} / ${n}`;
}

function attachSwipe(catId){
  const sl = document.getElementById('sl-'+catId);
  if(!sl) return;
  let x0 = null;
  sl.addEventListener('touchstart', e=>{ x0 = e.touches[0].clientX; }, {passive:true});
  sl.addEventListener('touchend', e=>{
    if(x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if(Math.abs(dx) > 40) catSlide(catId, dx < 0 ? 1 : -1);
    x0 = null;
  }, {passive:true});
  let mx = null;
  sl.addEventListener('mousedown', e=>{ mx = e.clientX; });
  sl.addEventListener('mouseup', e=>{
    if(mx === null) return;
    const dx = e.clientX - mx;
    if(Math.abs(dx) > 40) catSlide(catId, dx < 0 ? 1 : -1);
    mx = null;
  });
}

function orderItem(catId,ii){
  const cat = CATALOG.find(c=>c.id===catId);
  const it = cat ? cat.items[ii] : null;
  if(!it) return;
  const text = `Halo Nitsayra Craft! 🎀%0A%0AAku mau order:%0A• ${encodeURIComponent(it.name)} (${encodeURIComponent(cat.title)}) — ${encodeURIComponent(priceText(it.price))}%0A%0AMakasih ya kak! 💗`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
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

buildCatalog();
