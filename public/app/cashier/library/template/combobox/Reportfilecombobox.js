Ext.define('Cashier.library.template.combobox.Reportfilecombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.reportfilecombobox',
    store: 'Reportfile', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Report File',
    displayField: 'description', //mengambil data dari store
    valueField: 'code', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


