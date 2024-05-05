!function(){"use strict";async function e(e,i){const t=await fetch(e,{method:"GET",headers:{accept:"application/json","X-API-KEY":"84S4SNX-Y084WMK-K7FV73W-8G8P6MH"}}),s=await t.json();"search"==i?function(e){const i=document.querySelector(".films");i.innerHTML="";let t=-1;e.docs.forEach((function(e){if(null==e.poster||null==e.poster.url||null==e.name||0==e.genres.length||!e.genres)return void t++;t++;let s="";JSON.parse(localStorage.getItem("films")).forEach((i=>{i===e.id&&(s="mark__icon--active")}));const n=document.createElement("div");var a;n.classList.add("film"),n.innerHTML=`\n            <button data-id="${t}" class="movie__cover-inner">\n            <img src="${e.poster.url}" alt="${e.name}" class="movie__cover">\n            <div class="movie__cover--darkened"></div>\n        </button>\n        <div class="movie__info">\n            <div class="movie__title">${e.name}</div>\n            <div class="movie__category">${e.genres.map((e=>` ${e.name}`))}</div>\n            <a class="movie__link" href="https://www.kinopoisk.vip/film/${e.id}/" target='_blank'>Смотреть бесплатно</a>\n            <div class="movie__average movie__average--${a=e.rating.imdb,a>=8?"green":a>=5?"orange":"red"}">${e.rating.imdb}</div>\n            <button data-id="${t}" data-film="${e.id}" class="mark"><i class="fa-solid fa-heart mark__icon ${s}"></i></button>\n        </div>\n            `,i.appendChild(n)}));const s=document.querySelectorAll(".pagination__btn");e.page<4?s.forEach((i=>{switch(i.dataset.num){case"1":i.innerHTML=1;break;case"2":i.innerHTML=2;break;case"3":i.innerHTML=3;break;case"4":i.innerHTML=4;break;case"5":i.innerHTML=5}i.textContent==e.page&&(document.querySelector(".page-active").classList.remove("page-active"),i.classList.add("page-active"))})):s.forEach((i=>{switch(i.dataset.num){case"1":i.innerHTML=1;break;case"2":i.innerHTML=e.page-1;break;case"3":i.innerHTML=e.page;break;case"4":i.innerHTML=e.page+1;break;case"5":i.innerHTML=e.page+2}i.textContent==e.page&&(document.querySelector(".page-active").classList.remove("page-active"),i.classList.add("page-active"))})),function(e){document.querySelectorAll(".movie__cover-inner").forEach((i=>{i.addEventListener("click",(t=>{t.preventDefault(),function(e){const i=document.querySelector(".popup");i.classList.add("popup--open");const t=document.body,s=innerWidth-t.clientWidth;t.classList.add("no-scroll"),t.setAttribute("style","padding-right:"+s+"px"),i.innerHTML="";let n="";e.genres.forEach((e=>n+=`${e.name}, `)),n=n.slice(0,-2);let a="";e.countries.forEach((e=>a+=`${e.name}, `)),a=a.slice(0,-2);let l="";if(e.persons.length>0){for(let i=0;i<3;i++)l+=`${e.persons[i].name}, `;l=l.slice(0,-2)}let c="";c='<div class="kinobox_player film__trailer"></div>';let o="";null!=e.movieLength&&(o=`${e.movieLength.toString()} мин.`);let r="";r=null!=e.description&&e.description?e.description:"",i.innerHTML=`\n  <div class="popup__wrapper">\n    <div class="popup__header">\n      <div class="popup__title"><h2 class="title-2">${e.name}</h2></div>\n      <button class="popup__close"><i class="fa-solid fa-xmark"></i></button>\n    </div>\n    <div class="popup__body">\n      <div class="popup__content ">\n        <div class="kinobox_player film__trailer"></div>\n        <div class="film__info">\n          <div class="film__watch"></div>\n          <div class="film__genre">${n}</div>\n          <div class="film__countries">${a}</div>\n          <div class="film__year">${e.year}</div>\n          <div class="film__length">${o}</div>\n          <div class="film__actors">${l}</div>\n          <div class="film__description">${r}</div>\n        </div>\n      </div>\n    </div>\n  </div>`;const d=[],p=[];if(e.watchability.items.length>0&&null!=e.watchability.items){for(let i=0;i<e.watchability.items.length;i++)p[i]=e.watchability.items[i].logo.url,d[i]=e.watchability.items[i].url;document.querySelector(".film__watch").innerHTML='\n    <h3 class="title-3">Можно посмотреть</h2>\n    <ul class="film__cinema"></ul>';const i=document.querySelector(".film__cinema");i.innerHTML="";for(let e=0;e<d.length;e++)i.innerHTML+=`<li class="film__cinema--item"><a class="film__link" href="${d[e]}" target="_blank"><img class="film__link--img" src="${p[e]}"></a></li>`}kbox(".kinobox_player",{search:{kinopoisk:e.id}}),window.addEventListener("click",(e=>{const s=e.target;(!s.closest(".popup__wrapper")&&s.closest(".popup")||s.closest(".popup__close"))&&(e.preventDefault(),i.classList.remove("popup--open"),document.body.classList.remove("no-scroll"),t.style.removeProperty("padding-right"),i.innerHTML="")}))}(e[i.dataset.id])}))}))}(e.docs)}(s):function(e){const i=document.getElementById("popular-img"),t=document.getElementById("popular-link"),s=Math.floor(10*Math.random()+0);i.src=e.docs[s].poster.url,e.docs[s].watchability.items.length>0&&(t.href=e.docs[s].watchability.items[0].url)}(s)}e("https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&lists=popular-series&selectFields=watchability&selectFields=poster","popular");const i=document.querySelector(".form"),t=document.querySelector(".form__input"),s=document.querySelector(".search-result");i.addEventListener("submit",(i=>{i.preventDefault();const n=`https://api.kinopoisk.dev/v1.3/movie?page=1&limit=30&selectFields=id&selectFields=countries&selectFields=genres&selectFields=year&selectFields=watchability&selectFields=rating&selectFields=persons&selectFields=movieLength&selectFields=poster&selectFields=description&selectFields=videos&selectFields=name&name=${t.value}`;t.value&&(s.scrollIntoView(!0),e(n,"search"),t.value="")}));const n=document.querySelector(".btn-search"),a=document.querySelector(".form__submit");n.addEventListener("click",(function(){t.classList.toggle("active"),a.classList.toggle("active"),t.classList.contains("active")?t.focus():t.blur()}))}();