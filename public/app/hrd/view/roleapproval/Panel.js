Ext.define('Hrd.view.roleapproval.Panel', {
    extend: 'Hrd.library.template.view.Panel',
    requires: ['Hrd.view.roleapproval.Grid', 'Hrd.view.roleapproval.FormSearch'],
    alias: 'widget.roleapprovalpanel',
    itemId: 'RoleapprovalPanel',
    gridPanelName: 'roleapprovalgrid',
    formSearchPanelName: 'roleapprovalformsearch'
});
