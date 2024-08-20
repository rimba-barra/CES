Ext.define('Cashier.view.tcash.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.tcash.Grid','Cashier.view.tcash.FormSearch'],
    alias:'widget.tcashpanel',
    itemId:'TcashPanel',
    gridPanelName:'tcashgrid',
    formSearchPanelName:'tcashformsearch'
});
