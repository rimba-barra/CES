Ext.define('Hrd.view.kelompokabsensi.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.kelompokabsensi.Grid',
        'Hrd.view.kelompokabsensi.FormSearch'
    ],
    alias: 'widget.kelompokabsensipanel',
    itemId: 'KelompokabsensiPanel',
    gridPanelName: 'kelompokabsensigrid',
    formSearchPanelName: 'kelompokabsensiformsearch'
});