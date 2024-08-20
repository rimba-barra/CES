Ext.define('Cashier.library.template.combobox.Tipepphcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.tipepphcombobox',
    store: 'Tipepphcombo', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Jenis Usaha',
    displayField: 'tipepph', //mengambil data dari store
    valueField: 'tipepph_id', //mengambil data dari store  
    typeAhead: true,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


