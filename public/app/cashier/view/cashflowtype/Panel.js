Ext.define('Cashier.view.cashflowtype.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.cashflowtype.Grid','Cashier.view.cashflowtype.FormSearch'],
    alias:'widget.cashflowtypepanel',
    itemId:'CashflowtypePanel',
    gridPanelName:'cashflowtypegrid',
    formSearchPanelName:'cashflowtypeformsearch'
});
