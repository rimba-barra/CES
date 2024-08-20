Ext.define('Hrd.view.leavegiving.Panel', {
    requires: ['Hrd.view.leavegiving.Grid', 'Hrd.view.leavegiving.FormSearch','Hrd.view.leavegiving.FormData'],
    alias: 'widget.leavegivingpanel',
    itemId: 'LeavegivingPanel',
    gridPanelName: 'leavegivinggrid',
    formSearchPanelName: 'leavegivingformsearch',
    extend: 'Hrd.library.box.view.directviewinput.Panel',
    formDataName: 'leavegivingformdata',
    formDataWidth: '100%',
    fsCollapsed: false

});