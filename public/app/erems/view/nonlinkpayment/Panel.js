Ext.define('Erems.view.nonlinkpayment.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.nonlinkpayment.Grid','Erems.view.nonlinkpayment.FormSearch'],
    alias:'widget.nonlinkpaymentpanel',
    itemId:'NonlinkpaymentPanel',
    gridPanelName:'nonlinkpaymentgrid',
    formSearchPanelName:'nonlinkpaymentformsearch'
});