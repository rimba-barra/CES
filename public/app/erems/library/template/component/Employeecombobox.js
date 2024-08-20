Ext.define('Erems.library.template.component.Employeecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.employeecombobox',
    store: 'Masteremployee',
    fieldLabel: 'Employee',
    displayField: 'employee_name',
    valueField: 'employee_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})