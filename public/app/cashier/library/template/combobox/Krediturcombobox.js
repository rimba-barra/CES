Ext.define('Cashier.library.template.combobox.Krediturcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.krediturcombobox',
    store: 'Kreditur', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Nama Kreditur',
    displayField: 'kreditur_name', //mengambil data dari store
    valueField: 'kreditur_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


