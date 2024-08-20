Ext.define('Erems.library.template.view.combobox.Unitstatus', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbunitstatus',
    mode_read: 'unitstatus',
    storeIdProperty: 'unitstatus_id',
    storeID: 'cbUnitstatusStore',
    displayField: 'status',
    valueField: 'unitstatus_id',
    fieldLabel: "Status"
});


