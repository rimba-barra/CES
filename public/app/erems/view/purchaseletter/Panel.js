Ext.define('Erems.view.purchaseletter.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.purchaseletter.Grid','Erems.view.purchaseletter.FormSearch'],
    alias:'widget.purchaseletterpanel',
    itemId:'PurchaseletterPanel',
    gridPanelName:'purchaselettergrid',
    formSearchPanelName:'purchaseletterformsearch'
});