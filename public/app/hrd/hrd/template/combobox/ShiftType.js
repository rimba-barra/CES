Ext.define('Hrd.template.combobox.ShiftType', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbshifttype',
    mode_read: 'master_shifttype',
    storeUrl: 'shifttype',
    storeIdProperty: 'shifttype_id',
    storeID: 'cbShiftTypeStore',
    displayField: 'code',
    valueField: 'shifttype_id',
    fieldLabel:"Shift Type",
    storeConfig:{
        id:'cbShiftTypeStore',
        idProperty:'shifttype_id'
    },
    bindPrefixName:"shifttype"
});


