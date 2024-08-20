Ext.define('Master.library.template.combobox.Cashbonstatuscombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.cashbonstatuscombobox',
    store: 'Casbonstatus', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Cash/Bon paid',
    displayField: 'cashbon_paid_desc', //mengambil data dari store
    valueField: 'cashbon_paid', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


