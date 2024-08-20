Ext.define('Cashier.view.cashfloweditor.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires: [ 
        'Cashier.view.cashfloweditor.Grid',
        'Cashier.view.cashfloweditor.FormSearch'
    ],
    alias:'widget.cashfloweditorpanel',
    itemId:'CashfloweditorPanel',
    gridPanelName:'cashfloweditorgrid',
    formSearchPanelName:'cashfloweditorformsearch',
});
