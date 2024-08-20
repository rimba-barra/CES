Ext.define('Erems.library.template.view.combobox.Pricetype', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbpricetype',
    mode_read: 'pricetype',
    storeIdProperty: 'pricetype_id',
    storeID: 'cbPriceTypeStore',
    displayField: 'pricetype',
    valueField: 'pricetype_id',
    fieldLabel:"Price Type"
});


