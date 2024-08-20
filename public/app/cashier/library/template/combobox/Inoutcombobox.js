Ext.define('Cashier.library.template.combobox.Inoutcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.inoutcombobox',
    store: 'Inout', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'In / Out',
    displayField: 'description', //mengambil data dari store
    valueField: 'in_out', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


