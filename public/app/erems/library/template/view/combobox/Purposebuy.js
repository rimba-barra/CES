Ext.define('Erems.library.template.view.combobox.Purposebuy', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbpurposebuy',
    mode_read: 'purposebuy',
    storeUrl: 'purposebuy',
    storeIdProperty: 'purposebuy_id',
    storeID: 'cbPurposebuyStore',
    displayField: 'purposebuy',
    valueField: 'purposebuy_id',
    fieldLabel:"purposebuy",
    storeConfig:{
        id:'cbPurposebuyStore',
        idProperty:'purposebuy_id',
        extraParams:{
            mode_read:"purposebuy"
        }
    },
    bindPrefixName:"purposebuy"
});


