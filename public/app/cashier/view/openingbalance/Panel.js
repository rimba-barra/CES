Ext.define('Cashier.view.openingbalance.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.openingbalance.Grid','Cashier.view.openingbalance.FormSearch'],
    alias:'widget.journalpanel',
    itemId:'JournalPanel',
    gridPanelName:'journalgrid',
    formSearchPanelName:'journalformsearch'
});
