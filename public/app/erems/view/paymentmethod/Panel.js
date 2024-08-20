Ext.define('Erems.view.paymentmethod.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.paymentmethod.Grid','Erems.view.paymentmethod.FormSearch'],
    alias:'widget.paymentmethodpanel',
    itemId:'PaymentmethodPanel',
    gridPanelName:'paymentmethodgrid',
    formSearchPanelName:'paymentmethodformsearch'
});