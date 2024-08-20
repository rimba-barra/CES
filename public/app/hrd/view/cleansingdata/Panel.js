Ext.define('Hrd.view.cleansingdata.Panel', {
    extend: 'Hrd.library.template.view.Panel',
    requires: ['Hrd.view.cleansingdata.Grid', 'Hrd.view.cleansingdata.FormSearch'],
    alias: 'widget.cleansingdatapanel',
    itemId: 'CleansingdataPanel',
    gridPanelName: 'cleansingdatagrid',
    formSearchPanelName: 'cleansingdataformsearch'
});
