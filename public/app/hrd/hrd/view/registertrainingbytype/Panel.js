Ext.define('Hrd.view.registertrainingbytype.Panel', {
    extend: 'Hrd.library.box.view.directviewinput.Panel',
    requires: ['Hrd.view.registertrainingbytype.Grid', 'Hrd.view.registertrainingbytype.FormSearch', 'Hrd.view.registertrainingbytype.FormData'],
    alias: 'widget.registertrainingbytypepanel',
    itemId: 'RegistertrainingbytypePanel',
    gridPanelName: 'registertrainingbytypegrid',
    formSearchPanelName: 'registertrainingbytypeformsearch',
    formDataName: 'registertrainingbytypeformdata',
    formDataWidth: '100%',
    fsCollapsed: false,
    
});