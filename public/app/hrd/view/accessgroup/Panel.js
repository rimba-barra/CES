Ext.define('Hrd.view.accessgroup.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.accessgroup.Grid',
        'Hrd.view.accessgroup.FormSearch'
    ],
    alias: 'widget.accessgrouppanel',
    itemId: 'AccessgroupPanel',
    gridPanelName: 'accessgroupgrid',
    formSearchPanelName: 'accessgroupformsearch'
});