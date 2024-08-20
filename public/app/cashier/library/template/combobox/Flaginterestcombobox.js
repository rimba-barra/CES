Ext.define('Cashier.library.template.combobox.Flaginterestcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.flaginterestcombobox',
    store: 'Flaginterest', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Flag Interest',
    displayField: 'description', //mengambil data dari store
    valueField: 'flag_interest', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


