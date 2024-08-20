Ext.define('Cashier.view.writeoffapproval.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.writeoffapproval.Grid','Cashier.view.writeoffapproval.FormSearch'],
    alias:'widget.writeoffapprovalpanel',
    itemId:'WriteoffapprovalPanel',
    gridPanelName:'writeoffapprovalgrid',
    formSearchPanelName:'writeoffapprovalformsearch'
});