Ext.define('Hrd.view.groupemployee.Panel', {
    extend: 'Hrd.library.template.view.Panel',
    requires: ['Hrd.view.groupemployee.Grid', 'Hrd.view.groupemployee.FormSearch'],
    alias: 'widget.groupemployeepanel',
    itemId: 'GroupemployeePanel',
    gridPanelName: 'groupemployeegrid',
    formSearchPanelName: 'groupemployeeformsearch'
});
