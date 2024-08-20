Ext.define('Master.library.template.combobox.Paymenttypecombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.paymenttypecombobox',
    store: 'Paymenttype', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Payment Type',
    displayField: 'paymenttype', //mengambil data dari store
    valueField: 'paymenttype', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


