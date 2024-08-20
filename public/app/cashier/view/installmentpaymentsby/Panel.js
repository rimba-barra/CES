Ext.define('Cashier.view.installmentpaymentsby.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.installmentpaymentsby.Grid','Cashier.view.installmentpaymentsby.FormSearch'],
    alias:'widget.installmentpaymentsbypanel',
    itemId:'InstallmentpaymentPanel',
    gridPanelName:'installmentpaymentsbygrid',
    formSearchPanelName:'installmentpaymentsbyformsearch'
});