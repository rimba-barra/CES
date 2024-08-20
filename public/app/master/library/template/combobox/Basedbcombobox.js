Ext.define('Master.library.template.combobox.Basedbcombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.basedbcombobox',
    store: 'Fordb', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'For Database',
    displayField: 'dbcore', //mengambil data dari store
    valueField: 'dbcorecode', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


