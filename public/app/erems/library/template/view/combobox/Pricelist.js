Ext.define('Erems.library.template.view.combobox.Pricelist', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbpricelist',
    mode_read: 'pricelist',
    storeIdProperty: 'pricelist_id',
    storeID: 'cbpricelistStore',
    displayField: 'keterangan',
    valueField: 'pricelist_id',
    fieldLabel:"Pricelist"
});