Ext.define('Erems.library.template.view.combobox.Saleslocation', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbsaleslocation',
    mode_read: 'saleslocation',
    storeIdProperty: 'saleslocation_id',
    storeID: 'cbSaleslocationStore',
    displayField: 'saleslocation',
    valueField: 'saleslocation_id',
    fieldLabel:"Sales Location"
});


