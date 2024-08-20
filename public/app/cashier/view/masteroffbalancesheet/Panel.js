Ext.define('Cashier.view.masteroffbalancesheet.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires: [ 
        'Cashier.view.masteroffbalancesheet.Grid',
        'Cashier.view.masteroffbalancesheet.FormSearch'
    ],
    alias:'widget.masteroffbalancesheetpanel',
    itemId:'MasteroffbalancesheetPanel',
    gridPanelName:'masteroffbalancesheetgrid',
    formSearchPanelName:'masteroffbalancesheetformsearch',
});
