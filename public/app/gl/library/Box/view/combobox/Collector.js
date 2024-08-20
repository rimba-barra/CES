Ext.define('Erems.library.template.view.combobox.Collector', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbcollector',
    mode_read: 'collector',
    storeIdProperty: 'employee_id',
    storeID: 'cbCollectorStore',
    displayField: 'employee_name',
    valueField: 'employee_id',
    fieldLabel:"Collector"
});


