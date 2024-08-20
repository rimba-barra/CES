Ext.define('Cashier.library.template.combobox.Paymentviacombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.paymentviacombobox',
    store: 'Paymentvia', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Payment Via',
    displayField: 'payment_via_name', //mengambil data dari store
    valueField: 'payment_via_id', //mengambil data dari store  
    typeAhead: true,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


