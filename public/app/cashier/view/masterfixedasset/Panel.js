Ext.define('Cashier.view.masterfixedasset.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires: [ 
        'Cashier.view.masterfixedasset.Grid',
        'Cashier.view.masterfixedasset.FormSearch'
    ],
    alias:'widget.masterfixedassetpanel',
    itemId:'MasterfixedassetPanel',
    gridPanelName:'masterfixedassetgrid',
    formSearchPanelName:'masterfixedassetformsearch',
});
