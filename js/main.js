// Nitsayra Craft — catalog logic (4 kategori + slider foto, order via WA)
const WA_NUMBER = '6281213206792';
const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
const priceText = p => (typeof p === 'number' ? rupiah(p) : p);

// CARA PASANG FOTO ASLI:
// 1. Buat folder "images" sejajar dengan index.html
// 2. Masukkan foto ke folder itu dengan nama persis seperti di bawah
//    (cth: images/bracelet-stone-1.jpg)
// 3. Format bebas: .jpg / .jpeg / .png / .webp
// Nama file foto Bracelet:
//   images/bracelet-stone-1.jpg  (Stone Bracelet)
//   images/bracelet-flowery-bw-1.jpg  (Flowery Beads Black and White)
//   images/bracelet-flowery-white-1.jpg  (Flowery Beads White)
//   images/bracelet-flowery-colorful-1.jpg  (Flowery Beads Colorful)
//   images/bracelet-butterfly-1.jpg  (Gelang Crystal dan Beads Kupu-Kupu)
// Selama fotonya belum ada, yang tampil gambar emoji placeholder.
const CATALOG = [
  {
    id: 'dolls', title: 'Various Crocheted Dolls', icon: '🧸',
    desc: 'Boneka rajut (amigurumi) super gemes, dirajut satu per satu dengan benang premium. Cocok buat kado & koleksi!',
    items: [
      {name:'Bunny Doll', price:55000, emoji:'🐰', desc:'Boneka kelinci rajut + pita satin.', photos:['images/dolls-bunny-1.jpg','images/dolls-bunny-2.jpg','images/dolls-bunny-3.jpg']},
      {name:'Bear Doll', price:55000, emoji:'🧸', desc:'Boneka beruang rajut, favorit bestie!', photos:['images/dolls-bear-1.jpg','images/dolls-bear-2.jpg','images/dolls-bear-3.jpg']},
      {name:'Cat Doll', price:50000, emoji:'🐱', desc:'Boneka kucing rajut + syal mini.', photos:['images/dolls-cat-1.jpg','images/dolls-cat-2.jpg','images/dolls-cat-3.jpg']},
      {name:'Frog Doll', price:45000, emoji:'🐸', desc:'Boneka kodok rajut yang lagi viral.', photos:['images/dolls-frog-1.jpg','images/dolls-frog-2.jpg','images/dolls-frog-3.jpg']},
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
      {name:'Gelang Crystal dan Beads Kupu-Kupu', price:'Rp 25.000', emoji:'🦋', desc:'Gelang tali dengan crystal dan manik kupu-kupu.', photos:['images/bracelet-butterfly-1.jpg']},
    ]
  },
  {
    id: 'straps', title: 'Phone Straps', icon: '📱',
    desc: 'Gantungan HP beads + charm lucu. Bikin HP makin gemes & tidak gampang jatuh!',
    items: [
      {name:'Teddy Strap', price:28000, emoji:'🧸', desc:'Boneka teddy mini + beads pastel.', photos:['images/straps-teddy-1.jpg','images/straps-teddy-2.jpg','images/straps-teddy-3.jpg']},
      {name:'Ballet Strap', price:24000, emoji:'🩰', desc:'Strap mutiara + charm balet.', photos:['images/straps-ballet-1.jpg','images/straps-ballet-2.jpg','images/straps-ballet-3.jpg']},
      {name:'Heart Strap', price:18000, emoji:'💝', desc:'Gantungan hati + inisial nama.', photos:['images/straps-heart-1.jpg','images/straps-heart-2.jpg','images/straps-heart-3.jpg']},
      {name:'Flower Strap', price:22000, emoji:'🌸', desc:'Beads bunga warna-warni ceria.', photos:['images/straps-flower-1.jpg','images/straps-flower-2.jpg','images/straps-flower-3.jpg']},
    ]
  },
  {
    id: 'necklace', title: 'Necklace', icon: '💎',
    desc: 'Kalung mutiara & pendant yang manis. Hypoallergenic, aman untuk kulit sensitif!',
    items: [
      {name:'Pearl Necklace', price:45000, emoji:'🤍', desc:'Kalung mutiara classic elegan.', photos:['images/necklace-pearl-1.jpg','images/necklace-pearl-2.jpg','images/necklace-pearl-3.jpg']},
      {name:'Ribbon Pendant', price:35000, emoji:'🎀', desc:'Liontin pita pretty super manis.', photos:['images/necklace-ribbon-1.jpg','images/necklace-ribbon-2.jpg','images/necklace-ribbon-3.jpg']},
      {name:'Heart Locket', price:38000, emoji:'💗', desc:'Liontin hati + inisial kamu.', photos:['images/necklace-heart-1.jpg','images/necklace-heart-2.jpg','images/necklace-heart-3.jpg']},
      {name:'Daisy Choker', price:32000, emoji:'🌼', desc:'Choker beads bunga daisy.', photos:['images/necklace-daisy-1.jpg','images/necklace-daisy-2.jpg','images/necklace-daisy-3.jpg']},
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
        <p>${it.desc}</p>
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
