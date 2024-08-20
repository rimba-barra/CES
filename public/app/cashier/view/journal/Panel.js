Ext.define('Cashier.view.journal.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.journal.Grid','Cashier.view.journal.FormSearch'],
    alias:'widget.journalpanel',
    itemId:'JournalPanel',
    gridPanelName:'journalgrid',
    formSearchPanelName:'journalformsearch'
});
