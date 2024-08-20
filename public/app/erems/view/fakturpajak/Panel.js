Ext.define('Erems.view.fakturpajak.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.fakturpajak.Grid','Erems.view.fakturpajak.FormSearch'],
    alias:'widget.fakturpajakpanel',
    itemId:'FakturpajakPanel',
    gridPanelName:'fakturpajakgrid',
    formSearchPanelName:'fakturpajakformsearch'
});