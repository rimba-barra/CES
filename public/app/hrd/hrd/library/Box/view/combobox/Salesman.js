Ext.define('Erems.library.template.view.combobox.Salesman', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbsalesman',
    mode_read: 'salesman',
    storeIdProperty: 'employee_id',
    storeID: 'cbSalesmanStore',
    displayField: 'employee_name',
    valueField: 'employee_id',
    fieldLabel:"Salesman"
});


