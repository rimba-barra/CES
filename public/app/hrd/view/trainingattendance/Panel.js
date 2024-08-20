Ext.define('Hrd.view.trainingattendance.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.trainingattendance.Grid','Hrd.view.trainingattendance.FormSearch'],
    alias:'widget.trainingattendancepanel',
    itemId:'TrainingattendancePanel',
    gridPanelName:'trainingattendancegrid',
    formSearchPanelName:'trainingattendanceformsearch'
});