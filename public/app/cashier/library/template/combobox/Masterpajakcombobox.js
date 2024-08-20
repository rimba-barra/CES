Ext.define('Cashier.library.template.combobox.Masterpajakcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.masterpajakcombobox',
    store: 'Masterpajak', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Pajak',
    displayField: 'tipepajak', //mengambil data dari store
    valueField: 'tipepajak_id', //mengambil data dari store  
    typeAhead: false,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})