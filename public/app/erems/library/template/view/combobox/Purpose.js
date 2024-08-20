Ext.define('Erems.library.template.view.combobox.Purpose', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbpurpose',
    mode_read: 'purpose',
    storeUrl: 'purpose',
    storeIdProperty: 'purpose_id',
    storeID: 'cbPurposeStore',
    displayField: 'purpose',
    valueField: 'purpose_id',
    fieldLabel:"purpose",
    storeConfig:{
        id:'cbPurposeStore',
        idProperty:'purpose_id',
        extraParams:{
            mode_read:"purpose"
        }
    },
    bindPrefixName:"purpose"
});


