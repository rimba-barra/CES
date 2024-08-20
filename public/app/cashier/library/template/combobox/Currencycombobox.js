Ext.define('Cashier.library.template.combobox.Currencycombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.currencycombobox',
    store: 'Currency', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Currency',
    displayField: 'currency_word', //mengambil data dari store
    valueField: 'currency_word', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


