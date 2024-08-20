Ext.define('Erems.view.backlog.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.backlog.Grid','Erems.view.backlog.FormSearch'],
    alias:'widget.backlogpanel',
    itemId:'BacklogPanel',
    gridPanelName:'backloggrid',
    formSearchPanelName:'backlogformsearch'
});
