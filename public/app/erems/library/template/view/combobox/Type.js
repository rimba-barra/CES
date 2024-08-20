Ext.define('Erems.library.template.view.combobox.Type', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbtype',
    mode_read: 'type',
    storeIdProperty: 'type_id',
    storeID: 'cbTypeStore',
    displayField: 'name',
    valueField: 'type_id',
    fieldLabel:"Type"
});


