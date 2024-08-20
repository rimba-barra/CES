Ext.define('Cashier.library.template.combobox.Kategoriloanscombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.kategoriloanscombobox',
    store: 'Kategoriloans', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Kategori Loans',
    displayField: 'kategori_loans_name', //mengambil data dari store
    valueField: 'kategori_loans_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


