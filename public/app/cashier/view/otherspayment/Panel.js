Ext.define('Cashier.view.otherspayment.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.otherspayment.Grid','Cashier.view.otherspayment.FormSearch'],
    alias:'widget.otherspaymentpanel',
    itemId:'OtherspaymentPanel',
    gridPanelName:'otherspaymentgrid',
    formSearchPanelName:'otherspaymentformsearch'
});