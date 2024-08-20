Ext.define('Erems.library.template.view.combobox.Attribute', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbattribute',
    mode_read: 'attribute',
    storeUrl: 'attribute',
    storeIdProperty: 'attribute_id',
    storeID: 'cbAttributeStore',
    displayField: 'attribute',
    valueField: 'attribute_id',
    fieldLabel:"Attribute",
    storeConfig:{
        id:'cbAttributeStore',
        idProperty:'attribute_id',
        extraParams:{
            mode_read:"attribute"
        }
    },
    bindPrefixName:"attribute"
});


