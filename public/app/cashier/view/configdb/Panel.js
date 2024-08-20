Ext.define('Cashier.view.configdb.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.configdb.Grid','Cashier.view.configdb.FormSearch'],
    alias:'widget.configdbpanel',
    itemId:'ConfigdbPanel',
    gridPanelName:'configdbgrid',
    formSearchPanelName:'configdbformsearch'
});
