Ext.define('Cashier.view.bankloan.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.bankloan.Grid','Cashier.view.bankloan.FormSearch'],
    alias:'widget.bankloanpanel',
    itemId:'BankloanPanel',
    gridPanelName:'bankloangrid',
    formSearchPanelName:'bankloanformsearch'
});
