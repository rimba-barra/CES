Ext.define('Cashier.library.template.combobox.Kategoribungacombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.kategoribungacombobox',
    store: 'Kategoribunga', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Kategori Bunga',
    displayField: 'kategori_bunga_name', //mengambil data dari store
    valueField: 'kategori_bunga_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


