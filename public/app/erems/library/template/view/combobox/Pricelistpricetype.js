Ext.define('Erems.library.template.view.combobox.Pricelistpricetype', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbpricetypepricelist',
    mode_read: 'Pricelistpricetype',
    storeIdProperty: 'pricelistdetail_koefisien_id',
    storeID: 'cbpricelistpricetypeStore',
    displayField: 'pricetype',
    valueField: 'pricetype_id',
    fieldLabel:"Pricetype"
});