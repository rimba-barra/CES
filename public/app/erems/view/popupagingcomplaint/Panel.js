Ext.define('Erems.view.popupagingcomplaint.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.popupagingcomplaint.Grid', 'Erems.view.popupagingcomplaint.FormSearch'],
    alias: 'widget.popupagingcomplaintpanel',
    itemId: 'PopupagingcomplaintPanel',
    gridPanelName: 'popupagingcomplaintgrid',
    formSearchPanelName: 'popupagingcomplaintformsearch'
});
