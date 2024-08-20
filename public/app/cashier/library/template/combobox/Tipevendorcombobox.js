Ext.define('Cashier.library.template.combobox.Tipevendorcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.tipevendorcombobox',
    store: 'Tipevendor', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Vendor Type',
    displayField: 'description', //mengambil data dari store
    valueField: 'type_vendor', //mengambil data dari store  
    typeAhead: true,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


