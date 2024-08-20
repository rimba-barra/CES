Ext.define('Cashier.view.writeoff.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.writeoff.Grid','Cashier.view.writeoff.FormSearch'],
    alias:'widget.writeoffpanel',
    itemId:'WriteoffPanel',
    gridPanelName:'writeoffgrid',
    formSearchPanelName:'writeoffformsearch'
});