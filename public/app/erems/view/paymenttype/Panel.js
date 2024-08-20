Ext.define('Erems.view.paymenttype.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.paymenttype.Grid','Erems.view.paymenttype.FormSearch'],
    alias:'widget.paymenttypepanel',
    itemId:'PaymenttypePanel',
    gridPanelName:'paymenttypegrid',
    formSearchPanelName:'paymenttypeformsearch'
});