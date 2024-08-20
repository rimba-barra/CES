Ext.define('Hrd.library.template.combobox.Shifttypecombobox', {
    extend: 'Hrd.library.component.Combobox',
    alias: 'widget.shifttypecombobox',
    store: 'Shifttype', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Shift type',
    displayField: 'shifttype', //mengambil data dari store
    valueField: 'shifttype_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})


