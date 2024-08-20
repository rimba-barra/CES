Ext.define('Cashier.library.template.combobox.Consolidationv2combobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.consolidationv2combobox',
    //store: 'Masterdata.store.Consolidation', //masuk dalam store
    store: 'Consolidationv2', //masuk dalam store
    fieldLabel: 'Consolidation',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'group_consolidation', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'consolidation_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})


