Ext.define('Master.library.template.combobox.Jenisusahacombobox', {
    extend: 'Master.library.component.Combobox', 
    alias: 'widget.jenisusahacombobox',
    store: 'Jenisusahacombo', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Jenis Usaha',
    displayField: 'jenisusaha', //mengambil data dari store
    valueField: 'jenisusaha_id', //mengambil data dari store  
    typeAhead: true,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


