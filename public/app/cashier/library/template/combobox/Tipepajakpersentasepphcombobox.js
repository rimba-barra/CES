Ext.define('Cashier.library.template.combobox.Tipepajakpersentasepphcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.tipepajakpersentasepphcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Tipepajakcombopphpersentase', //masuk dalam store
    fieldLabel: 'Persentase',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'persentase', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'persentase', //mengambil data dari store   
    matchFieldWidth: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


