Ext.define('Erems.view.expenserequest.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.expenserequest.Grid','Erems.view.expenserequest.FormSearch'],
    alias:'widget.expenserequestpanel',
    itemId:'ExpenserequestPanel',
    gridPanelName:'expenserequestgrid',
    formSearchPanelName:'expenserequestformsearch'
});