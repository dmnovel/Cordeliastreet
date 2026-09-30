(function(){
  'use strict';
  function send(name,params){
    try{
      if(typeof window.gtag!=='function')return;
      window.gtag('event',name,Object.assign({
        page_title:document.title,
        page_path:location.pathname,
        purchase_surface:location.pathname.indexOf('/event/')!==-1?'event':'master'
      },params||{}));
    }catch(e){}
  }
  function closest(el,sel){return el&&el.closest?el.closest(sel):null}
  document.addEventListener('click',function(e){
    var t=e.target;
    if(closest(t,'#tabPurchaseBtn')){send('purchase_tab_open');return}
    if(closest(t,'.dm-event-purchase-btn,.favorite-action-btn.dm-purchased-replacement,.favorite-toggle.dm-purchased-replacement')){send('purchase_item_open');return}
    if(closest(t,'#dmPurchaseFormSave')){send('purchase_save_click');return}
    if(closest(t,'.dm-record-edit')){send('purchase_edit_click');return}
    if(closest(t,'.dm-record-delete')){send('purchase_delete_click');return}
    if(closest(t,'#dmPurchaseSearchBtn,#dmPurchaseTabSearchBtn')){send('purchase_search');return}
    if(closest(t,'.dm-purchase-search-row button')){send('purchase_add_click');return}
  },true);
  document.addEventListener('change',function(e){
    var t=e.target;
    if(!t)return;
    if(t.id==='excludePurchased'){
      send('purchase_filter_click',{filter_state:t.checked?'on':'off'});
      return;
    }
    if(t.id==='dmPurchaseTabPlatform'){
      send('purchase_platform_filter',{filter_value:t.value||'all'});
      return;
    }
    if(t.id==='dmPurchaseTabSort'){
      send('purchase_sort_click',{sort_value:t.value||'title'});
    }
  },true);
})();
