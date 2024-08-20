Ext.define('Cashier.view.module.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.module.Grid','Cashier.view.module.FormSearch'],
    alias:'widget.modulepanel',
    itemId:'ModulePanel',
    gridPanelName:'modulegrid',
    formSearchPanelName:'moduleformsearch'
});
