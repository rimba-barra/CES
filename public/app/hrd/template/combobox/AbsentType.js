Ext.define('Hrd.template.combobox.AbsentType', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbabsenttype',
    mode_read: 'master_absenttype',
    storeUrl: 'absenttype',
    storeIdProperty: 'absenttype_id',
    storeID: 'cbAbsenttypeStore',
    displayField: 'absenttype',
    valueField: 'absenttype_id',
    fieldLabel:"Absent Type",
    storeConfig:{
        id:'cbAbsenttypeStore',
        idProperty:'absenttype_id'
    },
    bindPrefixName:"Absenttype"
});


