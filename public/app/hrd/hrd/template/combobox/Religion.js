Ext.define('Hrd.template.combobox.Religion', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbreligion',
    mode_read: 'master_religion',
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


