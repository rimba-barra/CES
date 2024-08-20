Ext.define('Cashier.library.template.combobox.Jenispinjamancombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.jenispinjamancombobox',
    store: 'Jenispinjaman', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Jenis Pinjaman',
    displayField: 'jenis_pinjaman_name', //mengambil data dari store
    valueField: 'jenis_pinjaman_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


