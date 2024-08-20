Ext.define('Cashier.view.voucher.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.voucher.Grid','Cashier.view.voucher.FormSearch'],
    alias:'widget.voucherpanel',
    itemId:'VoucherPanel',
    gridPanelName:'vouchergrid',
    formSearchPanelName:'voucherformsearch'
});
