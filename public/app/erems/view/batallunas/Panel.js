Ext.define('Erems.view.batallunas.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.batallunas.Grid','Erems.view.batallunas.FormSearch'],
    alias:'widget.batallunaspanel',
    itemId:'BatallunasPanel',
    gridPanelName:'batallunasgrid',
    formSearchPanelName:'batallunasformsearch'
});