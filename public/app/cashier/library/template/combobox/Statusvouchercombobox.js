Ext.define('Cashier.library.template.combobox.Statusvouchercombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.statusvouchercombobox',
    store: 'Statusvoucher', //masuk dalam store
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Status',
    displayField: 'description', //mengambil data dari store
    valueField: 'status', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


