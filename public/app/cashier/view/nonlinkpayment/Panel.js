Ext.define('Cashier.view.nonlinkpayment.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.nonlinkpayment.Grid','Cashier.view.nonlinkpayment.FormSearch'],
    alias:'widget.nonlinkpaymentpanel',
    itemId:'NonlinkpaymentPanel',
    gridPanelName:'nonlinkpaymentgrid',
    formSearchPanelName:'nonlinkpaymentformsearch'
});