Ext.define('Gl.view.subaccountgroup.Panel',{
    extend:'Gl.library.template.view.Panel',
    requires:['Gl.view.subaccountgroup.Grid','Gl.view.subaccountgroup.FormSearch'],
    alias:'widget.subaccountgrouppanel',
    itemId:'SubaccountgroupPanel',
    gridPanelName:'subaccountgroupgrid',
    formSearchPanelName:'subaccountgroupformsearch'
});
