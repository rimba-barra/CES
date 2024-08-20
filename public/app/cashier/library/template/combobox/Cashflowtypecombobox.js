Ext.define('Cashier.library.template.combobox.Cashflowtypecombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.cashflowtypecombobox',
    store: 'Cashflowtype', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Cashflow Type',
    displayField: 'cashflowtype', //mengambil data dari store
    valueField: 'cashflowtype_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


