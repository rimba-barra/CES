Ext.define('Hrd.view.trainingregistration.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.trainingregistration.Grid','Hrd.view.trainingregistration.FormSearch'],
    alias:'widget.trainingregistrationpanel',
    itemId:'TrainingregistrationPanel',
    gridPanelName:'trainingregistrationgrid',
    formSearchPanelName:'trainingregistrationformsearch'
});