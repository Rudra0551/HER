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
let video = document.getElementById("surpriseVideo");

box.style.display = "flex";
box.style.opacity = "0";
box.style.transition = "1s";

setTimeout(()=>{
box.style.opacity = "1";
video.play();
},100);
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

