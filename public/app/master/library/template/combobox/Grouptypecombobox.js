Ext.define('Master.library.template.combobox.Grouptypecombobox', {
    extend: 'Master.library.component.Combobox', 
    alias: 'widget.grouptypecombobox',
    store: 'Grouptypecombo', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Group Type',
    displayField: 'grouptype', //mengambil data dari store
    valueField: 'grouptype_id', //mengambil data dari store  
    typeAhead: true,
    editable: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


