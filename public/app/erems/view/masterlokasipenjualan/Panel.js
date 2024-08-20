Ext.define('Erems.view.masterlokasipenjualan.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.masterlokasipenjualan.Grid', 'Erems.view.masterlokasipenjualan.FormSearch'],
    alias: 'widget.masterlokasipenjualanpanel',
    itemId: 'MasterlokasipenjualanPanel',
    gridPanelName: 'masterlokasipenjualangrid',
    formSearchPanelName: 'masterlokasipenjualanformsearch'
});