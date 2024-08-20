Ext.define('Master.view.masterproject.Panel',{
    extend:'Master.library.template.view.Panel',
    requires:['Master.view.masterproject.Grid','Master.view.masterproject.FormSearch'],
    alias:'widget.masterprojectpanel',
    itemId:'masterprojectPanel',
    gridPanelName:'masterprojectgrid',
    formSearchPanelName:'masterprojectformsearch'
});
