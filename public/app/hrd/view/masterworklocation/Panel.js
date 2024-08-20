Ext.define('Hrd.view.masterworklocation.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.masterworklocation.Grid','Hrd.view.masterworklocation.FormSearch'],
    alias:'widget.masterworklocationpanel',
    itemId:'MasterworklocationPanel',
    gridPanelName:'masterworklocationgrid',
    formSearchPanelName:'masterworklocationformsearch'
});