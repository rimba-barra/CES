Ext.define('Hrd.view.accesslevel.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.accesslevel.Grid',
        'Hrd.view.accesslevel.FormSearch'
    ],
    alias: 'widget.accesslevelpanel',
    itemId: 'AccesslevelPanel',
    gridPanelName: 'accesslevelgrid',
    formSearchPanelName: 'accesslevelformsearch'
});