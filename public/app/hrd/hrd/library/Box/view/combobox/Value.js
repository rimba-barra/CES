Ext.define('Erems.library.template.view.combobox.Value', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbvalue',
    mode_read: 'attributevalue',
    storeUrl: 'value',
    storeIdProperty: 'attributevalue_id',
    storeID: 'cbValueStore',
    displayField: 'attributevalue',
    valueField: 'attributevalue_id',
    fieldLabel:"Attribute Value",
    storeConfig:{
        id:'cbValueStore',
        idProperty:'attributevalue_id',
        extraParams:{
            mode_read:"attributevalue"
        }
    },
    bindPrefixName:"attributevalue"
});


