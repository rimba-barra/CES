Ext.define('Erems.library.template.view.combobox.Productcategory', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbproductcategory',
    mode_read: 'productcategory',
    storeIdProperty: 'productcategory_id',
    storeID: 'cbProductCategoryStore',
    displayField: 'productcategory',
    valueField: 'productcategory_id',
    fieldLabel:"Productcategory"
});


