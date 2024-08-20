Ext.define('Hrd.view.accessgroupdetail.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.accessgroupdetail.Grid',
        'Hrd.view.accessgroupdetail.FormSearch'
    ],
    alias: 'widget.accessgroupdetailpanel',
    itemId: 'AccessgroupdetailPanel',
    gridPanelName: 'accessgroupdetailgrid',
    formSearchPanelName: 'accessgroupdetailformsearch'
});