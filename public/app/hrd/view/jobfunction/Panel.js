Ext.define('Hrd.view.jobfunction.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.jobfunction.Grid','Hrd.view.jobfunction.FormSearch'],
    alias:'widget.jobfunctionpanel',
    itemId:'JobfunctionPanel',
    gridPanelName:'jobfunctiongrid',
    formSearchPanelName:'jobfunctionformsearch'
});