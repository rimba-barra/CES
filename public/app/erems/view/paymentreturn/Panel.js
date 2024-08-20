Ext.define('Erems.view.paymentreturn.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.paymentreturn.Grid','Erems.view.paymentreturn.FormSearch'],
    alias:'widget.paymentreturnpanel',
    itemId:'PaymentreturnPanel',
    gridPanelName:'paymentreturngrid',
    formSearchPanelName:'paymentreturnformsearch'
});