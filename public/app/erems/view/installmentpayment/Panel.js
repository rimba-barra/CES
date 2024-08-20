Ext.define('Erems.view.installmentpayment.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.installmentpayment.Grid','Erems.view.installmentpayment.FormSearch'],
    alias:'widget.installmentpaymentpanel',
    itemId:'InstallmentpaymentPanel',
    gridPanelName:'installmentpaymentgrid',
    formSearchPanelName:'installmentpaymentformsearch'
});