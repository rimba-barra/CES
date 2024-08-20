Ext.define('Cashier.view.generatefile.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.generatefile.Grid','Cashier.view.generatefile.FormSearch'],
    alias:'widget.generatefilepanel',
    itemId:'GeneratefilePanel',
    gridPanelName:'generatefilegrid',
    formSearchPanelName:'generatefileformsearch'
});
