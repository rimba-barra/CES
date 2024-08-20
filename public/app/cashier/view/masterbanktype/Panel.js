Ext.define('Cashier.view.masterbanktype.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires: [ 
        'Cashier.view.masterbanktype.Grid',
        'Cashier.view.masterbanktype.FormSearch'
    ],
    alias:'widget.masterbanktypepanel',
    itemId:'MasterbanktypePanel',
    gridPanelName:'masterbanktypegrid',
    formSearchPanelName:'masterbanktypeformsearch',
});
