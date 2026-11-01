// 2.1 Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
  // Accordion for About page
  document.querySelectorAll('.acc-header').forEach(h=>{
    h.addEventListener('click', ()=>{
      const c = h.nextElementSibling;
      c.style.display = c.style.display==='block' ? 'none' : 'block';
    });
  });

  // Tabs for Services
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    });
  });

  // Modal
  window.openModal = () => document.getElementById('myModal')?.classList.add('show');
  window.closeModal = () => document.getElementById('myModal')?.classList.remove('show');

  // 2.2 Dynamic Content - Load services dynamically
  const servicesData = [
    {id:1, name:"Knotless Braids", price:650, cat:"Braids", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9aE6ZNb7uSlnRBszax7Es54CSNH2wf6Gsf8bdShfyAklGQV5gxtnMCU&s=10", desc:"Lightweight, lasts 6 weeks"},
    {id:2, name:"Cut & Style", price:250, cat:"Cut", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMUrMelWbO9pjyLr76PJOsmXmS3a2HArmJBGagNjoEJ2nGytOyV-NuFtI&s=10", desc:"Precision cut + blowdry"},
    {id:3, name:"Colour & Highlights", price:550, cat:"Colour", img:"https://i.pinimg.com/736x/fc/51/a8/fc51a84bf18ebdfea01c4d9463fdd0d1.jpg", desc:"Ammonia-free colour"},
    {id:4, name:"Wig Install", price:400, cat:"Wig", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOweWe4_nSlFB3axkoan794Z7bIuNkrDf4bcbXF_KHsQ&s=10", desc:"Flawless melt"},
    {id:5, name:"Treatment", price:200, cat:"Care", img:"https://www.refinery29.com/images/11026484.jpg", desc:"Deep condition"},
    {id:6, name:"Kids Styles", price:300, cat:"Kids", img:"https://www.styleseat.com/blog/wp-content/uploads/2022/08/Trendy-Kids-Hairstyles-5.png", desc:"Gentle styles"}
  ];

  const grid = document.getElementById('services-dynamic-grid');
  const searchInput = document.getElementById('serviceSearch');
  const sortSelect = document.getElementById('serviceSort');

  function renderServices(list){
    if(!grid) return;
    grid.innerHTML='';
    list.forEach(s=>{
      const art = document.createElement('article'); // Advanced DOM manipulation
      art.innerHTML = `<img src="${s.img}" alt="${s.name} service at Katz Hair-do Cape Town" loading="lazy" width="300" height="200"><h3>${s.name} - R${s.price}</h3><p>${s.desc}</p><span class="badge">${s.cat}</span><button class="btn" onclick="addToEnquiry('${s.name}')">Enquire</button>`;
      grid.appendChild(art);
    });
  }

  // Initial load
  renderServices(servicesData);

  // Search filter
  searchInput?.addEventListener('input', ()=>{
    const q = searchInput.value.toLowerCase();
    const filtered = servicesData.filter(s=> s.name.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q));
    renderServices(filtered);
  });

  // Sort
  sortSelect?.addEventListener('change', ()=>{
    let sorted = [...servicesData];
    if(sortSelect.value==='price-low') sorted.sort((a,b)=>a.price-b.price);
    if(sortSelect.value==='price-high') sorted.sort((a,b)=>b.price-a.price);
    if(sortSelect.value==='name') sorted.sort((a,b)=>a.name.localeCompare(b.name));
    renderServices(sorted);
  });

  // Gallery Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.gallery-img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('show');
    });
  });
  lightbox?.addEventListener('click', ()=>lightbox.classList.remove('show'));

  // Interactive Map - Leaflet for Southern Suburbs
  if(document.getElementById('map')){
    const map = L.map('map').setView([-33.9876, 18.4669], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([-33.9249, 18.4241]).addTo(map).bindPopup('Katz Hair-do City Centre - 45 Loop Street').openPopup();
    L.marker([-33.9876, 18.4669]).addTo(map).bindPopup('Katz Hair-do Claremont - 12 Main Road');
  }
});

function addToEnquiry(serviceName){
  localStorage.setItem('enquiryService', serviceName);
  window.location.href='enquiry.html';
}