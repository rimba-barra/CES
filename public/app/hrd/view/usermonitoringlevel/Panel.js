Ext.define('Hrd.view.usermonitoringlevel.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.usermonitoringlevel.Grid',
        'Hrd.view.usermonitoringlevel.FormSearch'
    ],
    alias: 'widget.usermonitoringlevelpanel',
    itemId: 'UsermonitoringlevelPanel',
    gridPanelName: 'usermonitoringlevelgrid',
    formSearchPanelName: 'usermonitoringlevelformsearch'
});