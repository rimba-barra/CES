Ext.define('Hrd.view.lookup.sanksiketerlambatanview.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.lookup.sanksiketerlambatanview.Grid','Hrd.view.lookup.sanksiketerlambatanview.FormSearch'],
    alias:'widget.lookupsanksiketerlambatanviewpanel',
    itemId:'LookupsanksiketerlambatanviewPanel',
    height:500,
    gridPanelName:'lookupsanksiketerlambatanviewgrid',
    formSearchPanelName:'lookupsanksiketerlambatanviewformsearch'
});