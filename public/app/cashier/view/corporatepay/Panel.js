Ext.define('Cashier.view.corporatepay.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.corporatepay.Grid','Cashier.view.corporatepay.FormSearch'],
    alias:'widget.corporatepaypanel',
    itemId:'CorporatepayPanel',
    gridPanelName:'corporatepaygrid',
    formSearchPanelName:'corporatepayformsearch'
});