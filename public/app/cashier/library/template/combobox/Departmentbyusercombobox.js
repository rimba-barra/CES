Ext.define('Cashier.library.template.combobox.Departmentbyusercombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.departmentbyusercombobox',
    store: 'Departmentbyuser', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Department',
    displayField: 'department', //mengambil data dari store
    valueField: 'department_id', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})


