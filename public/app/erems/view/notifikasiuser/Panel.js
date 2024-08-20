Ext.define('Erems.view.notifikasiuser.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.notifikasiuser.Grid', 'Erems.view.notifikasiuser.FormSearch'],
    alias: 'widget.notifikasiuserpanel',
    itemId: 'NotifikasiuserPanel',
    gridPanelName: 'notifikasiusergrid',
    formSearchPanelName: 'notifikasiuserformsearch'
});