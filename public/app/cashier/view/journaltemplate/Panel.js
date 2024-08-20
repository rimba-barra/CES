Ext.define('Cashier.view.journaltemplate.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.journaltemplate.Grid','Cashier.view.journaltemplate.FormSearch'],
    alias:'widget.journaltemplatepanel',
    itemId:'JournaltemplatePanel',
    gridPanelName:'journaltemplategrid',
    formSearchPanelName:'journaltemplateformsearch'
});
