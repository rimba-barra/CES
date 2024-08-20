Ext.define('Cashier.library.template.combobox.Cashflowcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.cashflowcombobox',
    store: 'Cashflow', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Cashflow',
    displayField: 'cashflowtype', //mengambil data dari store
    valueField: 'setupcashflow_id', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


