Ext.define('Cashier.library.template.combobox.Accounttypecombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.accounttypecombobox',
    store: 'Accounttype', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Account Type',
    displayField: 'account_type', //mengambil data dari store
    valueField: 'account_type_id', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})