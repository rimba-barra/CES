Ext.define('Erems.library.template.view.combobox.Religion', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbreligion',
    mode_read: 'religion',
    storeUrl: 'religion',
    storeIdProperty: 'religion_id',
    storeID: 'cbReligionStore',
    displayField: 'religion',
    valueField: 'religion_id',
    fieldLabel:"Religion",
    storeConfig:{
        id:'cbReligionStore',
        idProperty:'religion_id',
        extraParams:{
            mode_read:"religion"
        }
    },
    bindPrefixName:"religion"
});


