Ext.define('Cashier.library.template.combobox.Benchmarkingcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.benchmarkingcombobox',
    store: 'Benchmarking', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: '',
    displayField: 'benchmarking_name', //mengambil data dari store
    valueField: 'benchmarking_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


