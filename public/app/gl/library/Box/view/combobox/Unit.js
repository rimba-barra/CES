Ext.define('Erems.library.template.view.combobox.Unit', {
    extend: 'Erems.library.component.ComboboxDS',
    alias: 'widget.cbunit',
    mode_read: 'unit',
    storeUrl: 'unit',
    storeIdProperty: 'unit_id',
    storeID: 'cbUnitStore',
    displayField: 'unit_number',
    valueField: 'unit_id',
    fieldLabel:"Unit"
});


