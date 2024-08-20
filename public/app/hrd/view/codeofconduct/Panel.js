Ext.define('Hrd.view.codeofconduct.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.codeofconduct.Grid',
        'Hrd.view.codeofconduct.FormSearch'
    ],
    alias: 'widget.codeofconductpanel',
    itemId: 'CodeofconductPanel',
    gridPanelName: 'codeofconductgrid',
    formSearchPanelName: 'codeofconductformsearch'
});