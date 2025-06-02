/* empty css                      */import{a as y}from"./assets/vendor-CRwelqcB.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const b="50595103-65097a90456797714ffdbb949",E="https://pixabay.com/api/",L=15;async function w(s,e){var i,t;const r=new URLSearchParams({key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:L});try{return(await y.get(`${E}?${r.toString()}`)).data}catch(o){throw console.error("Error fetching images from Pixabay:",o),new Error(((t=(i=o.response)==null?void 0:i.data)==null?void 0:t.message)||o.message||"Failed to fetch images")}}const l=document.getElementById("gallery"),c=document.querySelector(".loader"),d=document.getElementById("load-more-btn");let m;function I(s){if(!l){console.error("Gallery element not found!");return}const e=s.map(r=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${r.largeImageURL}">
        <img
          class="gallery-image"
          src="${r.webformatURL}"
          alt="${r.tags}"
          loading="lazy"
        />
      </a>
      <div class="info">
        <p><b>Likes</b> ${r.likes}</p>
        <p><b>Views</b> ${r.views}</p>
        <p><b>Comments</b> ${r.comments}</p>
        <p><b>Downloads</b> ${r.downloads}</p>
      </div>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",e),m?m.refresh():m=new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250})}function R(){l&&(l.innerHTML="")}function v(){c&&c.classList.remove("is-hidden")}function h(){c&&c.classList.add("is-hidden")}function B(){d&&d.classList.remove("is-hidden")}function n(){d&&d.classList.add("is-hidden")}const u=document.getElementById("search-form"),P=document.getElementById("search-input"),$=document.getElementById("load-more-btn"),S=document.getElementById("gallery");let g="",a=1;const z=15;h();n();u.addEventListener("submit",async s=>{s.preventDefault();const e=P.value.trim();if(!e){iziToast.error({title:"Error",message:"Search query cannot be empty!",position:"topRight",timeout:3e3});return}g=e,a=1,R(),n(),await p(),u.reset()});$.addEventListener("click",async()=>{a++,await p(!0)});async function p(s=!1){v(),s&&n();try{const e=await w(g,a);if(e.hits&&e.hits.length>0){if(I(e.hits),s){const i=S.lastElementChild;if(i){const t=i.getBoundingClientRect();t.height>0&&window.scrollBy({top:t.height*2,behavior:"smooth"})}}(a-1)*z+e.hits.length<e.totalHits?B():(n(),e.totalHits>0&&iziToast.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3}))}else n(),!s&&a===1?iziToast.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3}):e.totalHits>0&&end.iziToast.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3})}catch(e){console.error("Search or load more failed:",e),iziToast.error({title:"Error",message:`Failed to fetch images: ${e.message||"Unknown error"}. Please try again later.`,position:"topRight",timeout:5e3}),n()}finally{h()}}
//# sourceMappingURL=index.js.map
