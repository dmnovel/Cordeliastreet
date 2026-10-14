(function(){
'use strict';
function send(name,extras){try { if(typeof window.gtag==='function')window.gtag('event',name,Object.assign({page_title:document.title},extras||{})); } catch(e){} }
var pathname=location.pathname;
var area=/\/game(?:\/|$)/.test(pathname)?'game':/\/event(?:\/|$)/.test(pathname)?'event':'master';
function nearest(target,selector){return target&&target.closest?target.closest(selector):null;}
document.addEventListener('click',function(ev){
var el=nearest(ev.target,'button,a,[role="button"]');if(!el)return;
var id=el.id||'', label=(el.getAttribute('aria-label')||el.textContent||'').trim().slice(0,100);
var event=null;
if(id==='searchBtn')event='search_used';
else if(id==='mobileMenuBtn')event='hamburger_open';
else if(id==='pcThemeBtn'||id==='mobileThemeBtn')event='dark_mode_click';
else if(id==='eventAlertBtn')event='alert_open';
else if(id==='pointbackTopBtn')event='pointback_click';
else if(id==='dateIndexBtn')event='date_open';
else if(id==='pcRecentViewedBtn'||el.hasAttribute('data-open-recent-viewed'))event='recent_viewed_open';
else if(id==='tasteTopBtn')event='wish_open';
else if(el.matches('[data-game]'))event='game_select';
else if(el.matches('.ridi-top-btn'))return; // already emitted by existing event-page handler
if(!event&&area==='game'){
 if(/mix|random|랜덤/i.test(id+' '+label))event='game_random_click';
 else if(/easy|normal|hard|이지|노멀|하드/i.test(id+' '+label))event='game_difficulty_click';
}
if(!event&&el.tagName==='A'){
 var href=el.getAttribute('href')||'';
 if(/\/event\//.test(href))event='event_open';
 else if(/\/game\//.test(href))event='game_open';
 else if(/ridi\.com/.test(href))event='ridi_click';
}
if(event)send(event,{page_section:area,element_id:id||undefined,element_text:label||undefined});
},true);
})();
