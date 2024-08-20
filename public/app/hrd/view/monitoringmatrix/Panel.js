Ext.define('Hrd.view.monitoringmatrix.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.monitoringmatrix.Grid',
        'Hrd.view.monitoringmatrix.FormSearch'
    ],
    alias: 'widget.monitoringmatrixpanel',
    itemId: 'MonitoringmatrixPanel',
    gridPanelName: 'monitoringmatrixgrid',
    formSearchPanelName: 'monitoringmatrixformsearch'
});