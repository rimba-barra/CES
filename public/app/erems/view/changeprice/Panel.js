Ext.define('Erems.view.changeprice.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.changeprice.Grid','Erems.view.changeprice.FormSearch'],
    alias:'widget.changepricepanel',
    itemId:'ChangepricePanel',
    gridPanelName:'changepricegrid',
    formSearchPanelName:'changepriceformsearch'
});