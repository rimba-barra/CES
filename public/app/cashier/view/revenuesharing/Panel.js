Ext.define('Cashier.view.revenuesharing.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.revenuesharing.Grid','Cashier.view.revenuesharing.FormSearch'],
    alias:'widget.revenuesharingpanel',
    itemId:'RevenuesharingPanel',
    gridPanelName:'revenuesharinggrid',
    formSearchPanelName:'revenuesharingformsearch'
});