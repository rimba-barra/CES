Ext.define('Cashier.view.tcashadvance.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.tcashadvance.Grid','Cashier.view.tcashadvance.FormSearch'],
    alias:'widget.tcashadvancepanel',
    itemId:'TcashadvancePanel',
    gridPanelName:'tcashadvancegrid',
    formSearchPanelName:'tcashadvanceformsearch'
});
