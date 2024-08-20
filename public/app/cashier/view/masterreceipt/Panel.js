Ext.define('Cashier.view.masterreceipt.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.masterreceipt.Grid','Cashier.view.masterreceipt.FormSearch'],
    alias:'widget.masterreceiptpanel',
    itemId:'MasterreceiptPanel',
    gridPanelName:'masterreceiptgrid',
    formSearchPanelName:'masterreceiptformsearch'
});