Ext.define('Cashier.view.subeditor.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires: [ 
        'Cashier.view.subeditor.Grid',
        'Cashier.view.subeditor.FormSearch'
    ],
    alias:'widget.subeditorpanel',
    itemId:'SubeditorPanel',
    gridPanelName:'subeditorgrid',
    formSearchPanelName:'subeditorformsearch',
});
