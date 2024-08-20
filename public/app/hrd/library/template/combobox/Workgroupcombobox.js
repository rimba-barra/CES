Ext.define('Hrd.library.template.combobox.Workgroupcombobox', {
    extend: 'Hrd.library.component.Combobox',
    alias: 'widget.workgroupcombobox',
    store: 'Workgroup', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Workgroup',
    displayField: 'code', //mengambil data dari store
    valueField: 'workgroup_id', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})


