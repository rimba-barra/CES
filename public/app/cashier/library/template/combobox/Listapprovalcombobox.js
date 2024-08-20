Ext.define('Cashier.library.template.combobox.Listapprovalcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.listapprovalcombobox',
    store: 'VDRequestlistapproval', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'List Approval',
    displayField: 'user_email', //mengambil data dari store
    valueField: 'approval_by', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


