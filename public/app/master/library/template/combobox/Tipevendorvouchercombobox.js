Ext.define('Master.library.template.combobox.Tipevendorvouchercombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.tipevendorvouchercombobox',
    store: 'Tipevendorvoucher', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Vendor Type',
    displayField: 'description', //mengambil data dari store
    valueField: 'type_vendor', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


