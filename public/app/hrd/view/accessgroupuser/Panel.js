Ext.define('Hrd.view.accessgroupuser.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.accessgroupuser.Grid',
        'Hrd.view.accessgroupuser.FormSearch'
    ],
    alias: 'widget.accessgroupuserpanel',
    itemId: 'AccessgroupuserPanel',
    gridPanelName: 'accessgroupusergrid',
    formSearchPanelName: 'accessgroupuserformsearch'
});