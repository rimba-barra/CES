Ext.define('Cashier.library.template.combobox.Mastertipepajakcombo', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.mastertipepajakcombo',
    store: 'Mastertipepajak', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Tipe Pajak',
    displayField: 'tipepajakdetail', //mengambil data dari store
    valueField: 'tipepajakdetail_id', //mengambil data dari store  
    typeAhead: false,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})