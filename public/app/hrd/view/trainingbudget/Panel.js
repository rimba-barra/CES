Ext.define('Hrd.view.trainingbudget.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.trainingbudget.Grid','Hrd.view.trainingbudget.FormSearch'],
    alias:'widget.trainingbudgetpanel',
    itemId:'TrainingbudgetPanel',
    gridPanelName:'trainingbudgetgrid',
    formSearchPanelName:'trainingbudgetformsearch'
});