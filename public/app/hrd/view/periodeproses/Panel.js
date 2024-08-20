Ext.define('Hrd.view.periodeproses.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.periodeproses.Grid','Hrd.view.periodeproses.FormSearch'],
    alias:'widget.periodeprosespanel',
    itemId:'PeriodeprosesPanel',
    gridPanelName:'periodeprosesgrid',
    formSearchPanelName:'periodeprosesformsearch'
});