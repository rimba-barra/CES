Ext.define('Cashier.library.template.combobox.Tipepajakpphcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.tipepajakpphcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Tipepajakcombopph', //masuk dalam store
    fieldLabel: 'Tipepajak',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'tipepajakdetail', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'tipepajakdetail_id', //mengambil data dari store   
    matchFieldWidth: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


