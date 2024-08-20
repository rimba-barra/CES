Ext.define('Cashier.view.documentnumbering.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.documentnumbering.Grid','Cashier.view.documentnumbering.FormSearch'],
    alias:'widget.documentnumberingpanel',
    itemId:'DocumentnumberingPanel',
    gridPanelName:'documentnumberinggrid',
    formSearchPanelName:'documentnumberingformsearch'
});
