Ext.define('Cashier.library.template.combobox.Paymentmethodcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.paymentmethodcombobox',
    store: 'Paymentmethod', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Payment Method',
    displayField: 'paymentmethod', //mengambil data dari store
    valueField: 'paymentmethod_id', //mengambil data dari store  
    typeAhead: true,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


