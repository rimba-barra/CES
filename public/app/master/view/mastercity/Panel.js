Ext.define('Master.view.mastercity.Panel',{
    extend:'Master.library.template.view.Panel',
    requires:['Master.view.mastercity.Grid','Master.view.mastercity.FormSearch'],
    alias:'widget.mastercitypanel',
    itemId:'mastercityPanel',
    gridPanelName:'mastercitygrid',
    formSearchPanelName:'mastercityformsearch'
});
