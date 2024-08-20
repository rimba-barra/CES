Ext.define('Cashier.library.template.combobox.Banktypecombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.banktypecombobox',
    store: 'Masterbanktype', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Bank Type',
    displayField: 'banktype', //mengambil data dari store
    valueField: 'banktype_id', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})