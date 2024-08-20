Ext.define('Cashier.library.template.combobox.Vouchermakercombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.vouchermakercombobox',
    store: 'Vouchermaker', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Voucher Maker',
    displayField: 'user_email', //mengambil data dari store
    valueField: 'addby', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


