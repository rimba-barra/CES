Ext.define('Erems.view.mastercontractor.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.mastercontractor.Grid','Erems.view.mastercontractor.FormSearch'],
    alias:'widget.mastercontractorpanel',
    itemId:'MastercontractorPanel',
    gridPanelName:'mastercontractorgrid',
    formSearchPanelName:'mastercontractorformsearch'
});