Ext.define('Erems.view.mastermovereason.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.mastermovereason.Grid', 'Erems.view.mastermovereason.FormSearch'],
    alias: 'widget.mastermovereasonpanel',
    itemId: 'MastermovereasonPanel',
    gridPanelName: 'mastermovereasongrid',
    formSearchPanelName: 'mastermovereasonformsearch'
});