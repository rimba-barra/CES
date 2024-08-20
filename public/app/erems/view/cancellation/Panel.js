Ext.define('Erems.view.cancellation.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.cancellation.Grid','Erems.view.cancellation.FormSearch'],
    alias:'widget.cancellationpanel',
    itemId:'CancellationPanel',
    gridPanelName:'cancellationgrid',
    formSearchPanelName:'cancellationformsearch'
});