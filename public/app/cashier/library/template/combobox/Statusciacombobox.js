Ext.define('Cashier.library.template.combobox.Statusciacombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.statusciacombobox',
    store: 'Statuscia', //masuk dalam store
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Statusdata',
    displayField: 'description', //mengambil data dari store
    valueField: 'statusdata', //mengambil data dari store 
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


