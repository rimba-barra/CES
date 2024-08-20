Ext.define('Cashier.view.setupcashflow.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.setupcashflow.Grid','Cashier.view.setupcashflow.FormSearch'],
    alias:'widget.setupcashflowpanel',
    itemId:'SetupcashflowPanel',
    gridPanelName:'setupcashflowgrid',
    formSearchPanelName:'setupcashflowformsearch'
});
