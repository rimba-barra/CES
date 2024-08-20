Ext.define('Master.library.template.combobox.Baseappscombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.baseappscombobox',
    store: 'Forapps', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'For Apps',
    displayField: 'apps', //mengambil data dari store
    valueField: 'appscode', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


