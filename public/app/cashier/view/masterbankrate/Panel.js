Ext.define('Cashier.view.masterbankrate.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires: [ 
        'Cashier.view.masterbankrate.Grid',
        'Cashier.view.masterbankrate.FormSearch'
    ],
    alias:'widget.masterbankratepanel',
    itemId:'MasterbankratePanel',
    gridPanelName:'masterbankrategrid',
    formSearchPanelName:'masterbankrateformsearch',
});
