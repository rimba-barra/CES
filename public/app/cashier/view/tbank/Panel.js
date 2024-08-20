Ext.define('Cashier.view.tbank.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.tbank.Grid','Cashier.view.tbank.FormSearch'],
    alias:'widget.tbankpanel',
    itemId:'TbankPanel',
    gridPanelName:'tbankgrid',
    formSearchPanelName:'tbankformsearch'
});
