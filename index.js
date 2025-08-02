import{a as p,S as d,i as l}from"./assets/vendor-5YrzWRhu.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="https://pixabay.com/api/",g="51594808-2f8a269bf80026fef40a32938";async function y(s){const r={key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await p.get(m,{params:r})).data}const a=document.querySelector(".gallery"),h=new d(".gallery a");function b(s){const r=s.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:n,comments:u,downloads:f})=>`
    <li class="gallery-item">
      <a href="${i}">
        <img src="${o}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${n}</p>
        <p><b>Comments:</b> ${u}</p>
        <p><b>Downloads:</b> ${f}</p>
      </div>
    </li>`).join("");a.innerHTML=r,h.refresh()}function L(){a.innerHTML=""}function w(){a.classList.add("loading")}function v(){a.classList.remove("loading")}const c=document.querySelector(".form");document.querySelector(".gallery");c.addEventListener("submit",async s=>{s.preventDefault();const r=c.elements["search-text"].value.trim();if(!r){l.warning({title:"Warning",message:"Please enter a search term",position:"topRight"});return}L(),w();try{const i=(await y(r)).hits;i.length===0?l.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):b(i)}catch(o){console.error(o),l.error({title:"Error",message:"Something went wrong. Try again later.",position:"topRight"})}finally{v(),c.reset()}});
//# sourceMappingURL=index.js.map
