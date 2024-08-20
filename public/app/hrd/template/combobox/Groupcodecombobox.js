Ext.define('Hrd.template.combobox.Groupcodecombobox', {
    extend: 'Hrd.template.component.Combobox',
    alias: 'widget.groupcodecombobox',
    store: 'Groupcode', //masuk dalam store
    fieldLabel: 'Groupcode',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'group_code', //mengambil data dari store
    valueField: 'group_code', //mengambil data dari store   
    matchFieldWidth: true,
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


