Ext.define('Hrd.template.combobox.Alasanresigncombobox', {
    extend: 'Hrd.template.component.Combobox',
    alias: 'widget.alasanresigncombobox',
    store: 'Alasanresign', //masuk dalam store
    fieldLabel: 'Alasanresign',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'description', //mengambil data dari store
    valueField: 'alasanresign_id', //mengambil data dari store   
    matchFieldWidth: true,
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


