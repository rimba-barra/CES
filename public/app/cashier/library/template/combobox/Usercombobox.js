Ext.define('Cashier.library.template.combobox.Usercombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.usercombobox',
    store: 'User', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'User',
    displayField: 'user_name', //mengambil data dari store
    valueField: 'user_id', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


