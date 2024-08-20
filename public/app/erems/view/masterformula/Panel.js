Ext.define('Erems.view.masterformula.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.masterformula.Grid', 'Erems.view.masterformula.FormSearch'],
    alias: 'widget.masterformulapanel',
    itemId: 'MasterformulaPanel',
    gridPanelName: 'masterformulagrid',
    formSearchPanelName: 'masterformulaformsearch'
});