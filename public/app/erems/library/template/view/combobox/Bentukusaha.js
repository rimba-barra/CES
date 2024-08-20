Ext.define('Erems.library.template.view.combobox.Bentukusaha', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbbentukusaha',
    mode_read: 'detail',
    storeIdProperty: 'bentukusaha_id',
    storeID: 'cbBentukusahaStore',
    displayField: 'bentukusaha',
    valueField: 'bentukusaha_id',
    fieldLabel: "Bentuk usaha"
});


