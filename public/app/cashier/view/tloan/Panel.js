Ext.define('Cashier.view.tloan.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.tloan.Grid','Cashier.view.tloan.FormSearch'],
    alias:'widget.tloanpanel',
    itemId:'TcashPanel',
    gridPanelName:'tloangrid',
    formSearchPanelName:'tloanformsearch'
});
