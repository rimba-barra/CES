Ext.define('Erems.library.template.view.combobox.Pricelistkoefisien', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbkoefisienpricelist',
    mode_read: 'Pricelistkoefisien',
    storeIdProperty: 'pricelist_koefisien_id',
    storeID: 'cbkoefisienpricelistStore',
    displayField: 'pricelist',
    valueField: 'koefisien_id',
    fieldLabel:"Pricelist"
});