Ext.define('Cashier.view.grouptransaction.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.grouptransaction.Grid','Cashier.view.grouptransaction.FormSearch'],
    alias:'widget.grouptransactionpanel',
    itemId:'GrouptransactionPanel',
    gridPanelName:'grouptransactiongrid',
    formSearchPanelName:'grouptransactionformsearch'
});
