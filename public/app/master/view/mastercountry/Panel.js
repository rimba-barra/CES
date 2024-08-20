Ext.define('Master.view.mastercountry.Panel',{
    extend:'Master.library.template.view.Panel',
    requires:['Master.view.mastercountry.Grid','Master.view.mastercountry.FormSearch'],
    alias:'widget.mastercountrypanel',
    itemId:'mastercountryPanel',
    gridPanelName:'mastercountrygrid',
    formSearchPanelName:'mastercountryformsearch'
});