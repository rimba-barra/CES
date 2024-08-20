Ext.define('Cashier.view.kartupiutang.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.kartupiutang.Grid','Cashier.view.kartupiutang.FormSearch'],
    alias:'widget.kartupiutangpanel',
    itemId:'KartupiutangPanel',
    gridPanelName:'kartupiutanggrid',
    formSearchPanelName:'kartupiutangformsearch'
});