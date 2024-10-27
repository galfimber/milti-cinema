!function(){"use strict";function e(e){const t=document.querySelector(".popup");t.classList.add("popup--open");const i=document.body,s=document.querySelector("html"),l=innerWidth-i.clientWidth;i.classList.add("no-scroll"),s.classList.add("no-scroll"),i.setAttribute("style","padding-right:"+l+"px"),t.innerHTML="";let a="";e.genres.forEach((e=>a+=`${e.name}, `)),a=a.slice(0,-2);let n="";e.countries.forEach((e=>n+=`${e.name}, `)),n=n.slice(0,-2);let c="";if(e.persons.length>0){for(let t=0;t<3;t++)c+=`${e.persons[t].name}, `;c=c.slice(0,-2)}let o="";o='<div class="kinobox_player film__trailer"></div>';let r="";null!=e.movieLength&&(r=`${e.movieLength.toString()} мин.`);let d="";d=null!=e.description&&e.description?e.description:"",t.innerHTML=`\n  <div class="popup__wrapper">\n    <div class="popup__header">\n      <div class="popup__title"><h2 class="title-2">${e.name}</h2></div>\n      <button class="popup__close"><i class="fa-solid fa-xmark"></i></button>\n    </div>\n    <div class="popup__body">\n      <div class="popup__content ">\n        <div class="kinobox_player film__trailer"></div>\n        <div class="film__info">\n          <div class="film__watch"></div>\n          <div class="film__genre">${a}</div>\n          <div class="film__countries">${n}</div>\n          <div class="film__year">${e.year}</div>\n          <div class="film__length">${r}</div>\n          <div class="film__actors">${c}</div>\n          <div class="film__description">${d}</div>\n        </div>\n      </div>\n    </div>\n  </div>`;const m=[],p=[];if("watchability"in e&&e.watchability.items.length>0){for(let t=0;t<e.watchability.items.length;t++)p[t]=e.watchability.items[t].logo.url,m[t]=e.watchability.items[t].url;document.querySelector(".film__watch").innerHTML='\n    <h3 class="title-3">Можно посмотреть</h2>\n    <ul class="film__cinema"></ul>';const t=document.querySelector(".film__cinema");t.innerHTML="";for(let e=0;e<m.length;e++)t.innerHTML+=`<li class="film__cinema--item"><a class="film__link" href="${m[e]}" target="_blank"><img class="film__link--img" src="${p[e]}"></a></li>`}kbox(".kinobox_player",{search:{kinopoisk:e.id}}),window.addEventListener("click",(e=>{const l=e.target;(!l.closest(".popup__wrapper")&&l.closest(".popup")||l.closest(".popup__close"))&&(e.preventDefault(),t.classList.remove("popup--open"),document.body.classList.remove("no-scroll"),i.style.removeProperty("padding-right"),s.classList.remove("no-scroll"),t.innerHTML="")}));const u=777-t.querySelector(".popup__header").offsetHeight;!(717>u)||(t.querySelector(".popup__body").style.maxHeight=`${u}px`)}const t="https://api.kinopoisk.dev/v1.3/movie?page=1&limit=30&selectFields=id&selectFields=countries&selectFields=genres&selectFields=year&selectFields=watchability&selectFields=rating&selectFields=persons&selectFields=movieLength&selectFields=poster&selectFields=description&selectFields=name";async function i(t,i){const s=await fetch(t,{method:"GET",headers:{accept:"application/json","X-API-KEY":"84S4SNX-Y084WMK-K7FV73W-8G8P6MH"}}),l=await s.json();"search"==i?(function(t){const i=document.querySelector(".films");i.innerHTML="";let s=-1;t.docs.forEach((function(e){if(!e.name||!e.genres||0==e.genres.length)return void s++;s++;let t="";null!==JSON.parse(localStorage.getItem("films"))&&JSON.parse(localStorage.getItem("films")).forEach((i=>{i===e.id&&(t="mark__icon--active")}));const l=document.createElement("div");var a;l.classList.add("film"),l.innerHTML=`\n            <button data-id="${s}" class="movie__cover-inner">\n            ${"poster"in e&&"url"in e.poster&&null!==e.poster.url?`<div class="movie__cover"><img src="${e.poster.url||""}" alt="${e.name}" class="movie__cover" style="display:none;">\n        <img src="./../img/preloader.gif" class="movie__cover--preloader"></div>\n        `:`<div class="movie__cover">${e.name}</div>`}\n            <div class="movie__cover--darkened"></div>\n        </button>\n        <div class="movie__info">\n            <div class="movie__title">${e.name}</div>\n            <div class="movie__category">${e.genres.map((e=>` ${e.name}`))}</div>\n            <div class="movie__average movie__average--${a=e.rating.imdb,a>=8?"green":a>=5?"orange":"red"}">${e.rating.imdb}</div>\n            <button data-id="${s}" data-film="${e.id}" class="mark"><i class="fa-solid fa-heart mark__icon ${t}"></i></button>\n        </div>\n            `,i.appendChild(l)})),document.querySelectorAll("div.movie__cover").forEach((e=>{const t=e.querySelector("img.movie__cover"),i=e.querySelector(".movie__cover--preloader");t&&t.addEventListener("load",(function(){i.style.display="none",t.style.display="block"}))}));const l=document.querySelectorAll(".pagination__btn");t.page<4?l.forEach((e=>{switch(e.dataset.num){case"1":e.innerHTML=1;break;case"2":e.innerHTML=2;break;case"3":e.innerHTML=3;break;case"4":e.innerHTML=4;break;case"5":e.innerHTML=5}e.textContent==t.page&&(document.querySelector(".page-active").classList.remove("page-active"),e.classList.add("page-active"))})):l.forEach((e=>{switch(e.dataset.num){case"1":e.innerHTML=1;break;case"2":e.innerHTML=t.page-1;break;case"3":e.innerHTML=t.page;break;case"4":e.innerHTML=t.page+1;break;case"5":e.innerHTML=t.page+2}e.textContent==t.page&&(document.querySelector(".page-active").classList.remove("page-active"),e.classList.add("page-active"))})),function(t){document.querySelectorAll(".movie__cover-inner").forEach((i=>{i.addEventListener("click",(s=>{s.preventDefault(),e(t[i.dataset.id])}))}))}(t.docs)}(l),o(l.docs)):function(t){const i=document.getElementById("popular-img");document.querySelector(".btn"),i.src=t.docs[0].poster.url,function(t){const i=document.querySelector(".popular__show");i.addEventListener("click",(s=>{s.preventDefault(),e(t[i.dataset.id])}))}(t.docs)}(l)}(()=>{let e="";null!==JSON.parse(localStorage.getItem("films"))&&JSON.parse(localStorage.getItem("films")).length>0?(e=`&id=${JSON.parse(localStorage.getItem("films"))[JSON.parse(localStorage.getItem("films")).length-1]}`,i(`${t}${e}`,"popular")):i("https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&lists=popular-series&selectFields=watchability&selectFields=poster","popular")})();const s=document.querySelector(".form"),l=document.querySelector(".form__input"),a=document.querySelector(".search-result");s.addEventListener("submit",(e=>{e.preventDefault();const s=`${t}&name=${l.value}`;l.value&&(a.scrollIntoView(!0),i(s,"search"),l.value="")}));const n=document.querySelector(".btn-search"),c=document.querySelector(".form__submit");n.addEventListener("click",(function(){l.classList.toggle("active"),c.classList.toggle("active"),l.classList.contains("active")?l.focus():l.blur()}));const o=e=>{document.querySelectorAll(".mark").forEach((t=>{t.addEventListener("click",(i=>{i.preventDefault(),function(e,t){const i=[];let s=!0;null!==JSON.parse(localStorage.getItem("films"))&&JSON.parse(localStorage.getItem("films")).forEach((l=>{l!==e.id?i.push(l):(s=!1,t.classList.remove("mark__icon--active"))})),s&&(i.push(e.id),t.classList.add("mark__icon--active")),window.localStorage.setItem("films",JSON.stringify(i))}(e[t.dataset.id],t.querySelector(".mark__icon"))}))}))}}();