Ext.define('Hrd.view.organizationchart.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.organizationchart.Grid',
        'Hrd.view.organizationchart.FormSearch'
    ],
    alias: 'widget.organizationchartpanel',
    itemId: 'OrganizationchartPanel',
    gridPanelName: 'organizationchartgrid',
    formSearchPanelName: 'organizationchartformsearch'
});