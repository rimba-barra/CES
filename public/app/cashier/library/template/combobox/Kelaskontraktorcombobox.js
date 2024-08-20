Ext.define('Cashier.library.template.combobox.Kelaskontraktorcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.kelaskontraktorcombobox',
    store: 'Kelaskontraktorcombobox', //masuk dalam store
    dynamicdata: 1, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Kelas Kontraktor',
    displayField: 'description', //mengambil data dari store
    valueField: 'kelaskontraktor_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})