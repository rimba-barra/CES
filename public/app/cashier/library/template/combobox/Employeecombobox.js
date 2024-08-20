Ext.define('Cashier.library.template.combobox.Employeecombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.employeecombobox',
    store: 'Employee', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Employee',
    displayField: 'employee_name', //mengambil data dari store
    valueField: 'employee_name', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


