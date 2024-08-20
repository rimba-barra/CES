Ext.define('Hrd.view.packagemanagement.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.packagemanagement.Grid',
        'Hrd.view.packagemanagement.FormSearch'
    ],
    alias: 'widget.packagemanagementpanel',
    itemId: 'PackagemanagementPanel',
    gridPanelName: 'packagemanagementgrid',
    formSearchPanelName: 'packagemanagementformsearch'
});