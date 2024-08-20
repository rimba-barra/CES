Ext.define('Cashier.view.installmentpayment.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.installmentpayment.Grid','Cashier.view.installmentpayment.FormSearch'],
    alias:'widget.installmentpaymentpanel',
    itemId:'InstallmentpaymentPanel',
    gridPanelName:'installmentpaymentgrid',
    formSearchPanelName:'installmentpaymentformsearch'
});