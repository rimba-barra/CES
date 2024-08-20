Ext.define('Cashier.view.subaccountgroup.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.subaccountgroup.Grid','Cashier.view.subaccountgroup.FormSearch'],
    alias:'widget.subaccountgrouppanel',
    itemId:'SubaccountgroupPanel',
    gridPanelName:'subaccountgroupgrid',
    formSearchPanelName:'subaccountgroupformsearch'
});
