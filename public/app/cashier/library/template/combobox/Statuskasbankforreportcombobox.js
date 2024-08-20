Ext.define('Cashier.library.template.combobox.Statuskasbankforreportcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.statuskasbankforreportcombobox',
    store: 'Statuskasbankforreport', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Status Transaction',
    displayField: 'description', //mengambil data dari store
    valueField: 'statusdata', //mengambil data dari store 
    typeAhead: true,
    matchFieldWidth: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


