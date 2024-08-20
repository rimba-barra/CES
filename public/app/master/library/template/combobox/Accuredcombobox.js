Ext.define('Master.library.template.combobox.Accuredcombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.accuredcombobox',
    store: 'Accured', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Accured',
    displayField: 'description', //mengambil data dari store
    valueField: 'chequegiro_accured', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


