Ext.define('Hrd.view.hcreportlog.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.hcreportlog.Grid','Hrd.view.hcreportlog.FormSearch'],
    alias:'widget.hcreportlogpanel',
    itemId:'HcreportlogPanel',
    gridPanelName:'hcreportloggrid',
    formSearchPanelName:'hcreportlogformsearch'
});