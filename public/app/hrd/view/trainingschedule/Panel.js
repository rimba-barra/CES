Ext.define('Hrd.view.trainingschedule.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.trainingschedule.Grid','Hrd.view.trainingschedule.FormSearch'],
    alias:'widget.trainingschedulepanel',
    itemId:'TrainingschedulePanel',
    gridPanelName:'trainingschedulegrid',
    formSearchPanelName:'trainingscheduleformsearch'
});