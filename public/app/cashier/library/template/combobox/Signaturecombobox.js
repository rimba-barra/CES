Ext.define('Cashier.library.template.combobox.Signaturecombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.signaturecombobox',
    store: 'Signature', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Signature',
    displayField: 'signature_name', //mengambil data dari store
    valueField: 'signature_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


