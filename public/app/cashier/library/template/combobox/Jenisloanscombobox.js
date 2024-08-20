Ext.define('Cashier.library.template.combobox.Jenisloanscombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.jenisloanscombobox',
    store: 'Jenisloans', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Jenis Loans',
    displayField: 'loans_name', //mengambil data dari store
    valueField: 'jenis_loans_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


