Ext.define('Erems.view.kartupiutang.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.kartupiutang.Grid','Erems.view.kartupiutang.FormSearch'],
    alias:'widget.kartupiutangpanel',
    itemId:'KartupiutangPanel',
    gridPanelName:'kartupiutanggrid',
    formSearchPanelName:'kartupiutangformsearch'
});