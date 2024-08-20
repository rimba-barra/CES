Ext.define('Cashier.view.subvouchersetup.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.subvouchersetup.Grid','Cashier.view.subvouchersetup.FormSearch'],
    alias:'widget.subvouchersetuppanel',
    itemId:'SubvouchersetupPanel',
    gridPanelName:'subvouchersetupgrid',
    formSearchPanelName:'subvouchersetupformsearch'
});
