Ext.define('Hrd.view.masterdiscapproval.Panel', {
    extend: 'Hrd.library.template.view.Panel',
    requires: ['Hrd.view.masterdiscapproval.Grid', 'Hrd.view.masterdiscapproval.FormSearch'],
    alias: 'widget.masterdiscapprovalpanel',
    itemId: 'MasterdiscapprovalPanel',
    gridPanelName: 'masterdiscapprovalgrid',
    formSearchPanelName: 'masterdiscapprovalformsearch'
});
