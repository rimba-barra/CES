Ext.define('Cashier.library.template.combobox.Bankcombobox2', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.bankcombobox2',
    store: 'Bankvoucherprefixcombobox', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Bank',
    displayField: 'bank_name', //mengambil data dari store
    valueField: 'bank_id', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})