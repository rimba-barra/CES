Ext.define('Cashier.library.template.combobox.Automailmodulecombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.automailmodulecombobox',
    store: 'Automailmodule', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Module',
    displayField: 'description', //mengambil data dari store
    valueField: 'module_code', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


