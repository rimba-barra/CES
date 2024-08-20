Ext.define('Cashier.library.template.combobox.CurrencycomboboxV2', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.currencyV2combobox',
    store: 'CurrencyV2', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Currency',
    displayField: 'currency_word', //mengambil data dari store
    valueField: 'currency_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


