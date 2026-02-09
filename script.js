function scrollToStory(){
document.querySelector(".gallery").scrollIntoView({behavior:"smooth"});
}

// MUSIC TOGGLE
let music = document.getElementById("bgMusic");

let vinyl = document.querySelector(".vinyl");

function toggleMusic(){
if(music.paused){
music.play();
vinyl.classList.add("rotate");
}
else{
music.pause();
vinyl.classList.remove("rotate");
}
}

// LOVE COUNTER
const startDate = new Date("2026-01-11");

setInterval(()=>{
let now = new Date();
let diff = now - startDate;

let days = Math.floor(diff/(1000*60*60*24));
let hours = Math.floor(diff/(1000*60*60));
let minutes = Math.floor(diff/(1000*60));

document.getElementById("time").innerHTML =
`${days} Days ❤️ ${hours} Hours 💕 ${minutes} Minutes Now 💖`;
},1000);

function openPopup(message){
document.getElementById("popupText").innerText = message;
document.getElementById("popup").style.display = "flex";
}

function closePopup(){
document.getElementById("popup").style.display = "none";
}


function createHeart(){
const heart = document.createElement("div");
heart.classList.add("heart");
heart.innerHTML = "💗";
heart.style.left = Math.random() * 100 + "vw";
heart.style.fontSize = (15 + Math.random()*25) + "px";
document.body.appendChild(heart);

setTimeout(()=>{
heart.remove();
},8000);
}

setInterval(createHeart,300);

window.addEventListener("scroll", ()=>{
document.querySelectorAll(".reveal").forEach(sec=>{
let top = sec.getBoundingClientRect().top;
let height = window.innerHeight;

if(top < height - 100){
sec.classList.add("active");
}
});
});

// SURPRISE
function showSurprise(){
let box = document.getElementById("surpriseBox");
let music = document.getElementById("bgMusic");

box.style.display = "flex";
box.style.opacity = "0";
box.style.transition = "1s";

setTimeout(()=>{
box.style.opacity = "1";
},100);

music.volume = 0.2;
}


// TYPE LOVE LETTER
let text = "Anushka, from the moment you came into my life, everything became beautiful. I promise to love you and cherish us forever❤️";
let i=0;

function typeWriter(){
if(i < text.length){
document.getElementById("typeText").innerHTML += text.charAt(i);
i++;
setTimeout(typeWriter,80);
}
}
typeWriter();

// THEME FROM HEADER IMAGE
function themeFromHeaderImage() {
	const img = document.querySelector('.hero-image img');
	if (!img) return;

	function applyColors(r,g,b){
		// set CSS vars on root
		const root = document.documentElement;
		root.style.setProperty('--accent', `${r},${g},${b}`);
		// slightly lighter/darker accent for shadows
		const r2 = Math.min(255, Math.round(r * 1.15));
		const g2 = Math.min(255, Math.round(g * 1.15));
		const b2 = Math.min(255, Math.round(b * 1.15));
		root.style.setProperty('--accent-2', `${r2},${g2},${b2}`);
		// background gradient: mix with white for soft pastel
		const mix = (c)=> Math.round(c + (255 - c) * 0.65);
		root.style.setProperty('--bg1', `${mix(r)},${mix(g)},${mix(b)}`);
		root.style.setProperty('--bg2', `${mix(r)},${mix(g)},${mix(b)}`);
	}

	function sampleImage() {
		try {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const w = 60, h = 40; // small sample
			canvas.width = w; canvas.height = h;
			ctx.drawImage(img, 0, 0, w, h);
			const data = ctx.getImageData(0,0,w,h).data;
			let r=0,g=0,b=0,count=0;
			for(let i=0;i<data.length;i+=4){
				const alpha = data[i+3];
				if(alpha < 125) continue;
				r += data[i]; g += data[i+1]; b += data[i+2]; count++;
			}
			if(count===0) return;
			r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
			applyColors(r,g,b);
		} catch(e){
			// fallback: do nothing
			console.warn('Theme sampling failed', e);
		}
	}

	if (!img.complete) {
		img.addEventListener('load', sampleImage);
	} else sampleImage();
}

window.addEventListener('load', themeFromHeaderImage);

/* Position cards precisely along an SVG heart path on large screens */
function placeCardsAlongHeart(){
	const cards = document.querySelector('.cards');
	if(!cards) return;
	const items = Array.from(cards.querySelectorAll(':scope > div'));
	if(items.length === 0) return;

	if(window.innerWidth < 700){
		// restore flow layout
		const svg = cards.querySelector('svg.heart-path'); if(svg) svg.style.display='none';
		cards.style.height = '';
		items.forEach(it=>{ it.style.position='static'; it.style.left=''; it.style.top=''; it.style.transform=''; });
		return;
	}

	// ensure container sizing
	cards.style.position = 'relative';
	cards.style.height = cards.style.height || '480px';

	// create SVG path if missing
	let svg = cards.querySelector('svg.heart-path');
	if(!svg){
		svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.classList.add('heart-path');
		svg.setAttribute('viewBox','0 0 100 100');
		svg.setAttribute('preserveAspectRatio','none');
		const path = document.createElementNS('http://www.w3.org/2000/svg','path');
		// heart path in 0..100 coords (simple smooth heart)
		path.setAttribute('d','M50 15 C35 0 0 25 25 45 C40 60 50 72 50 72 C50 72 60 60 75 45 C100 25 65 0 50 15 Z');
		svg.appendChild(path);
		cards.appendChild(svg);
	}
	svg.style.display = 'block';

	const path = svg.querySelector('path');
	const L = path.getTotalLength();
	const n = items.length;

	for(let i=0;i<n;i++){
		const t = i / (n - 1); // distribute along path
		const pt = path.getPointAtLength(t * L);
		// coordinates are in 0..100 because of viewBox; map to percent
		const xPct = pt.x; const yPct = pt.y;

		const el = items[i];
		el.style.position = 'absolute';
		el.style.left = xPct + '%';
		el.style.top = yPct + '%';
		// center and add a slight organic rotation
		const rot = (i % 2 === 0) ? -1.2 + (i*0.2) : 1.2 - (i*0.15);
		el.style.transform = `translate(-50%,-50%) rotate(${rot}deg)`;
	}
}

// run on load and on resize (debounced)
window.addEventListener('load', placeCardsAlongHeart);
let _resizeTimer = null;
window.addEventListener('resize', ()=>{ clearTimeout(_resizeTimer); _resizeTimer = setTimeout(placeCardsAlongHeart, 120); });

// Vintage theme functions + toggle
function applyVintageTheme(){
	document.body.classList.add('vintage');
	document.body.classList.remove('silhouette');
	const root = document.documentElement;
	root.style.setProperty('--accent','112,64,28');
	root.style.setProperty('--accent-2','180,120,80');
	root.style.setProperty('--bg1','244,236,221');
	root.style.setProperty('--bg2','230,216,196');
}

function removeVintageTheme(){
	document.body.classList.remove('vintage');
	// restore dynamic sampling
	if(typeof themeFromHeaderImage === 'function') themeFromHeaderImage();
}

function toggleVintage(){
	const btn = document.getElementById('themeToggle');
	if(!btn) return;
	const isOn = document.body.classList.toggle('vintage');
	btn.setAttribute('aria-pressed', isOn);
	btn.textContent = isOn ? 'Vintage On' : 'Vintage';
	if(!isOn) removeVintageTheme();
	else applyVintageTheme();
}

// wire toggle button
document.addEventListener('DOMContentLoaded', ()=>{
	const btn = document.getElementById('themeToggle');
	if(btn) btn.addEventListener('click', toggleVintage);
});

// user asked to try vintage — apply it after load so it overrides sampling
window.addEventListener('load', ()=>{
	applyVintageTheme();
});

